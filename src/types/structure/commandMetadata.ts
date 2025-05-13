/**
 * Represents metadata for a single CLI command.
 * Useful for documentation, help menus, command registration, and usage analytics.
 */
export interface ICommandMetadata {
  /**
   * The name of the command as used in the CLI.
   * Example: "init", "generate", "build"
   */
  name: string;

  /**
   * A concise description of what the command does.
   * Shown in help menus and documentation.
   */
  description: string;

  /**
   * Usage example or syntax for the command.
   * Example: "forge init [project-name]"
   */
  usage: string;

  /**
   * A list of available options or flags the command accepts.
   * These typically include flags like `--help`, `--force`, etc.
   */
  options?: ICommandOption[];

  /**
   * Example usages of the command.
   * These can be shown in CLI help output or online documentation.
   * Example: ["forge init my-app", "forge build --watch"]
   */
  examples?: string[];

  /**
   * The relative or absolute path to the file where the command is implemented.
   * Useful for tooling and internal debugging.
   */
  filePath: string;
}

/**
 * Represents a single flag or option that can be passed to a CLI command.
 * Commonly used to configure behavior like verbosity, force overwrite, etc.
 */
export interface ICommandOption {
  /**
   * The full flag syntax used in the CLI.
   * Example: "--help", "-f", "--force"
   */
  flag: string;

  /**
   * A description of what the flag does.
   * Shown in help menus and CLI usage guides.
   */
  description: string;

  /**
   * Indicates whether the flag is required for the command to run.
   * Defaults to `false` if omitted.
   */
  required?: boolean;

  /**
   * The default value used if the flag is not explicitly provided.
   * Example: "false", "info", "8080", etc.
   */
  defaultValue?: string;
}