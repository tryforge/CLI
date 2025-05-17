import type { IFileMetadata, IFunctionMetadata, SearchType, RequestResult, SearchResult } from "../../types";

/**
 * Searches for metadata based on type and returns a match or default value.
 * 
 * This utility function searches through different types of data structures
 * based on the specified search type. It handles functions, events, and enum
 * lookups with appropriate type safety.
 * 
 * @template T - The type of the default value to return if no match is found
 * 
 * @param {SearchType} normalizedType - The type of search to perform ('function', 'event', or 'enum')
 * @param {RequestResult} data - The data structure to search through (varies by search type)
 * @param {string} targetName - The name of the item to find
 * @param {T} defaultValue - The default value to return if no matching item is found
 * 
 * @returns {Promise<SearchResult | T>} A promise that resolves to either:
 *   - The found item if a match was found
 *   - The provided default value (of type T) if no match was found
 * @async
 * @since 0.0.1
 */
export async function SearchMetadata<T>(
  normalizedType: SearchType,
  data: RequestResult, 
  targetName: string, 
  defaultValue: T
): Promise<SearchResult | T> {
  // Check if data exists
  if (!data) {
    throw new Error("Invalid data provided for search");
  }

  const lowerTarget = targetName.toLowerCase();

  switch (normalizedType) {
    case 'function':
      const functionResult = data.find(item =>
        item.name?.toLowerCase() === lowerTarget ||
        item.aliases?.some(alias => alias.toLowerCase() === lowerTarget)
      );

      return functionResult || defaultValue;
      
    case 'event':
      const eventResult = data.find(item => 
        item.name.toLowerCase() === lowerTarget
      );

      return eventResult || defaultValue;
      
    case 'enum':
      if (targetName in data) {
        return data[targetName];
      }
      return defaultValue;
      
    default:
      throw new Error(`Unsupported search type: ${normalizedType}`);
  }
}

/**
 * Metadata about the current file.
 * Contains information about the file location, authorship, and purpose.
 */
export const FileMetadata_searchMetadata: IFileMetadata = {
  filename: 'searchMetadata.ts',
  createdAt: new Date('2025-05-11T17:14:00+02:00'),
  updatedAt: new Date('2025-05-17T15:30:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Searches for metadata by name across different data structures and returns it or a default value',
  tags: ['CLI', 'Utility', 'Function']
};

/**
 * Metadata describing the SearchMetadata function.
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_SearchMetadata: IFunctionMetadata = {
  name: 'SearchMetadata',
  parameters: [
    {
      name: 'normalizedType',
      type: 'SearchType'
    },
    {
      name: 'data',
      type: 'RequestResult'
    },
    {
      name: 'targetName',
      type: 'string'
    },
    {
      name: 'defaultValue',
      type: 'T'
    }
  ],
  returnType: 'Promise<SearchResult | T>',
  isAsync: true,
  isExported: true
};