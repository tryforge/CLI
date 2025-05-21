import chalk from 'chalk';

import { CacheManager } from '../../managers/CacheManager';
import type { TExtension, TSearchType, TRequestResult, IFunctionMetadata, IFileMetadata } from '../../structure';

const OneHour: number = 60 * 60 * 1000;

/**
 * Fetches metadata from GitHub repositories based on the specified extension.
 * 
 * This utility function retrieves the enums.json | functions.json | events.json metadata file from the appropriate
 * GitHub repository based on the provided extension name. If no extension is specified,
 * it defaults to 'forgescript'.
 * 
 * @param {string} [extension] - The name of the extension to fetch from.
 * 
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing
 *   enum metadata from the repository
 * 
 * @throws {Error} Throws an error if the HTTP request fails or if the response cannot be parsed
 * 
 * @async
 * @since 0.0.1
 */
export async function RequestMetadata(
  type: TSearchType,
  extension = 'forgescript',
  dev = false,
  debug = false,
  forceFetch = false
): Promise<TRequestResult> {
  const ExtensionName = extension.toLowerCase();

  const ExtensionRepos: Record<string, TExtension> = {
    forgedb: 'ForgeDB',
    forgecanvas: 'ForgeCanvas',
    forgetopgg: 'ForgeTopGG',
    forgescript: 'ForgeScript',
    forgemusic: 'ForgeMusic',
    forgelinked: 'ForgeLinked',
  };

  if (!(ExtensionName in ExtensionRepos)) {
    console.error(`\n${chalk.red('[ERROR]')} The extension '${extension}' is not supported.`);
    process.exit(1);
  }

  const RepositoryName = ExtensionRepos[ExtensionName];
  const Branch = dev ? 'dev' : 'main';
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/${Branch}/metadata/${type}s.json`;
  
  // Initialize cache manager (use current working directory for workspace)
  const cacheManager = new CacheManager(process.cwd());
  
  // Define cache path for the metadata - store in user directory rather than workspace
  const cachePath = `metadata/${ExtensionName}/${type}s.json`;

  if (!forceFetch) {
    // Try to get cached data first
    try {
      // Check if cache exists first
      const hasCachedData = await cacheManager.hasCache('user', cachePath);
      
      if (hasCachedData) {
        // Get cache metadata first to display accurate timestamp
        const cacheMetadata = await cacheManager.getCacheMetadata('user', cachePath);

        // Get the actual cached data
        const cachedContent = await cacheManager.readCache<{
          cachedAt: string;
          data: TRequestResult;
        }>('user', cachePath);
        
        if (cachedContent && cachedContent.data) {
          const cachedDate = new Date(cachedContent.cachedAt || (cacheMetadata?.updatedAt || new Date()).toISOString());
          const now = new Date();
          const isExpired = now.getTime() - cachedDate.getTime() > OneHour;

          if (debug) {
            console.log(`${chalk.gray('[CACHE]')} Loaded from cache: ${cachePath}`);
            console.log(`${chalk.gray('[CACHE]')} Cached at: ${cachedContent.cachedAt || (cacheMetadata?.updatedAt || "unknown").toString()}`);
            if (isExpired) {
              console.log(`${chalk.yellow('[CACHE]')} Cache is older than 1 hour, refetching...`);
            }
          }

          // Return cached data if not expired
          if (!isExpired) {
            return cachedContent.data;
          }
        }
      }
    } catch (error) {
      // Cache read failed, will proceed to fetch
      if (debug) {
        if (error instanceof Error) {
          console.log(`${chalk.yellow('[CACHE]')} Failed to read cache: ${error.message}`);
        } else {
          console.log(`${chalk.yellow('[CACHE]')} Failed to read cache: ${String(error)}`);
        }
      }
    }
  }

  // Fetch fresh data
  try {
    if (debug) {
      console.log(`\n${chalk.yellow('[DEBUG]')} Fetching from remote: ${url}`);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json: TRequestResult = await response.json();

    // Cache the result with explicit cachedAt timestamp
    const timestamp = new Date().toISOString();
    const cacheData = {
      cachedAt: timestamp,
      data: json
    };

    const cacheResult = await cacheManager.writeCache('user', cachePath, cacheData);

    if (debug) {
      if (cacheResult) {
        console.log(`${chalk.green('[SUCCESS]')} Cached to ${cachePath}`);
        console.log(`${chalk.gray('[CACHE]')} Cache timestamp: ${timestamp}`);
      } else {
        console.log(`${chalk.yellow('[WARNING]')} Failed to cache metadata`);
      }
    }

    return json;
  } catch (error) {
    console.error(`\n${chalk.red('[ERROR]')} Failed to fetch ${type} metadata for ${RepositoryName}:`, error);
    throw error;
  }
}

/**
 * Metadata about the current file
 * @internal
 */
export const FileMetadata_requestMetadata: IFileMetadata = {
  filename: 'requestMetadata.ts',
  createdAt: new Date('2025-05-11T14:22:00+02:00'),
  updatedAt: new Date('2025-05-21T15:05:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Fetches metadata (functions, events, enums) from Forge ecosystem GitHub repositories',
  tags: ['CLI', 'API', 'GitHub', 'ForgeScript', 'Metadata', 'Cache']
};

/**
 * Metadata describing the RequestMetadata function
 * @internal
 */
export const FunctionMetadata_RequestMetadata: IFunctionMetadata = {
  name: 'RequestMetadata',
  description: 'Fetches metadata from Forge ecosystem GitHub repositories.',
  parameters: [
    {
      name: 'type',
      type: 'SearchType',
      description: 'Type of metadata to fetch (function, event, or enum).'
    },
    {
      name: 'extension',
      type: 'string?',
      defaultValue: 'forgescript',
      description: 'Name of the extension to fetch from.'
    },
    {
      name: 'dev',
      type: 'boolean?',
      description: 'Whether to fetch from the dev branch instead of main.'
    },
    {
      name: 'debug',
      type: 'boolean?',
      description: 'Whether to output debug information during execution.'
    },
    {
      name: 'forceFetch',
      type: 'boolean?',
      description: 'Whether to bypass cache and force a fresh fetch.'
    }
  ],
  returnType: 'Promise<IFunction[] | IEvent[] | Record<string, string[]>>',
  isAsync: true,
  isExported: true
};