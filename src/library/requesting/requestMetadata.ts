import fs from 'fs/promises';
import chalk from 'chalk';
import path from 'path';

import { getMetadataCachePath } from '../../library';
import type { TExtension, TSearchType, TRequestResult, IFunctionMetadata, IFileMetadata } from '../../types';

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

  const CachePath = getMetadataCachePath(ExtensionName, type);

  if (!forceFetch) {
    try {
      const Cached = await fs.readFile(CachePath, 'utf-8');
      const Parsed: { cachedAt: string; data: TRequestResult } = JSON.parse(Cached);

      const CachedDate = new Date(Parsed.cachedAt);
      const Now = new Date();

      const isExpired = Now.getTime() - CachedDate.getTime() > OneHour;

      if (debug) {
        console.log(`${chalk.gray('[CACHE]')} Loaded from cache: ${CachePath}`);
        console.log(`${chalk.gray('[CACHE]')} Cached at: ${Parsed.cachedAt}`);
        if (isExpired) {
          console.log(`${chalk.yellow('[CACHE]')} Cache is older than 1 hour, refetching...`);
        }
      }

      if (!isExpired) {
        return Parsed.data;
      }
    } catch {
      // Fallback
      try {
        if (debug) {
          console.log(`\n${chalk.yellow('[DEBUG]')} Fetching from remote: ${url}`);
        }

        const Response = await fetch(url);
        if (!Response.ok) {
          throw new Error(`HTTP error! Status: ${Response.status}`);
        }

        const json: TRequestResult = await Response.json();

        const CacheDir = path.dirname(CachePath);
        await fs.mkdir(CacheDir, { recursive: true });

        const Wrapped: { cachedAt: string; data: TRequestResult } = {
          cachedAt: new Date().toISOString(),
          data: json
        };

        await fs.writeFile(CachePath, JSON.stringify(Wrapped, null, 2), 'utf-8');

        if (debug) {
          console.log(`${chalk.green('[SUCCESS]')} Cached to ${CachePath}`);
        }

        return json;
      } catch (error) {
        console.error(`\n${chalk.red('[ERROR]')} Failed to fetch ${type} metadata for ${RepositoryName}:`, error);
        throw error;
      }
    }
  }

  // Fallback
  try {
    if (debug) {
      console.log(`\n${chalk.yellow('[DEBUG]')} Fetching from remote: ${url}`);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json: TRequestResult = await response.json();

    const cacheDir = path.dirname(CachePath);
    await fs.mkdir(cacheDir, { recursive: true });

    const wrapped: { cachedAt: string; data: TRequestResult } = {
      cachedAt: new Date().toISOString(),
      data: json
    };

    await fs.writeFile(CachePath, JSON.stringify(wrapped, null, 2), 'utf-8');

    if (debug) {
      console.log(`${chalk.green('[SUCCESS]')} Cached to ${CachePath}`);
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
  updatedAt: new Date('2025-05-18T12:11:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Fetches metadata (functions, events, enums) from Forge ecosystem GitHub repositories',
  tags: ['CLI', 'API', 'GitHub', 'ForgeScript', 'Metadata']
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