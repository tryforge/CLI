import type { IFunctionMetadata } from '@/types';

/**
 * Represents metadata associated with a specific file in the project.
 * Useful for tooling, code analysis, documentation generation, or project indexing.
 */
export interface IFileMetadata {
  /**
   * The name of the file, including its extension.
   */
  filename: string;

  /**
   * The date and time when the file was initially created.
   */
  createdAt: Date;

  /**
   * The date and time of the file’s last modification.
   */
  updatedAt: Date;

  /**
   * The name or identifier of the original author of the file.
   */
  author?: string;

  /**
   * A short description of what the file contains or its purpose.
   */
  description?: string;

  /**
   * A list of relevant tags or keywords associated with the file.
   */
  tags?: string[];

  /**
   * A list of function metadata objects declared within this file.
   */
  functions?: IFunctionMetadata[];
}