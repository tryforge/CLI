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
var import_chalk = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));
var import_commander = require("commander");

// src/library/requesting/requestFunctions.ts
async function RequestFunctions(extension) {
  const ExtensionName = extension?.toLowerCase() || "forgescript";
  const ExtensionRepos = {
    "forgedb": "ForgeDB",
    "forgecanvas": "ForgeCanvas",
    "forgetopgg": "ForgeTopGG",
    "forgescript": "ForgeScript"
  };
  const RepositoryName = ExtensionRepos[ExtensionName] || "ForgeScript";
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/main/metadata/functions.json`;
  try {
    const Response = await fetch(url);
    if (!Response.ok) {
      throw new Error(`HTTP error! Status: ${Response.status}`);
    }
    return await Response.json();
  } catch (error) {
    console.error(`Error fetching functions for ${RepositoryName}:`, error);
    throw error;
  }
}

// src/library/requesting/requestEnums.ts
async function RequestEnums(extension) {
  const ExtensionName = extension?.toLowerCase() || "forgescript";
  const ExtensionRepos = {
    "forgedb": "ForgeDB",
    "forgecanvas": "ForgeCanvas",
    "forgetopgg": "ForgeTopGG",
    "forgescript": "ForgeScript"
  };
  const RepositoryName = ExtensionRepos[ExtensionName] || "ForgeScript";
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/main/metadata/enums.json`;
  try {
    const Response = await fetch(url);
    if (!Response.ok) {
      throw new Error(`HTTP error! Status: ${Response.status}`);
    }
    return await Response.json();
  } catch (error) {
    console.error(`Error fetching functions for ${RepositoryName}:`, error);
    throw error;
  }
}

// src/library/requesting/requestEvents.ts
async function RequestEvents(extension) {
  const ExtensionName = extension?.toLowerCase() || "forgescript";
  const ExtensionRepos = {
    "forgedb": "ForgeDB",
    "forgecanvas": "ForgeCanvas",
    "forgetopgg": "ForgeTopGG",
    "forgescript": "ForgeScript"
  };
  const RepositoryName = ExtensionRepos[ExtensionName] || "ForgeScript";
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/main/metadata/events.json`;
  try {
    const Response = await fetch(url);
    if (!Response.ok) {
      throw new Error(`HTTP error! Status: ${Response.status}`);
    }
    return await Response.json();
  } catch (error) {
    console.error(`Error fetching functions for ${RepositoryName}:`, error);
    throw error;
  }
}

// src/library/searching/searchFunction.ts
async function SearchFunction(data, targetName, defaultValue) {
  const LowerTarget = targetName.toLowerCase();
  const Result = data.find(
    (item) => item.name?.toLowerCase() === LowerTarget || item.aliases?.some((alias) => alias.toLowerCase() === LowerTarget)
  );
  return Result || defaultValue;
}

// src/library/searching/searchEnum.ts
async function SearchEnum(data, targetName, defaultValue) {
  const lowerTarget = targetName.toLowerCase();
  const lowercaseData = Object.keys(data).reduce((acc, key) => {
    acc[key.toLowerCase()] = data[key];
    return acc;
  }, {});
  if (lowercaseData[lowerTarget]) {
    return lowercaseData[lowerTarget];
  }
  for (const key in lowercaseData) {
    if (lowercaseData[key].some((value) => value.toLowerCase() === lowerTarget)) {
      return lowercaseData[key];
    }
  }
  return defaultValue;
}

// src/library/searching/searchEvent.ts
async function SearchEvents(data, targetName, defaultValue) {
  const lowerTarget = targetName.toLowerCase();
  const result = data.find((item) => item.name.toLowerCase() === lowerTarget);
  return result || defaultValue;
}

// src/commands/search/search.ts
function isValidType(type) {
  const validTypes = ["function", "event", "enum", "f", "e", "n"];
  return validTypes.includes(type.toLowerCase());
}
var Search = new import_commander.Command("search").aliases(["s", "lookup", "lu"]).description("Search for a specific function, enum or event through BotForge's documentation.").argument("<type>", "The type of object to search for ('function | f', 'event | e' or 'enum | en'. Case insensitive).").argument("<object>", "The object to search for (Case insensitive).").option("-e, --extension <extension>", "Specify an extension where to search.").option("-j, --json", "Output raw JSON.").action(async (type, object, options) => {
  const lowerType = type.toLowerCase();
  const lowerObject = object.toLowerCase();
  const spinner = (0, import_ora.default)(`Retrieving the ${type}...`).start();
  if (isValidType(lowerType)) {
    let result = null;
    try {
      if (lowerType === "function" || lowerType === "f") {
        const datas = await RequestFunctions(options.extension);
        result = await SearchFunction(datas, lowerObject, null);
      } else if (lowerType === "enum" || lowerType === "en" || lowerType === "n") {
        const datas = await RequestEnums(options.extension);
        result = await SearchEnum(datas, lowerObject, null);
      } else if (lowerType === "event" || lowerType === "e") {
        const datas = await RequestEvents(options.extension);
        result = await SearchEvents(datas, lowerObject, null);
      }
      spinner.stop();
      if (result) {
        if (options.json) {
          console.log(JSON.stringify(result, null, 2));
        } else {
          console.log(result);
        }
      } else {
        console.log(`${import_chalk.default.red("[ERROR]")} No exact match found for '${object}'.`);
      }
    } catch (err) {
      spinner.stop();
      console.error(`${import_chalk.default.red("[ERROR]")} ${err.message}`);
    }
  } else {
    spinner.stop();
    console.log(`${import_chalk.default.red("[ERROR]")} Unknown object type: '${type}'. Please enter a valid object type ('function', 'event' or 'enum').`);
  }
});

// src/commands/system/version.ts
var import_chalk2 = __toESM(require("chalk"));
var import_commander2 = require("commander");
var import_ora2 = __toESM(require("ora"));
var Version = new import_commander2.Command("version").description("Returns the current version of the CLI and checks for updates.").aliases(["v", "ver"]).action(async () => {
  console.log(`Current version: ${import_chalk2.default.cyan(version)}
`);
  const spinner = (0, import_ora2.default)("Checking for updates...").start();
  try {
    const response = await fetch(`https://registry.npmjs.org/@tryforge/cli`);
    const data = await response.json();
    const latestVersion = data["dist-tags"].latest;
    spinner.stop();
    if (latestVersion !== version) {
      console.log(
        `${import_chalk2.default.yellow("A new version is available!")} ${import_chalk2.default.gray(version)} \u2192 ${import_chalk2.default.green(latestVersion)}`
      );
      console.log(`Run ${import_chalk2.default.cyan(`npm i -g ${name}`)} to update.
`);
    } else {
      console.log(import_chalk2.default.green("You are using the latest version.\n"));
    }
  } catch (err) {
    spinner.stop();
    console.error(`${import_chalk2.default.red("[ERROR]")} ${err.message}`);
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
  path: "./dist/src/index.ts",
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
