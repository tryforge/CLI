/**
 * Interface representing a function's metadata and configuration
 * 
 * This interface defines the structure for function definitions used throughout
 * the ForgeScript ecosystem. It contains all necessary information about a function,
 * including its name, description, usage examples, and execution details.
 * 
 * @interface IFunction
 * @since 0.0.1
 */
export interface IFunction {
  /**
   * The unique identifier/name of the function
   */
  name: string;

  /**
   * A detailed description of what the function does
   */
  description: string;

  /**
   * Optional usage examples showing how to use the function
   */
  examples?: string[];

  /**
   * Flag indicating if the function is experimental and may change
   * in future releases
   */
  experimental?: boolean;

  /**
   * Information about deprecation status, if applicable
   * May contain a string message or object with deprecation details
   */
  deprecated?: any;

  /**
   * Function used to unwrap or process the function's results
   * Handles the transformation of raw output to the expected return format
   */
  Unwrap: any;

  /**
   * List of arguments the function accepts
   * Can include type definitions, validation rules, or default values
   */
  args?: [...any];

  /**
   * Expected output types or formats that the function can return
   */
  output?: any[];

  /**
   * Version identifier indicating when the function was introduced
   * or last significantly modified
   */
  version?: string;

  /**
   * Alternative names that can be used to reference this function
   */
  aliases?: string[];

  /**
   * Indicates whether the function requires bracket notation
   * when being called
   */
  brackets?: boolean;
}