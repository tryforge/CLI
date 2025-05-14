import type { IFunction, IFileMetadata, IFunctionMetadata } from "@/types";

/**
 * Searches for a function in an array by name and returns it or a default value.
 * 
 * This utility function searches through an array of IFunction objects to find
 * an item with a matching name. If found, the matching function is returned.
 * If no match is found, the provided default value is returned instead.
 * 
 * @template T - The type of the default value to return if no function is found
 * 
 * @param {IFunction[]} data - The array of function objects to search through
 * @param {string} targetName - The name of the function to find
 * @param {T} defaultValue - The default value to return if no matching function is found
 * 
 * @returns {Promise<IFunction | T>} A promise that resolves to either:
 *   - The found IFunction object if a match was found
 *   - The provided default value (of type T) if no match was found
 * @async
 * @since 0.0.1
 */
export async function SearchFunction<T>(
  data: IFunction[], 
  targetName: string, 
  defaultValue: T
): Promise<IFunction | T> {
  const LowerTarget = targetName.toLowerCase();

  const Result = data.find(item =>
    item.name?.toLowerCase() === LowerTarget ||
    item.aliases?.some(alias => alias.toLowerCase() === LowerTarget)
  );

  return Result || defaultValue;
}


/**
 * Metadata about the current file.
 * Contains information about the file location, authorship, and purpose.
 */
export const FileMetadata_searchFunction: IFileMetadata = {
  filename: 'searchFunction.ts',
  path: './dist/src/library/searching/searchFunction.ts',
  createdAt: new Date('2025-05-11T17:14:00+02:00'),
  updatedAt: new Date('2025-05-13T17:14:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Searches for a function in an array by name and returns it or a default value',
  tags: ['CLI', 'Utility', 'Function']
};

/**
 * Metadata describing the SearchFunction.
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_SearchFunction: IFunctionMetadata = {
  name: 'SearchFunction',
  parameters: [
    {
      name: 'data',
      type: 'IFunction[]'
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
  returnType: 'Promise<IFunction | T>',
  isAsync: true,
  isExported: true
};