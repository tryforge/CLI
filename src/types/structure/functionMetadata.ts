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
export interface IParameterMetadata {
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