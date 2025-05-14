import type { IEvent, IFileMetadata, IFunctionMetadata } from "@/types";

/**
 * Searches for matching events by name in the provided event data.
 * 
 * This function searches for an event by name, either exact or case-insensitive,
 * and returns the event's details if found. If no match is found, it returns the provided default value.
 * 
 * @template T - The type of the default value to return if no match is found
 * 
 * @param {IEvent[]} data - The array of event objects to search through
 * @param {string} targetName - The name of the event to search for
 * @param {T} defaultValue - The default value to return if no matching event is found
 * 
 * @returns {Promise<IEvent | T>} A promise that resolves to either:
 *   - The found event object if a match is found
 *   - The provided default value (of type T) if no match was found
 * 
 * @async
 * @since 0.0.1
 */
export async function SearchEvents<T>(
  data: IEvent[],
  targetName: string,
  defaultValue: T
): Promise<IEvent | T> {
  const lowerTarget = targetName.toLowerCase();
  const result = data.find(item => item.name.toLowerCase() === lowerTarget);

  return result || defaultValue;
}


/**
 * Metadata about the current file.
 * Contains information about the file location, authorship, and purpose.
 */
export const FileMetadata_searchEvent: IFileMetadata = {
  filename: 'searchEvent.ts',
  path: './dist/src/library/searching/searchEnum.ts',
  createdAt: new Date('2025-05-11T17:14:00+02:00'),
  updatedAt: new Date('2025-05-13T17:14:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Searches for an event in an array by name and returns it or a default value',
  tags: ['CLI', 'Utility', 'Function']
};

/**
 * Metadata describing the SearchEvent.
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_SearchEvent: IFunctionMetadata = {
  name: 'SearchEnum',
  parameters: [
    {
      name: 'data',
      type: 'IEnum[]'
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
  returnType: 'Promise<IEvent | T>',
  isAsync: true,
  isExported: true
};