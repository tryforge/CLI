#!/usr/bin/env tsx
/**
 * Represents metadata associated with a specific file in the project.
 * Useful for tooling, code analysis, documentation generation, or project indexing.
 */
interface IFileMetadata {
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

/**
 * Represents metadata about a function within a TypeScript file.
 * This interface is useful for documentation generation, CLI analysis, and introspection.
 */
interface IFunctionMetadata {
    /**
     * The name of the function.
     * Example: "handleRequest"
     */
    name: string;
    /**
     * The list of parameters the function accepts.
     * Each parameter includes its name, type, and other metadata.
     */
    parameters: IParameterMetadata[];
    /**
     * The return type of the function.
     * Example: "Promise<void>", "string", "boolean", etc.
     */
    returnType: string;
    /**
     * A short description of what the function does.
     * This is optional but highly recommended for documentation.
     */
    description?: string;
    /**
     * Indicates whether the function is asynchronous (uses `async`).
     * Defaults to `false` if not specified.
     */
    isAsync?: boolean;
    /**
     * Indicates whether the function is exported from the file.
     * Useful for distinguishing public APIs from private/internal helpers.
     */
    isExported?: boolean;
    /**
     * The absolute or relative path to the file where this function is declared.
     * Helps in locating the source file for cross-referencing.
     */
    filePath?: string;
}
/**
 * Represents metadata about a single parameter of a function.
 * Useful for generating function signatures, documentation, or CLI usage info.
 */
interface IParameterMetadata {
    /**
     * The name of the parameter.
     * Example: "userId"
     */
    name: string;
    /**
     * The TypeScript type of the parameter.
     * Example: "string", "number", "User", "Record<string, any>", etc.
     */
    type: string;
    /**
     * Indicates whether the parameter is optional.
     * If true, the parameter may be omitted when calling the function.
     */
    optional?: boolean;
    /**
     * The default value assigned to this parameter, if any.
     * Example: `"guest"`, `0`, `true`, etc.
     */
    defaultValue?: string;
    /**
     * A short description of the parameter's purpose.
     * This is optional but helpful in documentation and tooltips.
     */
    description?: string;
}

/**
 * ForgeScript CLI
 *
 * A command-line interface tool for ForgeScript and BotForge that helps developers
 * quickly set up projects, create scripts, and streamline their workflow.
 *
 * @module forge-cli
 * @version 0.0.1
*/

/**
 * File metadata for: index.ts
 */
declare const FileMetadata_index: IFileMetadata;

export { FileMetadata_index };
