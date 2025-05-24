import chalk from 'chalk';

import { CacheManager, NetworkManager } from '../../managers';
import type { 
  TExtension, 
  TSearchType, 
  TRequestResult, 
  IFunctionMetadata, 
  IFileMetadata, 
  IFunction 
} from '../../structure';

const ONE_HOUR_MS: number = 60 * 60 * 1000;
const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/tryforge';

/**
 * Fetches metadata from GitHub repositories based on the specified extension.
 * 
 * This utility function retrieves the enums.json | functions.json | events.json metadata file from the appropriate
 * GitHub repository based on the provided extension name. If no extension is specified,
 * it defaults to 'forgescript'.
 * 
 * @param {TSearchType} type - Type of metadata to fetch (function, event, or enum)
 * @param {string} [extension='forgescript'] - The name of the extension to fetch from
 * @param {boolean} [dev=false] - Whether to fetch from the dev branch instead of main
 * @param {boolean} [debug=false] - Whether to output debug information during execution
 * @param {boolean} [forceFetch=false] - Whether to bypass cache and force a fresh fetch
 * 
 * @returns {Promise<TRequestResult>} A promise that resolves to the parsed JSON response containing
 *   metadata from the repository
 * 
 * @throws {Error} Throws an error if the HTTP request fails or if the response cannot be parsed
 * 
 * @example
 * const functions = await requestMetadata('function', 'forgescript', false, true);
 * 
 * @async
 * @since 0.0.1
 */
export async function requestMetadata(
  type: TSearchType,
  extension: string = 'forgescript',
  dev: boolean = false,
  debug: boolean = false,
  forceFetch: boolean = false
): Promise<TRequestResult> {
  const extensionName = extension.toLowerCase();

  const extensionRepos: Record<string, TExtension> = {
    forgedb: 'ForgeDB',
    forgecanvas: 'ForgeCanvas',
    forgetopgg: 'ForgeTopGG',
    forgescript: 'ForgeScript',
    forgemusic: 'ForgeMusic',
    forgelinked: 'ForgeLinked',
  };

  if (!(extensionName in extensionRepos)) {
    console.error(`\n${chalk.red('[ERROR]')} The extension '${extension}' is not supported.`);
    process.exit(1);
  }

  const repositoryName = extensionRepos[extensionName];
  const branch = dev ? 'dev' : 'main';
  const endpoint = `${repositoryName}/refs/heads/${branch}/metadata/${type}s.json`;
  
  // Initialize network manager with base URL
  const networkManager = new NetworkManager(GITHUB_RAW_BASE_URL);
  
  // Initialize cache manager (use current working directory for workspace)
  const cacheManager = new CacheManager(process.cwd());
  
  // Define cache path for the metadata - store in user directory rather than workspace
  const cachePath = `metadata/${extensionName}/${type}s.json`;

  if (!forceFetch) {
    const cachedResult = await tryGetCachedData(cacheManager, cachePath, debug);
    if (cachedResult) {
      return cachedResult;
    }
  }

  // Fetch fresh data
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

/**
 * Attempts to retrieve cached metadata data.
 * 
 * @param {CacheManager} cacheManager - The cache manager instance
 * @param {string} cachePath - Path to the cached file
 * @param {boolean} debug - Whether to output debug information
 * @returns {Promise<TRequestResult | null>} Cached data if valid, null otherwise
 */
async function tryGetCachedData(
  cacheManager: CacheManager,
  cachePath: string,
  debug: boolean
): Promise<TRequestResult | null> {
  try {
    const hasCachedData = await cacheManager.hasCache('user', cachePath);
    
    if (!hasCachedData) {
      return null;
    }

    const cacheMetadata = await cacheManager.getCacheMetadata('user', cachePath);
    const cachedContent = await cacheManager.readCache<{
      cachedAt: string;
      data: TRequestResult;
    }>('user', cachePath);
    
    if (!cachedContent || !cachedContent.data) {
      return null;
    }

    const cachedDate = new Date(
      cachedContent.cachedAt || (cacheMetadata?.updatedAt || new Date()).toISOString()
    );
    const now = new Date();
    const isExpired = now.getTime() - cachedDate.getTime() > ONE_HOUR_MS;

    if (debug) {
      console.log(`${chalk.gray('[CACHE]')} Loaded from cache: ${cachePath}`);
      console.log(`${chalk.gray('[CACHE]')} Cached at: ${cachedContent.cachedAt || (cacheMetadata?.updatedAt || "unknown").toString()}`);
      if (isExpired) {
        console.log(`${chalk.yellow('[CACHE]')} Cache is older than 1 hour, refetching...`);
      }
    }

    // Return cached data if not expired
    return isExpired ? null : cachedContent.data;
  } catch (error) {
    // Cache read failed, will proceed to fetch
    if (debug) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`${chalk.yellow('[CACHE]')} Failed to read cache: ${errorMessage}`);
    }
    return null;
  }
}

/**
 * Fetches metadata from the network and caches the result.
 * 
 * @param {NetworkManager} networkManager - The network manager instance
 * @param {CacheManager} cacheManager - The cache manager instance
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {string} cachePath - Path where to cache the result
 * @param {TSearchType} type - Type of metadata being fetched
 * @param {string} repositoryName - Name of the repository
 * @param {boolean} debug - Whether to output debug information
 * @returns {Promise<TRequestResult>} The fetched metadata
 * @throws {Error} If the network request fails
 */
async function fetchAndCacheMetadata(
  networkManager: NetworkManager,
  cacheManager: CacheManager,
  endpoint: string,
  cachePath: string,
  type: TSearchType,
  repositoryName: string,
  debug: boolean
): Promise<TRequestResult> {
  try {
    if (debug) {
      console.log(`\n${chalk.yellow('[DEBUG]')} Fetching from remote: ${networkManager.baseUrl}/${endpoint}`);
    }

    const response = await networkManager.get<TRequestResult>(`/${endpoint}`);
    
    if (!response) {
      throw new Error('Failed to fetch metadata: received null response');
    }

    // Cache the result with explicit cachedAt timestamp
    const timestamp = new Date().toISOString();
    const cacheData = {
      cachedAt: timestamp,
      data: response
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

    return response;
  } catch (error) {
    console.error(`\n${chalk.red('[ERROR]')} Failed to fetch ${type} metadata for ${repositoryName}:`, error);
    throw error;
  }
}

/**
 * Metadata about the current file
 * @internal
 */
export const fileMetadataRequestMetadata: IFileMetadata = {
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
export const functionMetadataRequestMetadata: IFunctionMetadata = {
  name: 'requestMetadata',
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