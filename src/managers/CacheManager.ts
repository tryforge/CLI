// 1. Node.js built-ins
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

// 3. Local modules
import { Logger } from './Logger';

/**
 * A type representing available caching scopes.
 */
type CacheScope = 'user' | 'workspace';

/**
 * An interface representing the content of a cache file object.
 */
export interface CacheContent<T> {
  updatedAt: Date;
  data: T;
}

/**
 * An interface representing the object returned after a cache file being cleared.
 */
interface ClearedCacheResult<T> {
  success: boolean;
  data: T;
}

/**
 * An interface representing the metadata of a cache file.
 */
interface CacheMetadata {
  updatedAt: Date;
}

/**
 * An abstract scheme class representing the CacheManager class.
 */
abstract class CacheScheme {
  abstract LocalCachePath: string;
  abstract WorkspaceCachePath: string;

  abstract writeCache(
    scope: CacheScope, 
    path: string, 
    data: object
  ): Promise<boolean>;
  
  abstract readCache<T>(
    scope: CacheScope, 
    path: string
  ): Promise<T | null>;
  
  abstract clearCache<T>(
    scope: CacheScope, 
    path?: string
  ): Promise<ClearedCacheResult<T>>;

  abstract localCacheExists(): Promise<boolean>;
  
  abstract getCachePath(
    scope: CacheScope, 
    path?: string
  ): string;
  
  abstract hasCache(
    scope: CacheScope, 
    path?: string
  ): Promise<boolean>;
  
  abstract getCacheMetadata(
    scope: CacheScope, 
    path?: string
  ): Promise<CacheMetadata | null>;
}

/**
 * Manages local and workspace-specific cache directories.
 */
export class CacheManager extends CacheScheme {
  public LocalCachePath: string;
  public WorkspaceCachePath: string;

  constructor(private WorkspaceRoot: string) {
    super();
    this.LocalCachePath = path.join(os.homedir() || '', '.forge');
    this.WorkspaceCachePath = path.join(this.WorkspaceRoot, '.forge');
  }

  /**
   * Ensures the directory exists, returns true if it exists/was created successfully.
   */
  public async localCacheExists(): Promise<boolean> {
    try {
      await fs.mkdir(
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
  private async workspaceCacheExists(): Promise<boolean> {
    try {
      await fs.mkdir(
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
  public getCachePath(
    scope: CacheScope, 
    cachePath?: string
  ): string {
    const basePath = scope === 'user' ? this.LocalCachePath : this.WorkspaceCachePath;
    if (!cachePath) {
      return basePath;
    }

    return path.join(basePath, cachePath);
  }

  /**
   * Writes data to cache.
   */
  public async writeCache(
    scope: CacheScope, 
    cachePath: string, 
    data: object
  ): Promise<boolean> {
    try {
      if (scope === 'user') {
        await this.localCacheExists();
      } else {
        await this.workspaceCacheExists();
      }

      const fullPath = this.getCachePath(
        scope, 
        cachePath.endsWith('.json') ? cachePath : `${cachePath}.json`
      );

      const parentDirectory = path.dirname(fullPath);
      await fs.mkdir(
        parentDirectory, 
        { recursive: true }
      );

      const cacheContent: CacheContent<typeof data> = {
        updatedAt: new Date(),
        data
      };

      if (await this.hasCache(scope, cachePath)) {
        const existingCache = await this.readCache<any>(scope, cachePath);
        if (existingCache && existingCache.updatedAt) {
          cacheContent.updatedAt = new Date(existingCache.updatedAt);
        }
      }

      // Write the file.
      await fs.writeFile(
        fullPath,
        JSON.stringify(cacheContent, null, 2),
        'utf-8'
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
  public async readCache<T>(
    scope: CacheScope, 
    cachePath: string
  ): Promise<T | null> {
    try {
      const fullPath = this.getCachePath(scope, cachePath);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      const cacheContent = JSON.parse(fileContent) as CacheContent<T>;

      return cacheContent.data;
    } catch {
      return null;
    }
  }

  /**
   * Checks if cache exists at the given path.
   */
  public async hasCache(
    scope: CacheScope, 
    cachePath?: string
  ): Promise<boolean> {
    try {
      const fullPath = this.getCachePath(scope, cachePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Lists all cache entries in the specified scope.
   */
  public async listCache(scope: CacheScope): Promise<string[]> {
    try {
      const basePath = this.getCachePath(scope);

      const listJsonFiles = async (
        dirPath: string, 
        baseDir: string
      ): Promise<string[]> => {
        const entries = await fs.readdir(
          dirPath, 
          { withFileTypes: true }
        );

        const files: string[] = [];

        for (const entry of entries) {
          const fullPath = path.join(dirPath, entry.name);
          const relativePath = path.relative(baseDir, fullPath);

          if (entry.isDirectory()) {
            const nestedFiles = await listJsonFiles(fullPath, baseDir);
            files.push(...nestedFiles);
          } else if (entry.isFile() && entry.name.endsWith('.json')) {
            files.push(relativePath);
          }
        }

        return files;
      };

      if (scope === 'user') {
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
  public async getCacheMetadata(
    scope: CacheScope, 
    cachePath?: string
  ): Promise<CacheMetadata | null> {
    try {
      if (!cachePath) {
        return null;
      }

      const fullPath = this.getCachePath(scope, cachePath);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      const cacheContent = JSON.parse(fileContent) as CacheContent<unknown>;

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
  public async clearCache<T>(
    scope: CacheScope, 
    cachePath?: string
  ): Promise<ClearedCacheResult<T>> {
    try {
      if (cachePath) {
        const fullPath = this.getCachePath(scope, cachePath);
        let data: T | null = null;

        try {
          data = await this.readCache<T>(scope, cachePath);
        } catch { }

        await fs.unlink(fullPath);

        return {
          success: true,
          data: data as T
        };
      } else {
        const basePath = scope === 'user' ? this.LocalCachePath : this.WorkspaceCachePath;

        try {
          await fs.access(basePath);
          await fs.rm(
            basePath, 
            { recursive: true, force: true }
          );

          if (scope === 'user') {
            await this.localCacheExists();
          } else {
            await this.workspaceCacheExists();
          }
        } catch {
          if (scope === 'user') {
            await this.localCacheExists();
          } else {
            await this.workspaceCacheExists();
          }
        }

        return {
          success: true,
          data: {} as T
        };
      }
    } catch (error) {
      Logger.error(`Failed to clear cache: ${scope}/${cachePath || 'all'}.`);
      return {
        success: false,
        data: {} as T
      };
    }
  }
}

/**
 * Metadata about the current file.
 * @internal
 */
export const FILE_METADATA_LOGGER = {
  filename: 'CacheManager.ts',
  createdAt: new Date('2025-05-21T15:30:00+02:00'),
  updatedAt: new Date('2025-05-21T19:45:00+02:00'),
  author: 'striatp',
  description: 'Caching manager class.',
  tags: ['CLI', 'Cache', 'Utility']
};