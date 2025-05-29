import { Command } from "commander";
import { ForgeCommand } from "./ForgeCommand";

interface RegistryScheme {
  /**
   * Registers an array of `ForgeCommand` instances with the CLI.
   * 
   * For each command in the provided array, this method checks if the command
   * has already been registered (by its name). If not, it adds the command to
   * the CLI and marks it as registered.
   *
   * @param commands - An array of `ForgeCommand` objects to register.
   */
  Register?(
    commands: Array<ForgeCommand>
  ): void;

  /**
   * Unregisters a command from the registry by its name.
   *
   * @param commandName - The name of the command to unregister.
   * @remarks
   * If the command with the specified name exists in the registry, it will be removed.
   * If the command does not exist, this method does nothing.
   */
  Unregister?(
    commandName: string
  ): void;

  /**
   * Retrieves a registered command by its name.
   *
   * @param commandName - The name of the command to retrieve.
   * @returns The {@link ForgeCommand} instance if found; otherwise, `undefined`.
   */
  GetCommand?(
    commandName: string
  ): ForgeCommand | undefined;

  /**
   * Returns a list of all registered command names.
   *
   * @returns {string[]} An array containing the names of all commands currently registered in the registry.
   */
  ListCommands?(): Array<string>;
}

/**
 * Manages the registration and retrieval of CLI commands.
 *
 * The `CommandRegistry` class provides methods to register, unregister, and retrieve
 * command instances for a CLI application. It maintains a mapping between command names
 * and their corresponding `ForgeCommand` instances, ensuring that commands are uniquely
 * registered and easily accessible.
 *
 * @remarks
 * - Commands are registered with a root `Command` instance, which acts as the entry point
 *   for the CLI application.
 * - Duplicate command names are not allowed; attempting to register a command with an
 *   existing name will have no effect.
 * - Unregistering a command removes it from the registry, but does not remove it from the CLI.
 */
export class CommandRegistry implements RegistryScheme {
  /**
   * Reference to the root command of the CLI application.
   */
  private CLI: Command;
  /**
   * Stores the mapping of command names to their corresponding `ForgeCommand` instances.
   */
  private registeredCommands: Map<string, ForgeCommand> = new Map();

  /**
   * Creates an instance of the CommandRegistry class.
   * 
   * @param CLI - The root command instance to be registered with the command registry.
   */
  constructor(CLI: Command) {
    this.CLI = CLI;
  }

  /**
   * Registers an array of `ForgeCommand` instances with the CLI.
   * 
   * For each command in the provided array, this method checks if the command
   * has already been registered (by its name). If not, it adds the command to
   * the CLI and marks it as registered.
   *
   * @param commands - An array of `ForgeCommand` objects to register.
   */
  public Register(commands: Array<ForgeCommand>): void {
    commands.forEach((command) => {
      if (!this.registeredCommands.has(command.name())) {
        this.CLI.addCommand(command);
        this.registeredCommands.set(command.name(), command);
      }
    });
  }

  /**
   * Unregisters a command from the registry by its name.
   *
   * @param commandName - The name of the command to unregister.
   * @remarks
   * If the command with the specified name exists in the registry, it will be removed.
   * If the command does not exist, this method does nothing.
   */
  public Unregister(commandName: string) {
    const command = this.registeredCommands.get(commandName);
    if (command) {
      this.registeredCommands.delete(commandName);
    }
  }

  /**
   * Retrieves a registered command by its name.
   *
   * @param commandName - The name of the command to retrieve.
   * @returns The {@link ForgeCommand} instance if found; otherwise, `undefined`.
   */
  public GetCommand(commandName: string): ForgeCommand | undefined {
    return this.registeredCommands.get(commandName);
  }

  /**
   * Returns a list of all registered command names.
   *
   * @returns {string[]} An array containing the names of all commands currently registered in the registry.
   */
  public ListCommands(): string[] {
    return Array.from(this.registeredCommands.keys());
  }
}