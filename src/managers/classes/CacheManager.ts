// Node.js built-ins.
import path from 'path';

// Local modules.
import { FileSystem } from "./FileSystem";

/**
 * A type representing available caching scopes.
 */
export type CacheScope = 'user' | 'workspace';

/**
 * An interface representing the content of a cache file object.
 */
export type CacheContent<T = unknown> = {
  updatedAt: Date;
  data: T;
};

/**
 * An interface representing the metadata of a cache file.
 */
interface CacheMetadata {
  updatedAt: Date;
};

/**
 * An interface representing how the CacheManager class is structured.
 */
interface CacheScheme {
  /**
   * Writes cache data to a JSON file at the specified path, based on the given cache scope.
   *
   * This static method allows you to persist cache content of any type to a file, either in the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`), the `filePath` (a string representing the relative path where the cache should be stored), 
   * and the `data` (an object of type `CacheContent<T>`, which includes both the actual data and an `updatedAt` timestamp).
   * The method determines the correct base directory based on the scope, constructs the full file path, and writes the data as JSON.
   * If the operation is successful, it returns a Promise that resolves to `true`; otherwise, it resolves to `false`.
   * This method is asynchronous and should be awaited.
   * 
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   * 
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   * 
   * @template T - The type of the cache content to write.
   * 
   * Example usage:
   * ```typescript
   * await CacheManager.WriteCache('user', 'settings/cache.json', { updatedAt: new Date(), data: { theme: 'dark' } });
   * ```
   *
   * For more details on the cache structure, see the [CacheContent type definition](./CacheManager.ts).
   * 
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to a boolean.
   */
  WriteCache?<T = unknown>(
    scope: CacheScope,
    filePath: string,
    data: CacheContent<T>
  ): Promise<boolean>

  /**
   * Reads and returns the cached content from a specified file path within the given cache scope.
   *
   * This static method allows you to retrieve cache content of any type from a file, either in the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path where the cache is stored).
   * The method determines the correct base directory based on the scope, constructs the full file path, and reads the data as JSON.
   * If the operation is successful, it returns a Promise that resolves to the parsed cache content of type `CacheContent<T>`; otherwise, it may throw or return `null` depending on the underlying FileSystem implementation.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * @template T - The type of the cached content to read.
   *
   * Example usage:
   * ```typescript
   * const cache = await CacheManager.ReadCache<{ theme: string }>('user', 'settings/cache.json');
   * if (cache) {
   *   console.log(cache.data.theme); // Output: 'dark'
   * }
   * ```
   *
   * For more details on the cache structure, see the [CacheContent type definition](./CacheManager.ts).
   *
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the parsed cache content of type `CacheContent<T>`.
   */
  ReadCache?<T = unknown>(
    scope: CacheScope,
    filePath: string
  ): Promise<CacheContent<T> | null>

  /**
   * Clears the cache for the specified scope and file path.
   *
   * This static method allows you to either delete a cache file or overwrite it with an empty cache object, depending on the `deleteFile` flag.
   * You provide the `scope` (either `'user'` or `'workspace'`), the `filePath` (a string representing the relative path to the cache file),
   * and an optional `deleteFile` boolean (default: `false`). If `deleteFile` is `true`, the cache file is deleted. If `false`, the cache file is overwritten
   * with an empty cache object containing a new `updatedAt` timestamp and `data: null`.
   * The method determines the correct base directory based on the scope, constructs the full file path, and performs the operation accordingly.
   * Returns a Promise that resolves to `true` if the operation was successful, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Overwrite cache with empty object
   * await CacheManager.ClearCache('user', 'settings/cache.json');
   *
   * // Delete cache file
   * await CacheManager.ClearCache('workspace', 'settings/cache.json', true);
   * ```
   *
   * @param scope - The cache scope, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @param deleteFile - If `true`, deletes the cache file; otherwise, overwrites it with an empty cache object. Defaults to `false`.
   * @returns A promise that resolves to `true` if the operation was successful, or `false` otherwise.
   */
  ClearCache?(
    scope: CacheScope,
    filePath: string,
    deleteFile?: boolean, // Default: False
  ): Promise<boolean>

  /**
   * Checks whether a cache file exists at the specified path within the given scope.
   *
   * This static method allows you to check for the existence of a cache file in either the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path to the cache file).
   * The method determines the correct base directory based on the scope, constructs the full file path, and checks if the file exists.
   * Returns a Promise that resolves to `true` if the cache file exists, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * const exists = await CacheManager.CacheExists('user', 'settings/cache.json');
   * if (exists) {
   *   console.log('Cache file exists!');
   * }
   * ```
   *
   * @param scope - The scope of the cache, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to `true` if the cache file exists, or `false` otherwise.
   */
  CacheExists?(
    scope: CacheScope,
    filePath: string
  ): Promise<boolean>;

