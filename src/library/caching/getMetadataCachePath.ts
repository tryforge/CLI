import path from 'path';
import os from 'os';
import { SearchType } from '../../types';

/**
 * Returns the full path for the cached metadata file.
 */
export function getMetadataCachePath(extension: string, type: SearchType): string {
  return path.join(
    os.homedir(),
    '.forgerc',
    'cache',
    'metadata',
    extension.toLowerCase(),
    `${type}s.json`
  );
}
