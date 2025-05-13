/**
 * Represents metadata for a single CLI command.
 * Useful for documentation, help menus, command registration, and usage analytics.
 */
export interface ICommandMetadata {
  /**
   * The name of the command as used in the CLI.
   */
  name: string;

  /**
   * A concise description of what the command does.
   */
  description: string;

  /**
   * Usage example or syntax for the command.
   */
  usage: string;

  /**
   * A list of available options or flags the command accepts.
   */
  options?: ICommandOption[];

  /**
   * A list of aliases for the command.
   */
  aliases?: string[]

  /**
   * Example usages of the command.
   */
  examples?: string[];

  /**
   * The relative or absolute path to the file where the command is implemented.
   */
  filePath: string;
}

/**
 * Represents a single flag or option that can be passed to a CLI command.
 */
export interface ICommandOption {
  /**
   * The full flag syntax used in the CLI.
   */
  flag: string;

  /**
   * A description of what the flag does.
   */
  description: string;

  /**
   * Indicates whether the flag is required for the command to run.
   */
  required?: boolean;

  /**
   * The default value used if the flag is not explicitly provided.
   */
  defaultValue?: string;
}