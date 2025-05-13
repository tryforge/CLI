import type { IFunctionMetadata } from '@/types';

/**
 * Represents metadata associated with a specific file in the project.
 * Useful for tooling, code analysis, documentation generation, or project indexing.
 */
export interface IFileMetadata {
  /**
   * The name of the file, including its extension.
   * Example: "authHandler.ts"
   */
  filename: string;

  /**
   * The full relative or absolute path to the file.
   * Example: "src/commands/init.ts"
   */
  path: string;

  /**
   * The date and time when the file was initially created.
   * Useful for tracking file history or auditing.
   */
  createdAt: Date;

  /**
   * The date and time of the file’s last modification.
   * Can be used to detect stale or frequently updated files.
   */
  updatedAt: Date;

  /**
   * The name or identifier of the original author of the file.
   * Optional, but useful in collaborative projects or contribution tracking.
   */
  author?: string;

  /**
   * A short description of what the file contains or its purpose.
   * Helps with indexing and searchability in larger codebases.
   */
  description?: string;

  /**
   * A list of relevant tags or keywords associated with the file.
   * Can be used for categorization, filtering, or search.
   * Example: ["cli", "init", "generator"]
   */
  tags?: string[];

  /**
   * A list of function metadata objects declared within this file.
   * Enables cross-referencing function-level details from file-level metadata.
   */
  functions?: IFunctionMetadata[];
}