  /**
   * Clears all cached data within the specified scope by deleting the corresponding cache directory.
   *
   * This static method allows you to remove all cache files within either the user or workspace scope by deleting the entire cache directory.
   * You provide the `scope` (either `'user'` or `'workspace'`). The method determines the correct base directory based on the scope,
   * constructs the full directory path, and deletes the directory and its contents recursively.
   * Returns a Promise that resolves to `true` if the cache directory was successfully deleted, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Clear all user-level cache
   * await CacheManager.ClearAllCache('user');
   *
   * // Clear all workspace-level cache
   * await CacheManager.ClearAllCache('workspace');
   * ```
   *
   * @param scope - The scope of the cache to clear. Use `'user'` to clear user-level cache, or `'workspace'` to clear workspace-level cache.
   * @returns A promise that resolves to `true` if the cache directory was successfully deleted, otherwise `false`.
   */
  ClearAllCache?(
    scope: CacheScope,
  ): Promise<boolean>;

  /**
   * Retrieves the cache metadata for a given file path and scope.
   *
   * This static method attempts to read a JSON file from the cache location determined by the provided scope ('user' or 'workspace').
   * If the file exists and contains an `updatedAt` property, it returns an object with the `updatedAt` value. Otherwise, it returns `null`.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path to the cache file).
   * The method determines the correct base directory based on the scope, constructs the full file path, and reads the file as JSON.
   * Returns a Promise that resolves to the cache metadata containing `updatedAt`, or `null` if not found. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * const metadata = await CacheManager.CacheMetadata('user', 'settings/cache.json');
   * if (metadata) {
   *   console.log(metadata.updatedAt);
   * }
   * ```
   *
   * @param scope - The cache scope, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the cache metadata containing `updatedAt`, or `null` if not found.
   */
  CacheMetadata?(
    scope: CacheScope,
    filePath: string
  ): Promise<CacheMetadata>;

  /**
   * Migrates a cache file from one scope to another by copying its contents.
   *
   * This static method allows you to copy a cache file from one scope to another (e.g., from user to workspace or vice versa).
   * You provide the `fromScope` (source scope), `toScope` (destination scope), and the `filePath` (a string representing the relative path of the cache file to migrate).
   * The method determines the correct base directories based on the scopes, constructs the full file paths, and copies the file contents if the source file exists.
   * Returns a Promise that resolves to `true` if the migration was successful, or `false` if the source file does not exist or cannot be read. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Migrate cache from user to workspace
   * await CacheManager.MigrateCache('user', 'workspace', 'settings/cache.json');
   *
   * // Migrate cache from workspace to user
   * await CacheManager.MigrateCache('workspace', 'user', 'settings/cache.json');
   * ```
   *
   * @param fromScope - The source cache scope ('user' or 'workspace').
   * @param toScope - The destination cache scope ('user' or 'workspace').
   * @param filePath - The relative path of the cache file to migrate.
   * @returns A promise that resolves to `true` if the migration was successful, or `false` if the source file does not exist or cannot be read.
   */
  MigrateCache?(
    fromScope: CacheScope,
    toScope: CacheScope,
    filePath: string
  ): Promise<boolean>;
};

/**
 * Provides static methods for managing cache files and directories within user or workspace scopes.
 *
 * The `CacheManager` class offers a unified interface for reading, writing, clearing, migrating, and checking the existence of cache files.
 * It supports both user-level and workspace-level cache scopes, automatically resolving the correct base directory for each operation.
 * All methods are asynchronous and rely on the `FileSystem` class for file system interactions.
 *
 * **Features**
 * - Write cache data to a file (`WriteCache`)
 * - Read cache data from a file (`ReadCache`)
 * - Clear or delete individual cache files (`ClearCache`)
 * - Check if a cache file exists (`CacheExists`)
 * - Clear all cache files in a scope (`ClearAllCache`)
 * - Retrieve cache metadata (`CacheMetadata`)
 * - Migrate cache files between scopes (`MigrateCache`)
 *
 * **Example Usage**
 * ```typescript
 * // Write cache
 * await CacheManager.WriteCache('user', 'settings/cache.json', { updatedAt: new Date(), data: { theme: 'dark' } });
 *
 * // Read cache
 * const cache = await CacheManager.ReadCache<{ theme: string }>('user', 'settings/cache.json');
 *
 * // Clear cache file
 * await CacheManager.ClearCache('user', 'settings/cache.json');
 *
 * // Check if cache exists
 * const exists = await CacheManager.CacheExists('user', 'settings/cache.json');
 *
 * // Clear all cache in a scope
 * await CacheManager.ClearAllCache('workspace');
 *
 * // Get cache metadata
 * const metadata = await CacheManager.CacheMetadata('user', 'settings/cache.json');
 *
 * // Migrate cache between scopes
 * await CacheManager.MigrateCache('user', 'workspace', 'settings/cache.json');
 * ```
 *
 * @since 0.0.1
 * @see FileSystem
 * @see CacheContent
 * @see CacheScope
 * @see CacheMetadata
 * @view https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts
 */
