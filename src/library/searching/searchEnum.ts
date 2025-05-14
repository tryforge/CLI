import type { IEnum, IFileMetadata, IFunctionMetadata } from "@/types";

/**
 * Searches for matching enum entries by name in the provided enum object
 * 
 * This function searches through the enum object's values (arrays) to find any 
 * that contain the target name. It can search both keys and their associated values.
 * 
 * @template T - The type of the default value to return if no match is found
 * 
 * @param {IEnum} data - The enum object to search through
 * @param {string} targetName - The name to search for
 * @param {T} defaultValue - The default value to return if no matches are found
 * 
 * @returns {Promise<string[] | T>} A promise that resolves to either:
 *   - The matching string array if found
 *   - The provided default value (of type T) if no match was found
 * 
 * @async
 * @since 0.0.1
 */
export async function SearchEnum<T>(
  data: IEnum,
  targetName: string,
  defaultValue: T
): Promise<string[] | T> {
  const lowerTarget = targetName.toLowerCase();
  const lowercaseData = Object.keys(data).reduce((acc, key) => {
    acc[key.toLowerCase()] = data[key];
    return acc;
  }, {} as Record<string, string[]>);

  if (lowercaseData[lowerTarget]) {
    return lowercaseData[lowerTarget];
  }

  for (const key in lowercaseData) {
    if (lowercaseData[key].some(value => value.toLowerCase() === lowerTarget)) {
      return lowercaseData[key];
    }
  }

  return defaultValue;
}


/**
 * Metadata about the current file.
 * Contains information about the file location, authorship, and purpose.
 */
export const FileMetadata_searchEnum: IFileMetadata = {
  filename: 'searchEnum.ts',
  path: './dist/src/library/searching/searchEnum.ts',
  createdAt: new Date('2025-05-11T17:14:00+02:00'),
  updatedAt: new Date('2025-05-13T17:14:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Searches for an enum in an array by name and returns it or a default value',
  tags: ['CLI', 'Utility', 'Function']
};

/**
 * Metadata describing the SearchEnum.
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_SearchEnum: IFunctionMetadata = {
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
  returnType: 'Promise<IEnum | T>',
  isAsync: true,
  isExported: true
};