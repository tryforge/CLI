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
var import_ora2 = __toESM(require("ora"));
var import_commander = require("commander");

// src/library/requesting/requestMetadata.ts
var import_chalk2 = __toESM(require("chalk"));

// src/managers/classes/CacheManager.ts
var import_path2 = __toESM(require("path"));

// src/managers/classes/FileSystem.ts
var import_os = __toESM(require("os"));
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var FileSystem = class _FileSystem {
  /**
   * Reads the contents of a file at the given path.
   * @param path - The path to the file.
   * @returns A promise that resolves to the file contents as a string or Buffer.
   */
  static async ReadFile(path5) {
    try {
      return await import_promises.default.readFile(path5, "utf-8");
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return "An unexpected error occured.";
      }
    }
  }
  /**
   * Writes data to a file at the given path.
   * @param path - The path to the file.
   * @param data - The data to write to the file.
   * @returns A promise that resolves to true if the write was successful, false otherwise.
   */
  static async WriteFile(path5, data) {
    try {
      await import_promises.default.writeFile(path5, data, "utf-8");
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Copies a file from the source path to the destination path.
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to true if the copy was successful, false otherwise.
   */
  static async CopyFile(sourcePath, destinationPath) {
    try {
      await import_promises.default.copyFile(sourcePath, destinationPath);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Moves a file from the source path to the destination path.
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to true if the move was successful, false otherwise.
   */
  static async MoveFile(sourcePath, destinationPath) {
    try {
      await import_promises.default.rename(sourcePath, destinationPath);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Checks if a file exists at the given path.
   * @param path - The path to the file.
   * @returns A promise that resolves to true if the file exists, false otherwise.
   */
  static async FileExists(path5) {
    try {
      await import_promises.default.access(path5);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Reads a JSON file from the specified path and parses its contents.
   *
   * @param path - The file system path to the JSON file.
   * @returns A promise that resolves to the parsed JSON object if successful, or `null` if an error occurs (e.g., file not found or invalid JSON).
   */
  static async ReadJSON(path5) {
    try {
      return JSON.parse(await _FileSystem.ReadFile(path5));
    } catch {
      return null;
    }
  }
  /**
   * Writes an object as JSON to a file at the given path.
   * @param path - The path to the file.
   * @param object - The object to serialize and write as JSON.
   * @returns A promise that resolves to true if the write was successful, false otherwise.
   */
  static async WriteJSON(path5, object) {
    try {
      await import_promises.default.writeFile(path5, JSON.stringify(object), "utf-8");
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Asynchronously creates a new file at the specified path with the given data.
   * 
   * The method attempts to create a new file and write the provided data to it.
   * If the file already exists, the operation will fail and return `false`.
   * 
   * @param path - The path where the new file should be created.
   * @param data - The content to write to the file. Defaults to an empty string.
   * @returns A promise that resolves to `true` if the file was created successfully, or `false` if an error occurred (e.g., file already exists).
   */
  static async CreateFile(path5, data = "") {
    try {
      await import_promises.default.writeFile(path5, data, { flag: "wx" });
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Asynchronously creates a directory at the specified path.
   * 
   * @param path - The path where the directory should be created.
   * @param recursive - Whether to create parent directories if they do not exist. Defaults to `true`.
   * @returns A promise that resolves to `true` if the directory was created successfully, or `false` if an error occurred.
   */
  static async CreateDirectory(path5, recursive = true) {
    try {
      await import_promises.default.mkdir(path5, { recursive });
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Deletes a file at the specified path.
   *
   * @param path - The path to the file to be deleted.
   * @returns A promise that resolves to `true` if the file was successfully deleted, or `false` if an error occurred.
   */
  static async DeleteFile(path5) {
    try {
      await import_promises.default.unlink(path5);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Deletes a directory at the specified path.
   *
   * @param path - The path to the directory to delete.
   * @param recursive - Whether to delete directories recursively.
   * @returns A promise that resolves to `true` if the directory was deleted successfully, or `false` if an error occurred.
   */
  static async DeleteDirectory(path5, recursive) {
    try {
      await import_promises.default.rmdir(path5, { recursive });
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Appends data to a file at the specified path.
   *
   * If the file does not exist, it will be created. The data can be a string or a Buffer.
   * Returns `true` if the operation succeeds, or `false` if an error occurs.
   *
   * @param path - The path to the file where data should be appended.
   * @param data - The data to append to the file, as a string or Buffer.
   * @returns A promise that resolves to `true` if the append operation was successful, or `false` otherwise.
   */
  static async AppendToFile(path5, data) {
    try {
      await import_promises.default.appendFile(path5, data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Reads the contents of a file at the specified path and returns it as a Buffer.
   * 
   * @param path - The path to the file to be read.
   * @returns A Promise that resolves to a Buffer containing the file's contents, or `null` if the file cannot be read.
   */
  static async ReadFileBuffer(path5) {
    try {
      return await import_promises.default.readFile(path5);
    } catch {
      return null;
    }
  }
  /**
   * Retrieves the file extension from the provided file path.
   *
   * @param filePath - The path of the file whose extension is to be extracted.
   * @returns The file extension, including the leading dot (e.g., ".txt"). Returns an empty string if the file has no extension.
   */
  static GetFileExtension(filePath) {
    return import_path.default.extname(filePath);
  }
  /**
   * Retrieves the file name from a given file path.
   *
   * @param filePath - The full path to the file.
   * @returns The name of the file extracted from the provided path.
   */
  static GetFileName(filePath) {
    return import_path.default.basename(filePath);
  }
  /**
   * Returns the parent directory of the specified file path.
   *
   * @param filePath - The path of the file or directory.
   * @returns The path of the parent directory.
   */
  static GetParentDirectory(filePath) {
    return import_path.default.dirname(filePath);
  }
  /**
   * Determines whether the specified path refers to a directory.
   *
   * @param path - The file system path to check.
   * @returns A promise that resolves to `true` if the path is a directory, or `false` otherwise.
   */
  static async IsDirectory(path5) {
    try {
      return (await import_promises.default.stat(path5)).isDirectory();
    } catch {
      return false;
    }
  }
  /**
   * Determines whether the specified path refers to a file.
   *
   * @param path - The path to check.
   * @returns A promise that resolves to `true` if the path is a file, or `false` otherwise.
   */
  static async IsFile(path5) {
    try {
      return (await import_promises.default.stat(path5)).isFile();
    } catch {
      return false;
    }
  }
  /**
   * Retrieves the current user's home directory path.
   *
   * @returns {string} The absolute path to the user's home directory.
   */
  static GetHomePath() {
    return import_os.default.homedir();
  }
  /**
   * Returns the operating system's default directory for temporary files.
   *
   * @returns {string} The path to the temporary directory.
   */
  static GetTempDirectory() {
    return import_os.default.tmpdir();
  }
  /**
   * Returns the current working directory of the Node.js process.
   *
   * @returns {string} The absolute path of the current workspace directory.
   */
  static GetWorkspaceDirectory() {
    return process.cwd();
  }
  /**
   * Lists the contents of a directory at the given path.
   * @param path - The path to the directory.
   * @returns A promise that resolves to an array of file and directory names.
   */
  static async ListDirectory(path5) {
    try {
      return await import_promises.default.readdir(path5);
    } catch {
      return false;
    }
  }
  /**
   * Retrieves file statistics for the file at the given path.
   * @returns A promise that resolves to the file statistics (fs.Stats).
   */
  static async GetFileStats(path5) {
    try {
      return await import_promises.default.stat(path5);
    } catch {
      return false;
    }
  }
  /**
   * Ensures that a directory exists at the given path, creating it if necessary.
   * @param path - The path to the directory.
   * @returns A promise that resolves when the directory exists.
   */
  static async EnsureDirectory(path5) {
    try {
      await _FileSystem.FileExists(path5);
      return {
        success: true,
        created: false,
        path: path5
      };
    } catch {
      try {
        await _FileSystem.CreateDirectory(path5, true);
        return {
          success: true,
          created: true,
          path: path5
        };
      } catch {
        return {
          success: false,
          created: false,
          path: path5
        };
      }
    }
  }
};

// src/managers/classes/CacheManager.ts
var CacheManager = class {
  /**
   * Writes cache data to a JSON file at the specified path, based on the given cache scope.
   *
   * @template T - The type of the cache content to write.
   * @param scope - The scope of the cache, either 'user' or workspace.
   * @param filePath - The relative file path where the cache should be written.
   * @param data - The cache content to write to the file.
   * @returns A promise that resolves to `true` if the write operation was successful, otherwise `false`.
   */
  static async WriteCache(scope, filePath, data) {
    const cachePath = scope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    return FileSystem.WriteJSON(cachePath, data);
  }
  /**
   * Reads and returns the cached content from a specified file path within the given cache scope.
   *
   * @template T - The type of the cached content.
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the parsed cache content of type `CacheContent<T>`.
   */
  static async ReadCache(scope, filePath) {
    const cachePath = scope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    return await FileSystem.ReadJSON(cachePath);
  }
  /**
   * Clears the cache for the specified scope and file path.
   *
   * Depending on the `deleteFile` flag, this method either deletes the cache file
   * or overwrites it with an empty cache object.
   *
   * @param scope - The cache scope, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @param deleteFile - If `true`, deletes the cache file; otherwise, overwrites it with an empty cache object. Defaults to `false`.
   * @returns A promise that resolves to `true` if the operation was successful, or `false` otherwise.
   */
  static async ClearCache(scope, filePath, deleteFile = false) {
    const cachePath = scope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    if (deleteFile) {
      return await FileSystem.DeleteFile(cachePath);
    } else {
      const emptyCache = { updatedAt: /* @__PURE__ */ new Date(), data: null };
      return await FileSystem.WriteJSON(cachePath, emptyCache);
    }
  }
  /**
   * Checks whether a cache file exists at the specified path within the given scope.
   *
   * @param scope - The scope of the cache, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to `true` if the cache file exists, or `false` otherwise.
   */
  static async CacheExists(scope, filePath) {
    const cachePath = scope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    return await FileSystem.FileExists(cachePath);
  }
  /**
   * Clears all cached data within the specified scope by deleting the corresponding cache directory.
   *
   * @param scope - The scope of the cache to clear. Use `'user'` to clear user-level cache,
   *                or another value to clear workspace-level cache.
   * @returns A promise that resolves to `true` if the cache directory was successfully deleted, otherwise `false`.
   */
  static async ClearAllCache(scope) {
    const cacheDir = scope === "user" ? FileSystem.GetHomePath() : FileSystem.GetWorkspaceDirectory();
    return await FileSystem.DeleteDirectory(cacheDir, true);
  }
  /**
   * Retrieves the cache metadata for a given file path and scope.
   *
   * This method attempts to read a JSON file from the cache location determined by the provided scope
   * ('user' or workspace). If the file exists and contains an `updatedAt` property, it returns an object
   * with the `updatedAt` value. Otherwise, it returns `null`.
   *
   * @param scope - The cache scope, either 'user' or workspace.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the cache metadata containing `updatedAt`, or `null` if not found.
   */
  static async CacheMetadata(scope, filePath) {
    const cachePath = scope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    const content = await FileSystem.ReadJSON(cachePath);
    if (content && content.updatedAt) {
      return { updatedAt: content.updatedAt };
    }
    return null;
  }
  /**
   * Migrates a cache file from one scope to another by copying its contents.
   *
   * @param fromScope - The source cache scope ('user' or 'workspace').
   * @param toScope - The destination cache scope ('user' or 'workspace').
   * @param filePath - The relative path of the cache file to migrate.
   * @returns A promise that resolves to `true` if the migration was successful, or `false` if the source file does not exist or cannot be read.
   */
  static async MigrateCache(fromScope, toScope, filePath) {
    const fromPath = fromScope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    const toPath = toScope === "user" ? import_path2.default.join(FileSystem.GetHomePath(), filePath) : import_path2.default.join(FileSystem.GetWorkspaceDirectory(), filePath);
    if (!await FileSystem.FileExists(fromPath)) return false;
    const data = await FileSystem.ReadJSON(fromPath);
    if (!data) return false;
    return await FileSystem.WriteJSON(toPath, data);
  }
};

// src/managers/classes/ErrorHandler.ts
var import_path3 = __toESM(require("path"));
var ErrorManager = class {
  static {
    /**
     * The default error log file path (relative to workspace directory).
     */
    this.LogFile = "error.log";
  }
  /**
   * Logs an error message to the ForgeCLI error log file.
   *
   * @param error - The error object or string to log.
   * @param context - Optional context information to include with the error.
   * @returns A promise that resolves to `true` if the log entry was successfully appended, or `false` otherwise.
   */
  static async LogError(error, context) {
    const logPath = import_path3.default.join(FileSystem.GetWorkspaceDirectory(), ".forge", this.LogFile);
    const logEntry = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${this.FormatError(error, context)}
`;
    return FileSystem.AppendToFile(logPath, logEntry);
  }
  /**
   * Formats an error message with optional context and stack trace.
   *
   * @param error - The error object or string to format.
   * @param context - Optional context information to prepend to the message.
   * @returns The formatted error message, including context and stack trace if available.
   */
  static FormatError(error, context) {
    let msg = typeof error === "string" ? error : error.message;
    if (context) msg = `[${context}] ${msg}`;
    if (error instanceof Error && error.stack) {
      msg += `
Stack: ${error.stack}`;
    }
    return msg;
  }
  /**
   * Handles an error by optionally logging it and notifying the user.
   *
   * @param error - The error object or message string to handle.
   * @param context - Optional context information about where the error occurred.
   * @param log - Whether to log the error (default: false).
   * @returns A promise that resolves when the error has been handled.
   */
  static async Handle(error, log = false, context) {
    log ? await this.LogError(error, context) : () => {
    };
    this.NotifyUser(error, context);
  }
  /**
   * Clears the contents of the error log file.
   *
   * @param logPath - Optional. The path to the error log file. If not provided, the default log file path is used.
   * @returns A promise that resolves to `true` if the log file was successfully cleared, or `false` otherwise.
   */
  static async ClearErrorLog(logPath) {
    const pathToLog = logPath || import_path3.default.join(FileSystem.GetWorkspaceDirectory(), this.LogFile);
    return FileSystem.WriteFile(pathToLog, "");
  }
  /**
   * Logs a formatted error message to the console for user notification.
   *
   * @param error - The error object or message string to notify the user about.
   * @param context - Optional context information to provide additional details about the error.
   */
  static NotifyUser(error, context) {
    console.error(this.FormatError(error, context));
  }
};

// src/managers/classes/Logger.ts
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
    this.currentLevel = 2 /* INFO */;
  }
  /**
   * Sets the current log level.
   * @param level The log level to set.
   */
  static setLevel(level) {
    _Logger.currentLevel = level;
  }
  /**
   * Logs a message at the specified log level.
   * @param level The log level.
   * @param args The message arguments.
   */
  static log(level, ...args) {
    if (level < _Logger.currentLevel) return;
    const prefix = LogLevel[level];
    switch (level) {
      case 0 /* TRACE */:
        args.forEach((arg) => console.log(`${import_chalk.default.gray(prefix)} ${import_chalk.default.gray(arg)}`));
        break;
      case 1 /* DEBUG */:
        args.forEach((arg) => console.log(`${import_chalk.default.yellow(prefix)} ${import_chalk.default.yellow(arg)}`));
        break;
      case 2 /* INFO */:
        args.forEach((arg) => console.log(`${import_chalk.default.blue(prefix)} ${import_chalk.default.blue(arg)}`));
        break;
      case 3 /* SUCCESS */:
        args.forEach((arg) => console.log(`${import_chalk.default.green(prefix)} ${import_chalk.default.green(arg)}`));
        break;
      case 4 /* WARN */:
        args.forEach((arg) => console.log(`${import_chalk.default.yellow(prefix)} ${import_chalk.default.yellow(arg)}`));
        break;
      case 5 /* ERROR */:
        args.forEach((arg) => console.log(`${import_chalk.default.red(prefix)} ${import_chalk.default.red(arg)}`));
        break;
      case 6 /* FATAL */:
        args.forEach((arg) => console.log(`${import_chalk.default.red(prefix)} ${import_chalk.default.red(arg)}`));
        break;
    }
  }
  /**
   * Logs a trace message.
   * @param args The message arguments.
   */
  trace(...args) {
    _Logger.log(0 /* TRACE */, ...args);
  }
  /**
   * Logs a debug message.
   * @param args The message arguments.
   */
  debug(...args) {
    _Logger.log(1 /* DEBUG */, ...args);
  }
  /**
   * Logs an info message.
   * @param args The message arguments.
   */
  info(...args) {
    _Logger.log(2 /* INFO */, ...args);
  }
  /**
   * Logs a success message.
   * @param args The message arguments.
   */
  success(...args) {
    _Logger.log(3 /* SUCCESS */, ...args);
  }
  /**
   * Logs a warning message.
   * @param args The message arguments.
   */
  warn(...args) {
    _Logger.log(4 /* WARN */, ...args);
  }
  /**
   * Logs an error message.
   * @param args The message arguments.
   */
  error(...args) {
    _Logger.log(5 /* ERROR */, ...args);
  }
  /**
   * Logs a fatal error message.
   * @param args The message arguments.
   */
  fatal(...args) {
    _Logger.log(6 /* FATAL */, ...args);
  }
};

// src/managers/classes/NetworkManager.ts
var NetworkManager = class {
  /**
   * The constructor to create the instance of the class.
   * @param baseUrl The base URL to work with.
   */
  constructor(baseUrl) {
    this.BaseURL = baseUrl;
  }
  /**
   * Sends a GET request to the specified endpoint and returns the response data.
   *
   * @typeParam T - The expected response data type.
   * @param endpoint - The API endpoint to send the GET request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response data of type `T`, or `null` if the request fails.
   */
  async Get(endpoint, headers = {}) {
    return this.Request("GET", endpoint, void 0, headers);
  }
  /**
   * Sends a POST request to the specified endpoint with the provided body and headers.
   *
   * @template T - The expected response type.
   * @param endpoint - The API endpoint to send the request to.
   * @param body - The request payload to be sent in the body of the POST request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  async Post(endpoint, body, headers = {}) {
    return this.Request("POST", endpoint, headers, body);
  }
  /**
   * Sends an HTTP PUT request to the specified endpoint with the provided body and headers.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the PUT request to.
   * @param body - The request payload to be sent in the body of the PUT request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  async Put(endpoint, body, headers = {}) {
    return this.Request("PUT", endpoint, headers, body);
  }
  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the DELETE request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  async Delete(endpoint, headers = {}) {
    return this.Request("DELETE", endpoint, void 0, headers);
  }
  /**
   * Sends an HTTP request to the specified endpoint using the given method, body, and headers.
   *
   * @template T - The expected response type.
   * @param method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param endpoint - The endpoint path to append to the base URL.
   * @param body - Optional request payload to send as JSON.
   * @param headers - Optional additional headers to include in the request.
   * @returns A promise that resolves to the parsed JSON response of type `T`, or `null` if the request fails or the response is not valid JSON.
   */
  async Request(method, endpoint, headers = {}, body) {
    if (!this.BaseURL) {
      return null;
    }
    const url = this.BaseURL + endpoint;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        return null;
      }
      try {
        return await response.json();
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  }
};

// src/managers/classes/ProgressManager.ts
var import_ora = __toESM(require("ora"));
var ProgressManager = class {
  constructor() {
    /**
     * An instance of the Ora spinner used to display progress in the CLI.
     * Can be `null` if the spinner has not been initialized.
     */
    this.Spinner = null;
  }
  /**
   * Start a loading spinner with a message.
   * @param message The message to display with the spinner.
   */
  Start(message) {
    if (this.Spinner) this.Spinner.stop();
    this.Spinner = (0, import_ora.default)({ text: message }).start();
  }
  /**
   * Update the spinner text.
   * @param message The new message to display.
   */
  Update(message) {
    if (this.Spinner) {
      this.Spinner.text = message;
    }
  }
  /**
   * Mark the spinner as succeeded with a message and stop it.
   * @param message The success message to display.
   */
  Succeed(message) {
    if (this.Spinner) {
      this.Spinner.succeed(message);
      this.Spinner = null;
    }
  }
  /**
   * Mark the spinner as failed with a message and stop it.
   * @param message The failure message to display.
   */
  Fail(message) {
    if (this.Spinner) {
      this.Spinner.fail(message);
      this.Spinner = null;
    }
  }
  /**
   * Stop the spinner without marking as success or failure.
   */
  Stop() {
    if (this.Spinner) {
      this.Spinner.stop();
      this.Spinner = null;
    }
  }
};

// src/managers/classes/UpdateChecker.ts
var import_path4 = __toESM(require("path"));
var UpdateChecker = class {
  static {
    /**
     * A static instance of {@link NetworkManager} configured to interact with the NPM registry
     * for the `@tryforge/forgescript` package.
     */
    this.Network = new NetworkManager("https://registry.npmjs.org/@tryforge/forgescript");
  }
  /**
   * Retrieves the local version of the application by reading the `version` field
   * from the nearest `package.json` file relative to the current directory.
   *
   * @returns A promise that resolves to the version string from `package.json`.
   */
  static async LocalVersion() {
    return (await FileSystem.ReadJSON(import_path4.default.resolve(__dirname, "../../../package.json"))).version;
  }
  /**
   * Retrieves the latest version string from the network.
   *
   * @returns A promise that resolves to the latest version as a string if available, or `null` if not found.
   * @throws May throw if the network request fails.
   */
  static async LatestVersion() {
    const response = await this.Network.Get("/latest");
    if (typeof response === "object" && response !== null && "version" in response) {
      return response.version;
    }
    return null;
  }
  /**
   * Fetches and compares the local and latest available versions.
   *
   * @returns {Promise<CheckedVersion>} An object containing the current version, the latest version, and a boolean indicating if an update is available.
   */
  static async FetchVersion() {
    const currentVersion = await this.LocalVersion();
    const latestVersion = await this.LatestVersion();
    return {
      currentVersion,
      latestVersion,
      updateAvailable: currentVersion !== latestVersion
    };
  }
  /**
   * Checks if an update is available for the application.
   *
   * @returns A promise that resolves to `true` if an update is available, otherwise `false`.
   */
  static async UpdateAvailable() {
    return (await this.FetchVersion()).updateAvailable;
  }
};

// src/library/requesting/requestMetadata.ts
var ONE_HOUR_MS = 60 * 60 * 1e3;
var GITHUB_RAW_BASE_URL = "https://raw.githubusercontent.com/tryforge";
async function requestMetadata(type, extension = "forgescript", dev = false, debug = false, forceFetch = false) {
  const extensionName = extension.toLowerCase();
  const extensionRepos = {
    forgedb: "ForgeDB",
    forgecanvas: "ForgeCanvas",
    forgetopgg: "ForgeTopGG",
    forgescript: "ForgeScript",
    forgemusic: "ForgeMusic",
    forgelinked: "ForgeLinked"
  };
  if (!(extensionName in extensionRepos)) {
    console.error(`
${import_chalk2.default.red("[ERROR]")} The extension '${extension}' is not supported.`);
    process.exit(1);
  }
  const repositoryName = extensionRepos[extensionName];
  const branch = dev ? "dev" : "main";
  const endpoint = `${repositoryName}/refs/heads/${branch}/metadata/${type}s.json`;
  const networkManager = new NetworkManager(GITHUB_RAW_BASE_URL);
  const cacheManager = new CacheManager(process.cwd());
  const cachePath = `metadata/${extensionName}/${type}s.json`;
  if (!forceFetch) {
    const cachedResult = await tryGetCachedData(cacheManager, cachePath, debug);
    if (cachedResult) {
      return cachedResult;
    }
  }
  return await fetchAndCacheMetadata(
    networkManager,
    cacheManager,
    endpoint,
    cachePath,
    type,
    repositoryName,
    debug
  );
}
async function tryGetCachedData(cacheManager, cachePath, debug) {
  try {
    const hasCachedData = await cacheManager.hasCache("user", cachePath);
    if (!hasCachedData) {
      return null;
    }
    const cacheMetadata = await cacheManager.getCacheMetadata("user", cachePath);
    const cachedContent = await cacheManager.readCache("user", cachePath);
    if (!cachedContent || !cachedContent.data) {
      return null;
    }
    const cachedDate = new Date(
      cachedContent.cachedAt || (cacheMetadata?.updatedAt || /* @__PURE__ */ new Date()).toISOString()
    );
    const now = /* @__PURE__ */ new Date();
    const isExpired = now.getTime() - cachedDate.getTime() > ONE_HOUR_MS;
    if (debug) {
      console.log(`${import_chalk2.default.gray("[CACHE]")} Loaded from cache: ${cachePath}`);
      console.log(`${import_chalk2.default.gray("[CACHE]")} Cached at: ${cachedContent.cachedAt || (cacheMetadata?.updatedAt || "unknown").toString()}`);
      if (isExpired) {
        console.log(`${import_chalk2.default.yellow("[CACHE]")} Cache is older than 1 hour, refetching...`);
      }
    }
    return isExpired ? null : cachedContent.data;
  } catch (error) {
    if (debug) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`${import_chalk2.default.yellow("[CACHE]")} Failed to read cache: ${errorMessage}`);
    }
    return null;
  }
}
async function fetchAndCacheMetadata(networkManager, cacheManager, endpoint, cachePath, type, repositoryName, debug) {
  try {
    if (debug) {
      console.log(`
${import_chalk2.default.yellow("[DEBUG]")} Fetching from remote: ${networkManager.baseUrl}/${endpoint}`);
    }
    const response = await networkManager.get(`/${endpoint}`);
    if (!response) {
      throw new Error("Failed to fetch metadata: received null response");
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const cacheData = {
      cachedAt: timestamp,
      data: response
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
    return response;
  } catch (error) {
    console.error(`
${import_chalk2.default.red("[ERROR]")} Failed to fetch ${type} metadata for ${repositoryName}:`, error);
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
  const Functions = await requestMetadata(normalizedType, extension, !!dev, !!debug, !!forceFetch);
  return SearchMetadata(normalizedType, Functions, preparedObjectName, null);
}
var Search = new import_commander.Command("search").aliases(["s", "lookup"]).description("Search for a specific function, enum or event in BotForge's documentation.").argument("<type>", "The type of object to search for (or their shortcuts).").argument("<object>", "The object name to search for (case insensitive).").option("-e, --extension <extension>", "Specify an extension to limit the search scope.").option("-r, --raw", "Output the result as raw JSON instead of formatted text.").option("-d, --dev", "Perform your research on the development branch.").option("--debug", "Show debug information during the search process.").option("--fetch", "Fetch information using HTTP request and forces to cache the results.").action(async (type, object, options) => {
  const SearchType = type.toLowerCase();
  const Spinner = (0, import_ora2.default)(`Searching for ${SearchType} '${object}'...`).start();
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
var Version = new import_commander2.Command("version").description("Returns the current version of the CLI and checks for updates.").aliases(["v", "ver"]).action(async () => {
  console.log(`Current version: ${import_chalk4.default.cyan(version)}
`);
  const spinner = new ProgressManager();
  spinner.Start("Checking for new version...");
  try {
    const response = await fetch(`https://registry.npmjs.org/@tryforge/cli`);
    const data = await response.json();
    const latestVersion = data["dist-tags"].latest;
    spinner.Stop();
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
    spinner.Stop();
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
