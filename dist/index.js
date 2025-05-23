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
var import_chalk3 = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));
var import_commander = require("commander");

// src/library/requesting/requestMetadata.ts
var import_chalk2 = __toESM(require("chalk"));

// src/managers/CacheManager.ts
var import_promises = __toESM(require("fs/promises"));
var import_os = __toESM(require("os"));
var import_path = __toESM(require("path"));

// src/managers/Logger.ts
var import_fs = __toESM(require("fs"));
var import_chalk = __toESM(require("chalk"));
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["TRACE"] = 0] = "TRACE";
  LogLevel2[LogLevel2["DEBUG"] = 1] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["SUCCESS"] = 3] = "SUCCESS";
  LogLevel2[LogLevel2["WARN"] = 4] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 5] = "ERROR";
  LogLevel2[LogLevel2["FATAL"] = 6] = "FATAL";
  LogLevel2[LogLevel2["SILENT"] = 7] = "SILENT";
  return LogLevel2;
})(LogLevel || {});
var Logger = class _Logger {
  static {
    this.level = 2 /* INFO */;
  }
  static {
    this.writeToConsole = true;
  }
  static configure(config = {}) {
    _Logger.level = config.level ?? 2 /* INFO */;
    _Logger.writeToConsole = config.console ?? true;
    _Logger.filePath = config.file;
    _Logger.defaultScope = config.scope;
  }
  /**
   * Main log handler method, manages and format the output.
   * @param level - The type of log to log.
   * @param message - The message to log.
   * @param scope - The custom scope to use.
   * @returns void
   */
  static log(level, message, scope) {
    if (level < _Logger.level) return;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19);
    const levelName = LogLevel[level].toUpperCase();
    const finalScope = scope || _Logger.defaultScope;
    const parts = [
      `[${timestamp}]`,
      `[${levelName}]`,
      finalScope ? `[${finalScope}]` : "",
      message
    ].filter(Boolean).join(" ");
    const colorizedMessage = _Logger.colorize(level, parts);
    if (_Logger.writeToConsole) {
      if ([5 /* ERROR */, 6 /* FATAL */].includes(level)) console.error(colorizedMessage);
      else if (level === 4 /* WARN */) console.warn(colorizedMessage);
      else console.log(colorizedMessage);
    }
    if (_Logger.filePath) {
      try {
        import_fs.default.appendFileSync(_Logger.filePath, parts + "\n", "utf-8");
      } catch (error) {
        console.error(`Failed to write log to file: ${error.message}`);
      }
    }
  }
  /**
   * Manages the colorization for each type.
   * @param level - The type of log to colorize.
   * @param message - The message that will be colorized.
   * @returns `message`
   */
  static colorize(level, message) {
    switch (level) {
      case 0 /* TRACE */:
        return import_chalk.default.gray(message);
      case 1 /* DEBUG */:
        return import_chalk.default.blue(message);
      case 2 /* INFO */:
        return import_chalk.default.cyan(message);
      case 3 /* SUCCESS */:
        return import_chalk.default.green(message);
      case 4 /* WARN */:
        return import_chalk.default.yellow(message);
      case 5 /* ERROR */:
        return import_chalk.default.red(message);
      case 6 /* FATAL */:
        return import_chalk.default.bgRed.white(message);
      default:
        return message;
    }
  }
  /**
   * Handles logs with type: TRACE.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static trace(message, scope) {
    _Logger.log(0 /* TRACE */, message, scope);
  }
  /**
   * Handles logs with type: DEBUG.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static debug(message, scope) {
    _Logger.log(1 /* DEBUG */, message, scope);
  }
  /**
   * Handles logs with type: INFO.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static info(message, scope) {
    _Logger.log(2 /* INFO */, message, scope);
  }
  /**
   * Handles logs with type: SUCCESS.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static success(message, scope) {
    _Logger.log(3 /* SUCCESS */, message, scope);
  }
  /**
   * Handles logs with type: ERROR.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static warn(message, scope) {
    _Logger.log(4 /* WARN */, message, scope);
  }
  /**
   * Handles logs with type: ERROR.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static error(message, scope) {
    _Logger.log(5 /* ERROR */, message, scope);
  }
  /**
   * Handles logs with type: FATAL.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  static fatal(message, scope) {
    _Logger.log(6 /* FATAL */, message, scope);
  }
};

