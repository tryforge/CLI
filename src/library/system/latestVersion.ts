import { name } from '../../../package.json';
import type { IFileMetadata, IFunctionMetadata } from '../../types';

/**
 * Checks if the currently installed version is the latest available on npm.
 * 
 * @param current_version - The current version of the CLI (from package.json)
 * @returns `true` if up-to-date, `false` if outdated, `null` on error
 */
export async function LatestVersion(current_version: string): Promise<boolean> {
  try {
    const Response = await fetch(`https://registry.npmjs.org/${name}`);
    const Data = await Response.json();
    const LatestVersion = Data['dist-tags'].latest;

    return LatestVersion === current_version;
  } catch {
    return false;
  }
}

/**
 * Metadata about the current file.
 * Contains information about the file location, authorship, and purpose.
 */
export const FileMetadata_latestVersion: IFileMetadata = {
  filename: 'latestVersion.ts',
  createdAt: new Date('2025-05-13T17:18:00+02:00'),
  updatedAt: new Date('2025-05-14T14:14:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'Checks if the current version is the highest.',
  tags: ['CLI', 'Utility', 'Function']
};

/**
 * Metadata describing the LatestVersion.
 * Documents the function signature, parameters, and return type for API generation
 * and documentation purposes
 */
export const FunctionMetadata_LatestVersion: IFunctionMetadata = {
  name: 'SearchFunction',
  parameters: [
    {
      name: 'current_version',
      type: 'string'
    }
  ],
  returnType: 'Promise<boolean>',
  isAsync: true,
  isExported: true
};