#!/usr/bin/env tsx
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FileMetadata_index: () => FileMetadata_index
});
module.exports = __toCommonJS(index_exports);
var import_commander3 = require("commander");

// package.json
var name = "@tryforge/cli";
var version = "0.0.1";

// src/commands/search/search.ts
var import_chalk2 = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));
var import_commander = require("commander");

// src/library/requesting/requestMetadata.ts
var import_promises = __toESM(require("fs/promises"));
var import_chalk = __toESM(require("chalk"));
var import_path = __toESM(require("path"));
var OneHour = 60 * 60 * 1e3;
async function RequestMetadata(type, extension = "forgescript", dev = false, debug = false, forceFetch = false) {
  const ExtensionName = extension.toLowerCase();
  const ExtensionRepos = {
    forgedb: "ForgeDB",
    forgecanvas: "ForgeCanvas",
    forgetopgg: "ForgeTopGG",
    forgescript: "ForgeScript",
    forgemusic: "ForgeMusic",
    forgelinked: "ForgeLinked"
  };
  if (!(ExtensionName in ExtensionRepos)) {
    console.error(`
${import_chalk.default.red("[ERROR]")} The extension '${extension}' is not supported.`);
    process.exit(1);
  }
  const RepositoryName = ExtensionRepos[ExtensionName];
  const Branch = dev ? "dev" : "main";
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/${Branch}/metadata/${type}s.json`;
  const CachePath = getMetadataCachePath(ExtensionName, type);
  if (!forceFetch) {
    try {
      const Cached = await import_promises.default.readFile(CachePath, "utf-8");
      const Parsed = JSON.parse(Cached);
      const CachedDate = new Date(Parsed.cachedAt);
      const Now = /* @__PURE__ */ new Date();
      const isExpired = Now.getTime() - CachedDate.getTime() > OneHour;
      if (debug) {
        console.log(`${import_chalk.default.gray("[CACHE]")} Loaded from cache: ${CachePath}`);
        console.log(`${import_chalk.default.gray("[CACHE]")} Cached at: ${Parsed.cachedAt}`);
        if (isExpired) {
          console.log(`${import_chalk.default.yellow("[CACHE]")} Cache is older than 1 hour, refetching...`);
        }
      }
      if (!isExpired) {
        return Parsed.data;
      }
    } catch {
      try {
        if (debug) {
          console.log(`
${import_chalk.default.yellow("[DEBUG]")} Fetching from remote: ${url}`);
        }
        const Response = await fetch(url);
        if (!Response.ok) {
          throw new Error(`HTTP error! Status: ${Response.status}`);
        }
        const json = await Response.json();
        const CacheDir = import_path.default.dirname(CachePath);
        await import_promises.default.mkdir(CacheDir, { recursive: true });
        const Wrapped = {
          cachedAt: (/* @__PURE__ */ new Date()).toISOString(),
          data: json
        };
        await import_promises.default.writeFile(CachePath, JSON.stringify(Wrapped, null, 2), "utf-8");
        if (debug) {
          console.log(`${import_chalk.default.green("[SUCCESS]")} Cached to ${CachePath}`);
        }
        return json;
      } catch (error) {
        console.error(`
${import_chalk.default.red("[ERROR]")} Failed to fetch ${type} metadata for ${RepositoryName}:`, error);
        throw error;
      }
    }
  }
  try {
    if (debug) {
      console.log(`
${import_chalk.default.yellow("[DEBUG]")} Fetching from remote: ${url}`);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    const cacheDir = import_path.default.dirname(CachePath);
    await import_promises.default.mkdir(cacheDir, { recursive: true });
    const wrapped = {
      cachedAt: (/* @__PURE__ */ new Date()).toISOString(),
      data: json
    };
    await import_promises.default.writeFile(CachePath, JSON.stringify(wrapped, null, 2), "utf-8");
    if (debug) {
      console.log(`${import_chalk.default.green("[SUCCESS]")} Cached to ${CachePath}`);
    }
    return json;
  } catch (error) {
    console.error(`
${import_chalk.default.red("[ERROR]")} Failed to fetch ${type} metadata for ${RepositoryName}:`, error);
    throw error;
  }
}

// src/library/searching/searchMetadata.ts
async function SearchMetadata(normalizedType, data, targetName, defaultValue) {
  if (!data) {
    throw new Error("Invalid data provided for search");
  }
  const LowerTarget = targetName.toLowerCase();
  switch (normalizedType) {
    case "function":
      {
        const functionResult = data.find(
          (item) => item.name?.toLowerCase() === LowerTarget || item.aliases?.some((alias) => alias.toLowerCase() === LowerTarget)
        );
        return functionResult || defaultValue;
      }
      ;
    case "event":
      {
        const EventResult = data.find(
          (item) => item.name.toLowerCase() === LowerTarget
        );
        return EventResult || defaultValue;
      }
      ;
    case "enum":
      {
        if (targetName in data) {
          return data[targetName];
        }
        return defaultValue;
      }
      ;
    default:
      {
        throw new Error(`Unsupported search type: ${normalizedType}`);
      }
      ;
  }
}

// src/library/caching/getMetadataCachePath.ts
var import_path2 = __toESM(require("path"));
var import_os = __toESM(require("os"));
function getMetadataCachePath(extension, type) {
  return import_path2.default.join(
    import_os.default.homedir(),
    ".forgerc",
    "cache",
    "metadata",
    extension.toLowerCase(),
    `${type}s.json`
  );
}

// src/commands/search/search.ts
var ValidSearchTypes = {
  "function": "function",
  "f": "function",
  "fn": "function",
  "func": "function",
  "event": "event",
  "e": "event",
  "ev": "event",
  "evt": "event",
  "enum": "enum",
  "en": "enum",
  "n": "enum",
  "enm": "enum"
};
function IsValidType(type) {
  return Object.keys(ValidSearchTypes).includes(type.toLowerCase());
}
function NormalizeObjectName(objectName) {
  return objectName.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");
}
function PrepareObjectName(objectName, searchType) {
  return searchType === "function" ? `$${objectName}` : objectName;
}
async function ExecuteSearch(normalizedType, preparedObjectName, extension, dev, debug, forceFetch) {
  if (debug) {
    console.log(`${import_chalk2.default.yellow("[DEBUG]")} Starting the search.`);
  }
  ;
  const Functions = await RequestMetadata(normalizedType, extension, !!dev, !!debug, !!forceFetch);
  return SearchMetadata(normalizedType, Functions, preparedObjectName, null);
}
var Search = new import_commander.Command("search").aliases(["s", "lookup"]).description("Search for a specific function, enum or event in BotForge's documentation.").argument("<type>", "The type of object to search for (or their shortcuts).").argument("<object>", "The object name to search for (case insensitive).").option("-e, --extension <extension>", "Specify an extension to limit the search scope.").option("-r, --raw", "Output the result as raw JSON instead of formatted text.").option("-d, --dev", "Perform your research on the development branch.").option("--debug", "Show debug information during the search process.").option("--fetch", "Fetch information using HTTP request and forces to cache the results.").action(async (type, object, options) => {
  const SearchType = type.toLowerCase();
  const Spinner = (0, import_ora.default)(`Searching for ${SearchType} '${object}'...`).start();
  try {
    if (!IsValidType(SearchType)) {
      Spinner.stop();
      console.log(`${import_chalk2.default.red("[ERROR]")} Please enter a valid object type: 'function', 'event' or 'enum' (or their shortcuts).`);
      process.exit(1);
    }
    const NormalizedType = ValidSearchTypes[SearchType];
    const NormalizedObject = NormalizeObjectName(object);
    const PreparedObjectName = PrepareObjectName(NormalizedObject, NormalizedType);
    if (options.debug) {
      console.log(`
${import_chalk2.default.yellow("[DEBUG]")} Requesting (GET) 'https://github.com/tryforge/ForgeScript/blob/dev/metadata/${NormalizedType}s.json' and potentially storing them inside cache (if caching cooldown is over).`);
    }
    ;
    Spinner.text = `Retrieving ${NormalizedType} '${object}'${options.extension ? ` from extension '${options.extension}'` : ""}...`;
    const SearchResult = await ExecuteSearch(NormalizedType, PreparedObjectName, options.extension, !!options.dev, !!options.debug);
    Spinner.stop();
    if (SearchResult) {
      if (options.raw) {
        console.log(JSON.stringify(SearchResult));
      } else {
        switch (NormalizedType) {
          case "function":
            console.log(import_chalk2.default.cyanBright(`[Function] ${SearchResult}`));
            break;
          case "event":
            console.log(import_chalk2.default.greenBright(`[Event] ${SearchResult}`));
            break;
          case "enum":
            console.log(import_chalk2.default.yellowBright(`[Enum] ${SearchResult}`));
            break;
        }
        ;
      }
    } else {
      console.log(`${import_chalk2.default.red("[ERROR]")} No match found for '${object}' (${NormalizedType}).`);
      console.log(`Try checking the spelling or use 'forge list ${NormalizedType}s' to see all available ${NormalizedType}s.`);
    }
    ;
  } catch (error) {
    Spinner.stop();
    console.error(`${import_chalk2.default.red("[ERROR]")} ${error.message}`);
    if (error.stack && process.env.DEBUG) {
      console.error(import_chalk2.default.gray(error.stack));
    }
    process.exit(1);
  }
  ;
});

// src/commands/system/version.ts
var import_chalk3 = __toESM(require("chalk"));
var import_commander2 = require("commander");
var import_ora2 = __toESM(require("ora"));
var Version = new import_commander2.Command("version").description("Returns the current version of the CLI and checks for updates.").aliases(["v", "ver"]).action(async () => {
  console.log(`Current version: ${import_chalk3.default.cyan(version)}
`);
  const spinner = (0, import_ora2.default)("Checking for updates...").start();
  try {
    const response = await fetch(`https://registry.npmjs.org/@tryforge/cli`);
    const data = await response.json();
    const latestVersion = data["dist-tags"].latest;
    spinner.stop();
    if (latestVersion !== version) {
      console.log(
        `${import_chalk3.default.yellow("A new version is available!")} ${import_chalk3.default.gray(version)} \u2192 ${import_chalk3.default.green(latestVersion)}`
      );
      console.log(`Run ${import_chalk3.default.cyan(`npm i -g ${name}`)} to update.
`);
    } else {
      console.log(import_chalk3.default.green("You are using the latest version.\n"));
    }
  } catch (err) {
    spinner.stop();
    console.error(`${import_chalk3.default.red("[ERROR]")} ${err.message}`);
  }
});

// src/index.ts
var ForgeCLI = new import_commander3.Command();
ForgeCLI.name("forge").description("A CLI tool for ForgeScript and BotForge that helps developers quickly set up projects, create scripts, and streamline their workflow.").version(version);
ForgeCLI.addCommand(Search);
ForgeCLI.addCommand(Version);
ForgeCLI.parseAsync(process.argv);
var FileMetadata_index = {
  filename: "index.ts",
  createdAt: /* @__PURE__ */ new Date("2025-05-11T18:58:00+02:00"),
  updatedAt: /* @__PURE__ */ new Date("2025-05-13T16:38:00+02:00"),
  author: "S\xE9bastien (@striatp)",
  description: "This is the main file that defines the CLI structure and architecture.",
  tags: ["CLI", "Index", "Structure"]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileMetadata_index
});
