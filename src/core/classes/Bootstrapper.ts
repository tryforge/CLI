import { Command } from "commander";
import { version as packageVersion } from "../../../package.json";
import { CommandRegistry } from "./CommandRegistry";
import { ForgeCommand } from "./ForgeCommand";

interface IBootstrapOptions {
  name: string;
  description: string;
  version?: string;
  debug?: boolean;
  maxEventListeners?: number;
}

interface BootstrapperScheme {}

export class Bootstrapper implements BootstrapperScheme {
  protected options: IBootstrapOptions;
  protected program: Command;
  protected registry: CommandRegistry;

  constructor(options: IBootstrapOptions) {
    this.options = {
      version: packageVersion,
      debug: false,
      maxEventListeners: 20,
      ...options,
    };

    this.program = new Command();

    this.program
      .name(this.options.name)
      .description(this.options.description)
      .version(this.options.version || packageVersion)
      .option('--debug', 'View the initializing process for debugging purposes.');

    // Initialize the command registry with the root program
    this.registry = new CommandRegistry(this.program);
  }

  /**
   * Register an array of ForgeCommand instances with the CLI.
   */
  registerCommands(commands: ForgeCommand[]): void {
    this.registry.Register(commands);
  }

  /**
   * Parse CLI arguments and set debug mode if needed.
   */
  async run(args?: string[]): Promise<void> {
    await this.program.parseAsync(args || process.argv);
    const opts = this.program.opts();
    if (opts.debug) {
      this.options.debug = true;
      process.env.FORGE_DEBUG = "1";
      console.log('[DEBUG] Debug mode enabled');
    }
  }
}