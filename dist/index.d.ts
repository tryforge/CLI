#!/usr/bin/env tsx
/**
 * Represents metadata associated with a specific file in the project.
 * Useful for tooling, code analysis, documentation generation, or project indexing.
 */
interface IFileMetadata {
    /**
     * The name of the file, including its extension.
     */
    filename: string;
    /**
     * The full relative or absolute path to the file.
     */
    path: string;
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
     */
    parameters: IParameterMetadata[];
    /**
     * The return type of the function.
     */
    returnType: string;
    /**
     * A short description of what the function does.
     */
    description?: string;
    /**
     * Indicates whether the function is asynchronous (uses `async`).
     */
    isAsync?: boolean;
    /**
     * Indicates whether the function is exported from the file.
     */
    isExported?: boolean;
    /**
     * The absolute or relative path to the file where this function is declared.
     */
    filePath?: string;
}
/**
 * Represents metadata about a single parameter of a function.
 */
interface IParameterMetadata {
    /**
     * The name of the parameter.
     * Example: "userId"
     */
    name: string;
    /**
     * The TypeScript type of the parameter.
     */
    type: string;
    /**
     * Indicates whether the parameter is optional.
     */
    optional?: boolean;
    /**
     * The default value assigned to this parameter, if any.
     */
    defaultValue?: string;
    /**
     * A short description of the parameter's purpose.
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
