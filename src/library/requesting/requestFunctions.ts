import type { IFileMetadata, IFunction, IFunctionMetadata } from "@/types";

/**
 * Fetches function metadata from GitHub repositories based on the specified extension.
 * 
 * This utility function retrieves the functions.json metadata file from the appropriate
 * GitHub repository based on the provided extension name. If no extension is specified,
 * it defaults to 'forgescript'.
 * 
 * @param {string} [extension] - The name of the extension to fetch functions for
 * 
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing
 *   function metadata from the repository
 * 
 * @throws {Error} Throws an error if the HTTP request fails or if the response cannot be parsed
 * 
 * @async
 * @since 0.0.1
 */
export async function RequestFunctions(extension?: string): Promise<IFunction[]> {
  const ExtensionName = extension?.toLowerCase() || 'forgescript';
  const ExtensionRepos: Record<string, string> = {
    'forgedb': 'ForgeDB',
    'forgecanvas': 'ForgeCanvas',
    'forgetopgg': 'ForgeTopGG',
    'forgescript': 'ForgeScript'
  };
  
  const RepositoryName = ExtensionRepos[ExtensionName] || 'ForgeScript';
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

/**
 * Metadata about the current file
 * Contains information about the file location, authorship, and purpose
 */
export const FileMetadata_requestFunctions: IFileMetadata = {
  filename: 'requestFunctions.ts',
  createdAt: new Date('2025-05-11T14:22:00+02:00'),
  updatedAt: new Date('2025-05-13T17:30:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Fetches function metadata from GitHub repositories based on extension name',
  tags: ['CLI', 'API', 'GitHub', 'ForgeScript']
};

/**
 * Metadata describing the RequestFunctions function
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_RequestFunctions: IFunctionMetadata = {
  name: 'RequestFunctions',
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