#!/usr/bin/env node

/**
 * BotForge CLI
 * 
 * A command-line interface tool for ForgeScript and BotForge that helps developers 
 * quickly set up projects, create scripts, and streamline their workflow.
 * 
 * @module forge
 * @version 0.0.1
*/

// External packages.
import { Command } from 'commander';

// Package.json
import { version } from '../package.json';

// Local modules.
import { CommandRegistry } from './core/classes/CommandRegistry';

/**
 * Importing the commands from the source folder.
*/
import { Commands } from './commands';

/**
 * The main CLI instance for the Forge tool.
 * This object handles command registration and processing of CLI arguments.
 * 
 * @const ForgeCLI
 * @type {Command}
*/
const ForgeCLI: Command = new Command();


/**
 * Configure the CLI with name, description, and version information.
 * These details will appear in help text and version information.
*/
ForgeCLI
  .name('forge')
  .description('A CLI tool for ForgeScript and BotForge that helps developers quickly set up projects, create scripts, and streamline their workflow.')
  .version(version);


/**
 * An instance of the CommandRegistry class, initialized with the ForgeCLI.
 * 
 * @remarks
 * This registry is responsible for managing and registering all available commands
 * within the ForgeCLI application. It acts as the central point for command discovery,
 * execution, and lifecycle management.
 * 
 * @see CommandRegistry
 * @see ForgeCLI
 */
const Registry = new CommandRegistry(ForgeCLI);
Registry.Register(Commands);

/**
 * Parse command line arguments and execute the requested command.
 * Uses async parsing to allow for commands that perform asynchronous operations.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when command execution is complete
*/
ForgeCLI.parseAsync(process.argv);