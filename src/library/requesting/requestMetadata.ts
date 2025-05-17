import chalk from 'chalk';

import type { IFileMetadata, IFunctionMetadata, Extension, SearchType, IFunction, IEvent } from "../../types";

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
  type: SearchType,
  extension?: string,
  dev?: boolean,
  debug?: boolean,
  forceFetch?: boolean
): Promise<IFunction[] | IEvent[] | Record<string, string[]>> {
  const ExtensionName = extension?.toLowerCase() || 'forgescript';
  const ExtensionRepos: Record<string, Extension> = {
    'forgedb': 'ForgeDB',
    'forgecanvas': 'ForgeCanvas',
    'forgetopgg': 'ForgeTopGG',
    'forgescript': 'ForgeScript',
    'forgemusic': 'ForgeMusic',
    'forgelinked': 'ForgeLinked'
  };
  if (!(ExtensionName in ExtensionRepos)) {
    console.log(`\n${chalk.red('[ERROR]')} The extension ${extension} does not exist or is not supported yet.`);
    process.exit(1)
  }
  const RepositoryName = ExtensionRepos[ExtensionName] || 'ForgeScript';
  const url = `https://raw.githubusercontent.com/tryforge/${RepositoryName}/refs/heads/${dev ? 'dev' : 'main'}/metadata/${type}s.json`;
  
  try {
    debug ? console.log(`\n${chalk.yellow('[DEBUG]')} Requesting (GET) 'https://github.com/tryforge/ForgeScript/blob/dev/metadata/${'NormalizedType'}s.json' and potentially storing them inside cache (if caching cooldown is over).`) : null
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

/**
 * Metadata about the current file
 * Contains information about the file location, authorship, and purpose
 */
export const FileMetadata_requestEnums: IFileMetadata = {
  filename: 'requestEnums.ts',
  createdAt: new Date('2025-05-11T14:22:00+02:00'),
  updatedAt: new Date('2025-05-13T17:30:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Fetches enum metadata from GitHub repositories based on extension name',
  tags: ['CLI', 'API', 'GitHub', 'ForgeScript']
};

/**
 * Metadata describing the RequestEnums function
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_RequestEnums: IFunctionMetadata = {
  name: 'RequestEnums',
  parameters: [
    {
      name: 'extension',
      type: 'string?'
    }
  ],
  returnType: 'Promise<any>',
  isAsync: true,
  isExported: true
};