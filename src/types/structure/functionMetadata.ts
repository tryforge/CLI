/**
 * Represents metadata about a function within a TypeScript file.
 * This interface is useful for documentation generation, CLI analysis, and introspection.
 */
export interface IFunctionMetadata {
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
export interface IParameterMetadata {
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