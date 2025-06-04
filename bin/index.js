#!/usr/bin/env node
"use strict";

// src/index.ts
var import_commander = require("commander");

// src/core/classes/CommandRegistry.ts
var CommandRegistry = class {
  /**
   * Creates an instance of the CommandRegistry class.
   * 
   * @param CLI - The root command instance to be registered with the command registry.
   */
  constructor(CLI) {
    /**
     * Stores the mapping of command names to their corresponding `ForgeCommand` instances.
     */
    this.registeredCommands = /* @__PURE__ */ new Map();
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
  Register(commands) {
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
  Unregister(commandName) {
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
  GetCommand(commandName) {
    return this.registeredCommands.get(commandName);
  }
  /**
   * Returns a list of all registered command names.
   *
   * @returns {string[]} An array containing the names of all commands currently registered in the registry.
   */
  ListCommands() {
    return Array.from(this.registeredCommands.keys());
  }
};

// src/commands/index.ts
var Commands = [];

// src/index.ts
var ForgeCLI = new import_commander.Command();
ForgeCLI.name("forge").description("A CLI tool for ForgeScript and BotForge that helps developers quickly set up projects, create scripts, and streamline their workflow.").option("-h, --help", "").option("-v, --version", "").action(async (options) => {
});
var Registry = new CommandRegistry(ForgeCLI);
Registry.Register(Commands);
ForgeCLI.parseAsync(process.argv);