export class CacheManager implements CacheScheme {

  /**
   * Writes cache data to a JSON file at the specified path, based on the given cache scope.
   *
   * This static method allows you to persist cache content of any type to a file, either in the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`), the `filePath` (a string representing the relative path where the cache should be stored), 
   * and the `data` (an object of type `CacheContent<T>`, which includes both the actual data and an `updatedAt` timestamp).
   * The method determines the correct base directory based on the scope, constructs the full file path, and writes the data as JSON.
   * If the operation is successful, it returns a Promise that resolves to `true`; otherwise, it resolves to `false`.
   * This method is asynchronous and should be awaited.
   * 
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   * 
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   * 
   * @template T - The type of the cache content to write.
   * 
   * Example usage:
   * ```typescript
   * await CacheManager.WriteCache('user', 'settings/cache.json', { updatedAt: new Date(), data: { theme: 'dark' } });
   * ```
   *
   * For more details on the cache structure, see the [CacheContent type definition](./CacheManager.ts).
   * 
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to a boolean.
   */
  public static async WriteCache<T = unknown>(
    scope: CacheScope,
    filePath: string,
    data: CacheContent<T>
  ): Promise<boolean> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);
    return FileSystem.WriteJSON(cachePath, data);
  }

  /**
   * Reads and returns the cached content from a specified file path within the given cache scope.
   *
   * This static method allows you to retrieve cache content of any type from a file, either in the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path where the cache is stored).
   * The method determines the correct base directory based on the scope, constructs the full file path, and reads the data as JSON.
   * If the operation is successful, it returns a Promise that resolves to the parsed cache content of type `CacheContent<T>`; otherwise, it may throw or return `null` depending on the underlying FileSystem implementation.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * @template T - The type of the cached content to read.
   *
   * Example usage:
   * ```typescript
   * const cache = await CacheManager.ReadCache<{ theme: string }>('user', 'settings/cache.json');
   * if (cache) {
   *   console.log(cache.data.theme); // Output: 'dark'
   * }
   * ```
   *
   * For more details on the cache structure, see the [CacheContent type definition](./CacheManager.ts).
   *
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the parsed cache content of type `CacheContent<T>`.
   */
  public static async ReadCache<T = unknown>(
    scope: CacheScope,
    filePath: string,
  ): Promise<CacheContent<T> | null> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);
    return await FileSystem.ReadJSON(cachePath);
  }

  /**
   * Clears the cache for the specified scope and file path.
   *
   * This static method allows you to either delete a cache file or overwrite it with an empty cache object, depending on the `deleteFile` flag.
   * You provide the `scope` (either `'user'` or `'workspace'`), the `filePath` (a string representing the relative path to the cache file),
   * and an optional `deleteFile` boolean (default: `false`). If `deleteFile` is `true`, the cache file is deleted. If `false`, the cache file is overwritten
   * with an empty cache object containing a new `updatedAt` timestamp and `data: null`.
   * The method determines the correct base directory based on the scope, constructs the full file path, and performs the operation accordingly.
   * Returns a Promise that resolves to `true` if the operation was successful, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Overwrite cache with empty object
   * await CacheManager.ClearCache('user', 'settings/cache.json');
   *
   * // Delete cache file
   * await CacheManager.ClearCache('workspace', 'settings/cache.json', true);
   * ```
   *
   * @param scope - The cache scope, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @param deleteFile - If `true`, deletes the cache file; otherwise, overwrites it with an empty cache object. Defaults to `false`.
   * @returns A promise that resolves to `true` if the operation was successful, or `false` otherwise.
   */
  public static async ClearCache(
    scope: CacheScope,
    filePath: string,
    deleteFile: boolean = false
  ): Promise<boolean> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);
    if (deleteFile) {
      return await FileSystem.DeleteFile(cachePath);
    } else {
      const emptyCache = { updatedAt: new Date(), data: null };
      return await FileSystem.WriteJSON(cachePath, emptyCache);
    }
  }

  /**
   * Checks whether a cache file exists at the specified path within the given scope.
   *
   * This static method allows you to check for the existence of a cache file in either the user or workspace scope.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path to the cache file).
   * The method determines the correct base directory based on the scope, constructs the full file path, and checks if the file exists.
   * Returns a Promise that resolves to `true` if the cache file exists, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * const exists = await CacheManager.CacheExists('user', 'settings/cache.json');
   * if (exists) {
   *   console.log('Cache file exists!');
   * }
   * ```
   *
   * @param scope - The scope of the cache, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to `true` if the cache file exists, or `false` otherwise.
   */
  public static async CacheExists(
    scope: CacheScope,
    filePath: string
  ): Promise<boolean> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);

    return await FileSystem.FileExists(cachePath);
  }

  /**
   * Clears all cached data within the specified scope by deleting the corresponding cache directory.
   *
   * This static method allows you to remove all cache files within either the user or workspace scope by deleting the entire cache directory.
   * You provide the `scope` (either `'user'` or `'workspace'`). The method determines the correct base directory based on the scope,
   * constructs the full directory path, and deletes the directory and its contents recursively.
   * Returns a Promise that resolves to `true` if the cache directory was successfully deleted, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Clear all user-level cache
   * await CacheManager.ClearAllCache('user');
   *
   * // Clear all workspace-level cache
   * await CacheManager.ClearAllCache('workspace');
   * ```
   *
   * @param scope - The scope of the cache to clear. Use `'user'` to clear user-level cache, or `'workspace'` to clear workspace-level cache.
   * @returns A promise that resolves to `true` if the cache directory was successfully deleted, otherwise `false`.
   */
  public static async ClearAllCache(
    scope: CacheScope,
  ): Promise<boolean> {
    const cacheDir = scope === 'user'
      ? FileSystem.GetHomePath()
      : FileSystem.GetWorkspaceDirectory();

    return await FileSystem.DeleteDirectory(cacheDir, true);
  }

  /**
   * Retrieves the cache metadata for a given file path and scope.
   *
   * This static method attempts to read a JSON file from the cache location determined by the provided scope ('user' or 'workspace').
   * If the file exists and contains an `updatedAt` property, it returns an object with the `updatedAt` value. Otherwise, it returns `null`.
   * You provide the `scope` (either `'user'` or `'workspace'`) and the `filePath` (a string representing the relative path to the cache file).
   * The method determines the correct base directory based on the scope, constructs the full file path, and reads the file as JSON.
   * Returns a Promise that resolves to the cache metadata containing `updatedAt`, or `null` if not found. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * const metadata = await CacheManager.CacheMetadata('user', 'settings/cache.json');
   * if (metadata) {
   *   console.log(metadata.updatedAt);
   * }
   * ```
   *
   * @param scope - The cache scope, either 'user' or 'workspace'.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the cache metadata containing `updatedAt`, or `null` if not found.
   */
  public static async CacheMetadata(
    scope: CacheScope,
    filePath: string,
  ): Promise<CacheMetadata | null> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);

    const content = await FileSystem.ReadJSON(cachePath);
    if (content && content.updatedAt) {
      return { updatedAt: content.updatedAt };
    }
    return null;
  }

  /**
   * Migrates a cache file from one scope to another by copying its contents.
   *
   * This static method allows you to copy a cache file from one scope to another (e.g., from user to workspace or vice versa).
   * You provide the `fromScope` (source scope), `toScope` (destination scope), and the `filePath` (a string representing the relative path of the cache file to migrate).
   * The method determines the correct base directories based on the scopes, constructs the full file paths, and copies the file contents if the source file exists.
   * Returns a Promise that resolves to `true` if the migration was successful, or `false` if the source file does not exist or cannot be read. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/CacheManager.ts)
   *
   * Example usage:
   * ```typescript
   * // Migrate cache from user to workspace
   * await CacheManager.MigrateCache('user', 'workspace', 'settings/cache.json');
   *
   * // Migrate cache from workspace to user
   * await CacheManager.MigrateCache('workspace', 'user', 'settings/cache.json');
   * ```
   *
   * @param fromScope - The source cache scope ('user' or 'workspace').
   * @param toScope - The destination cache scope ('user' or 'workspace').
   * @param filePath - The relative path of the cache file to migrate.
   * @returns A promise that resolves to `true` if the migration was successful, or `false` if the source file does not exist or cannot be read.
   */
  public static async MigrateCache(
    fromScope: CacheScope,
    toScope: CacheScope,
    filePath: string
  ): Promise<boolean> {
    const fromPath = fromScope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);

    const toPath = toScope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);

    if ((!await FileSystem.FileExists(fromPath))) return false;

    const data = await FileSystem.ReadJSON(fromPath);
    if (!data) return false;

    return await FileSystem.WriteJSON(toPath, data);
  }
}