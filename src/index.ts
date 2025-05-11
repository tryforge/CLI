#!/usr/bin/env tsx

/**
 * ForgeScript CLI
 * 
 * A command-line interface tool for ForgeScript and BotForge that helps developers 
 * quickly set up projects, create scripts, and streamline their workflow.
 * 
 * @module forge-cli
 * @version 0.0.1
*/

import { Command } from 'commander';

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
  .version('0.0.1');

/**
 * Parse command line arguments and execute the requested command.
 * Uses async parsing to allow for commands that perform asynchronous operations.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when command execution is complete
*/
ForgeCLI.parseAsync(process.argv);