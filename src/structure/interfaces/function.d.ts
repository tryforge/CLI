/**
 * Interface representing a function's metadata and configuration.
 */
export interface IFunction {
  /**
   * The unique identifier/name of the function.
   */
  name: string;

  /**
   * A detailed description of what the function does.
   */
  description: string;

  /**
   * Optional usage examples showing how to use the function.
   */
  examples?: string[];

  /**
   * Flag indicating if the function is experimental and may change
   * in future releases.
   */
  experimental?: boolean;

  /**
   * Information about deprecation status, if applicable.
   */
  deprecated?: boolean;

  /**
   * Function used to unwrap or process the function's results.
   */
  Unwrap?: boolean;

  /**
   * List of arguments the function accepts.
   */
  args?: string[];

  /**
   * Expected output types or formats that the function can return.
   */
  output?: string[];

  /**
   * Version identifier indicating when the function was introduced
   * or last significantly modified.
   */
  version?: string;

  /**
   * Alternative names that can be used to reference this function.
   */
  aliases?: string[];

  /**
   * Indicates whether the function requires bracket notation
   * when being called.
   */
  brackets?: boolean;
}