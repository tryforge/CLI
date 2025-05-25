// Node.js built-ins
import path from 'path';

// Local modules
import { FileSystem } from "./FileSystem";

/**
 * A type representing available caching scopes.
 */
type CacheScope = 'user' | 'workspace';

/**
 * An interface representing the content of a cache file object.
 */
interface CacheContent<T> {
  updatedAt: Date;
  data: T;
}

/**
 * An interface representing the metadata of a cache file.
 */
interface CacheMetadata {
  updatedAt: Date;
}

/**
 * An interface representing the CacheManager class.
 */
interface CacheScheme {
  /**
   * Writes cache data to a JSON file at the specified path, based on the given cache scope.
   *
   * @template T - The type of the cache content to write.
   * @param scope - The scope of the cache, either 'user' or workspace.
   * @param filePath - The relative file path where the cache should be written.
   * @param data - The cache content to write to the file.
   * @returns A promise that resolves to `true` if the write operation was successful, otherwise `false`.
   */
  WriteCache?<T>(
    scope: CacheScope,
    filePath: string,
    data: CacheContent<T>
  ): Promise<boolean>

  /**
   * Reads and returns the cached content from a specified file path within the given cache scope.
   *
   * @template T - The type of the cached content.
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the parsed cache content of type `CacheContent<T>`.
   */
  ReadCache?<T>(
    scope: CacheScope,
    filePath: string
  ): Promise<CacheContent<T> | null>

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
  ClearCache?(
    scope: CacheScope,
    filePath: string,
    deleteFile?: boolean, // Default: False
  ): Promise<boolean>

  /**
   * Checks whether a cache file exists at the specified path within the given scope.
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
   * @param scope - The scope of the cache to clear. Use `'user'` to clear user-level cache,
   *                or another value to clear workspace-level cache.
   * @returns A promise that resolves to `true` if the cache directory was successfully deleted, otherwise `false`.
   */
  ClearAllCache?(
    scope: CacheScope,
  ): Promise<boolean>;

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
  GetCacheMetadata?(
    scope: CacheScope,
    filePath: string
  ): Promise<CacheMetadata>;

  /**
   * Migrates a cache file from one scope to another by copying its contents.
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
}

/**
 * A class to manage local and workspace-located cache.
 */
export class CacheManager implements CacheScheme {
  /**
   * Writes cache data to a JSON file at the specified path, based on the given cache scope.
   *
   * @template T - The type of the cache content to write.
   * @param scope - The scope of the cache, either 'user' or workspace.
   * @param filePath - The relative file path where the cache should be written.
   * @param data - The cache content to write to the file.
   * @returns A promise that resolves to `true` if the write operation was successful, otherwise `false`.
   */
  public static async WriteCache<T>(
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
   * @template T - The type of the cached content.
   * @param scope - The cache scope, either 'user' or 'workspace', determining the base directory.
   * @param filePath - The relative path to the cache file.
   * @returns A promise that resolves to the parsed cache content of type `CacheContent<T>`.
   */
  public static async ReadCache<T>(
    scope: CacheScope,
    filePath: string,
  ): Promise<CacheContent<T>> {
    const cachePath = scope === 'user'
      ? path.join(FileSystem.GetHomePath(), filePath)
      : path.join(FileSystem.GetWorkspaceDirectory(), filePath);
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
   * @param scope - The scope of the cache to clear. Use `'user'` to clear user-level cache,
   *                or another value to clear workspace-level cache.
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
   * This method attempts to read a JSON file from the cache location determined by the provided scope
   * ('user' or workspace). If the file exists and contains an `updatedAt` property, it returns an object
   * with the `updatedAt` value. Otherwise, it returns `null`.
   *
   * @param scope - The cache scope, either 'user' or workspace.
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