// src/managers/CacheManager.ts
var CacheScheme = class {
};
var CacheManager = class extends CacheScheme {
  constructor(WorkspaceRoot) {
    super();
    this.WorkspaceRoot = WorkspaceRoot;
    this.LocalCachePath = import_path.default.join(import_os.default.homedir() || "", ".forge");
    this.WorkspaceCachePath = import_path.default.join(this.WorkspaceRoot, ".forge");
  }
  /**
   * Ensures the directory exists, returns true if it exists/was created successfully.
   */
  async localCacheExists() {
    try {
      await import_promises.default.mkdir(
        this.LocalCachePath,
        { recursive: true }
      );
      return true;
    } catch {
      Logger.error(`Failed to ensure local cache directory: ${this.LocalCachePath}.`);
      return false;
    }
  }
  /**
   * Ensures a workspace cache directory exists.
   */
  async workspaceCacheExists() {
    try {
      await import_promises.default.mkdir(
        this.WorkspaceCachePath,
        { recursive: true }
      );
      return true;
    } catch {
      Logger.error(`Failed to ensure workspace cache directory: ${this.WorkspaceCachePath}.`);
      return false;
    }
  }
  /**
   * Gets the full path for a cache entry.
   */
  getCachePath(scope, cachePath) {
    const basePath = scope === "user" ? this.LocalCachePath : this.WorkspaceCachePath;
    if (!cachePath) {
      return basePath;
    }
    return import_path.default.join(basePath, cachePath);
  }
  /**
   * Writes data to cache.
   */
  async writeCache(scope, cachePath, data) {
    try {
      if (scope === "user") {
        await this.localCacheExists();
      } else {
        await this.workspaceCacheExists();
      }
      const fullPath = this.getCachePath(
        scope,
        cachePath.endsWith(".json") ? cachePath : `${cachePath}.json`
      );
      const parentDirectory = import_path.default.dirname(fullPath);
      await import_promises.default.mkdir(
        parentDirectory,
        { recursive: true }
      );
      const cacheContent = {
        updatedAt: /* @__PURE__ */ new Date(),
        data
      };
      if (await this.hasCache(scope, cachePath)) {
        const existingCache = await this.readCache(scope, cachePath);
        if (existingCache && existingCache.updatedAt) {
          cacheContent.updatedAt = new Date(existingCache.updatedAt);
        }
      }
      await import_promises.default.writeFile(
        fullPath,
        JSON.stringify(cacheContent, null, 2),
        "utf-8"
      );
      return true;
    } catch {
      Logger.error(`Failed to write to cache: ${cachePath}.`);
      return false;
    }
  }
  /**
   * Reads data from cache.
   */
  async readCache(scope, cachePath) {
    try {
      const fullPath = this.getCachePath(scope, cachePath);
      const fileContent = await import_promises.default.readFile(fullPath, "utf-8");
      const cacheContent = JSON.parse(fileContent);
      return cacheContent.data;
    } catch {
      return null;
    }
  }
  /**
   * Checks if cache exists at the given path.
   */
  async hasCache(scope, cachePath) {
    try {
      const fullPath = this.getCachePath(scope, cachePath);
      await import_promises.default.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Lists all cache entries in the specified scope.
   */
  async listCache(scope) {
    try {
      const basePath = this.getCachePath(scope);
      const listJsonFiles = async (dirPath, baseDir) => {
        const entries = await import_promises.default.readdir(
          dirPath,
          { withFileTypes: true }
        );
        const files = [];
        for (const entry of entries) {
          const fullPath = import_path.default.join(dirPath, entry.name);
          const relativePath = import_path.default.relative(baseDir, fullPath);
          if (entry.isDirectory()) {
            const nestedFiles = await listJsonFiles(fullPath, baseDir);
            files.push(...nestedFiles);
          } else if (entry.isFile() && entry.name.endsWith(".json")) {
            files.push(relativePath);
          }
        }
        return files;
      };
      if (scope === "user") {
        await this.localCacheExists();
      } else {
        await this.workspaceCacheExists();
      }
      return await listJsonFiles(basePath, basePath);
    } catch {
      Logger.error(`Failed to list cache for scope: ${scope}.`);
      return [];
    }
  }
  /**
   * Gets metadata for a cache entry.
   */
  async getCacheMetadata(scope, cachePath) {
    try {
      if (!cachePath) {
        return null;
      }
      const fullPath = this.getCachePath(scope, cachePath);
      const fileContent = await import_promises.default.readFile(fullPath, "utf-8");
      const cacheContent = JSON.parse(fileContent);
      return {
        updatedAt: new Date(cacheContent.updatedAt)
      };
    } catch {
      return null;
    }
  }
  /**
   * Clears cache entries.
   */
  async clearCache(scope, cachePath) {
    try {
      if (cachePath) {
        const fullPath = this.getCachePath(scope, cachePath);
        let data = null;
        try {
          data = await this.readCache(scope, cachePath);
        } catch {
        }
        await import_promises.default.unlink(fullPath);
        return {
          success: true,
          data
        };
      } else {
        const basePath = scope === "user" ? this.LocalCachePath : this.WorkspaceCachePath;
        try {
          await import_promises.default.access(basePath);
          await import_promises.default.rm(
            basePath,
            { recursive: true, force: true }
          );
          if (scope === "user") {
            await this.localCacheExists();
          } else {
            await this.workspaceCacheExists();
          }
        } catch {
          if (scope === "user") {
            await this.localCacheExists();
          } else {
            await this.workspaceCacheExists();
          }
        }
        return {
          success: true,
          data: {}
        };
      }
    } catch (error) {
      Logger.error(`Failed to clear cache: ${scope}/${cachePath || "all"}.`);
      return {
        success: false,
        data: {}
      };
    }
  }
};

// src/library/requesting/requestMetadata.ts
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
${import_chalk2.default.red("[ERROR]")} The extension '${extension}' is not supported.`);
    process.exit(1);
  }
  const RepositoryName = ExtensionRepos[ExtensionName];
  const Branch = dev ? "dev" : "main";
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/${Branch}/metadata/${type}s.json`;
  const cacheManager = new CacheManager(process.cwd());
  const cachePath = `metadata/${ExtensionName}/${type}s.json`;
  if (!forceFetch) {
    try {
      const hasCachedData = await cacheManager.hasCache("user", cachePath);
      if (hasCachedData) {
        const cacheMetadata = await cacheManager.getCacheMetadata("user", cachePath);
        const cachedContent = await cacheManager.readCache("user", cachePath);
        if (cachedContent && cachedContent.data) {
          const cachedDate = new Date(cachedContent.cachedAt || (cacheMetadata?.updatedAt || /* @__PURE__ */ new Date()).toISOString());
          const now = /* @__PURE__ */ new Date();
          const isExpired = now.getTime() - cachedDate.getTime() > OneHour;
          if (debug) {
            console.log(`${import_chalk2.default.gray("[CACHE]")} Loaded from cache: ${cachePath}`);
            console.log(`${import_chalk2.default.gray("[CACHE]")} Cached at: ${cachedContent.cachedAt || (cacheMetadata?.updatedAt || "unknown").toString()}`);
            if (isExpired) {
              console.log(`${import_chalk2.default.yellow("[CACHE]")} Cache is older than 1 hour, refetching...`);
            }
          }
          if (!isExpired) {
            return cachedContent.data;
          }
        }
      }
    } catch (error) {
      if (debug) {
        if (error instanceof Error) {
          console.log(`${import_chalk2.default.yellow("[CACHE]")} Failed to read cache: ${error.message}`);
        } else {
          console.log(`${import_chalk2.default.yellow("[CACHE]")} Failed to read cache: ${String(error)}`);
        }
      }
    }
  }
  try {
    if (debug) {
      console.log(`
${import_chalk2.default.yellow("[DEBUG]")} Fetching from remote: ${url}`);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const cacheData = {
      cachedAt: timestamp,
      data: json
    };
    const cacheResult = await cacheManager.writeCache("user", cachePath, cacheData);
    if (debug) {
      if (cacheResult) {
        console.log(`${import_chalk2.default.green("[SUCCESS]")} Cached to ${cachePath}`);
        console.log(`${import_chalk2.default.gray("[CACHE]")} Cache timestamp: ${timestamp}`);
      } else {
        console.log(`${import_chalk2.default.yellow("[WARNING]")} Failed to cache metadata`);
      }
    }
    return json;
  } catch (error) {
    console.error(`
${import_chalk2.default.red("[ERROR]")} Failed to fetch ${type} metadata for ${RepositoryName}:`, error);
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
    console.log(`${import_chalk3.default.yellow("[DEBUG]")} Starting the search.`);
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
      console.log(`${import_chalk3.default.red("[ERROR]")} Please enter a valid object type: 'function', 'event' or 'enum' (or their shortcuts).`);
      process.exit(1);
    }
    const NormalizedType = ValidSearchTypes[SearchType];
    const NormalizedObject = NormalizeObjectName(object);
    const PreparedObjectName = PrepareObjectName(NormalizedObject, NormalizedType);
    if (options.debug) {
      console.log(`
${import_chalk3.default.yellow("[DEBUG]")} Requesting (GET) 'https://github.com/tryforge/ForgeScript/blob/dev/metadata/${NormalizedType}s.json' and potentially storing them inside cache (if caching cooldown is over).`);
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
            console.log(import_chalk3.default.cyanBright(`[Function] ${SearchResult}`));
            break;
          case "event":
            console.log(import_chalk3.default.greenBright(`[Event] ${SearchResult}`));
            break;
          case "enum":
            console.log(import_chalk3.default.yellowBright(`[Enum] ${SearchResult}`));
            break;
        }
        ;
      }
    } else {
      console.log(`${import_chalk3.default.red("[ERROR]")} No match found for '${object}' (${NormalizedType}).`);
      console.log(`Try checking the spelling or use 'forge list ${NormalizedType}s' to see all available ${NormalizedType}s.`);
    }
    ;
  } catch (error) {
    Spinner.stop();
    console.error(`${import_chalk3.default.red("[ERROR]")} ${error.message}`);
    if (error.stack && process.env.DEBUG) {
      console.error(import_chalk3.default.gray(error.stack));
    }
    process.exit(1);
  }
  ;
});

// src/commands/system/version.ts
var import_chalk4 = __toESM(require("chalk"));
var import_commander2 = require("commander");
var import_ora2 = __toESM(require("ora"));
var Version = new import_commander2.Command("version").description("Returns the current version of the CLI and checks for updates.").aliases(["v", "ver"]).action(async () => {
  console.log(`Current version: ${import_chalk4.default.cyan(version)}
`);
  const spinner = (0, import_ora2.default)("Checking for updates...").start();
  try {
    const response = await fetch(`https://registry.npmjs.org/@tryforge/cli`);
    const data = await response.json();
    const latestVersion = data["dist-tags"].latest;
    spinner.stop();
    if (latestVersion !== version) {
      console.log(
        `${import_chalk4.default.yellow("A new version is available!")} ${import_chalk4.default.gray(version)} \u2192 ${import_chalk4.default.green(latestVersion)}`
      );
      console.log(`Run ${import_chalk4.default.cyan(`npm i -g ${name}`)} to update.
`);
    } else {
      console.log(import_chalk4.default.green("You are using the latest version.\n"));
    }
  } catch (err) {
    spinner.stop();
    console.error(`${import_chalk4.default.red("[ERROR]")} ${err.message}`);
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
