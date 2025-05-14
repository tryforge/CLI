import type { IEvent, IFileMetadata, IFunctionMetadata } from "@/types";

/**
 * Fetches event metadata from GitHub repositories based on the specified extension.
 * 
 * This utility function retrieves the events.json metadata file from the appropriate
 * GitHub repository based on the provided extension name. If no extension is specified,
 * it defaults to 'forgescript'.
 * 
 * @param {string} [extension] - The name of the extension to fetch events for
 * 
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing
 *   event metadata from the repository
 * 
 * @throws {Error} Throws an error if the HTTP request fails or if the response cannot be parsed
 * 
 * @async
 * @since 0.0.1
 */
export async function RequestEvents(extension?: string): Promise<IEvent[]> {
  const ExtensionName = extension?.toLowerCase() || 'forgescript';
  const ExtensionRepos: Record<string, string> = {
    'forgedb': 'ForgeDB',
    'forgecanvas': 'ForgeCanvas',
    'forgetopgg': 'ForgeTopGG',
    'forgescript': 'ForgeScript'
  };
  
  const RepositoryName = ExtensionRepos[ExtensionName] || 'ForgeScript';
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

/**
 * Metadata about the current file
 * Contains information about the file location, authorship, and purpose
 */
export const FileMetadata_requestEvents: IFileMetadata = {
  filename: 'requestEvents.ts',
  path: './dist/src/library/seearching/requestEvents.ts',
  createdAt: new Date('2025-05-11T14:22:00+02:00'),
  updatedAt: new Date('2025-05-13T17:30:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Fetches event metadata from GitHub repositories based on extension name',
  tags: ['CLI', 'API', 'GitHub', 'ForgeScript']
};

/**
 * Metadata describing the RequestEvents function
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_RequestEvents: IFunctionMetadata = {
  name: 'RequestEvents',
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