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


import { Command } from 'commander';
import { IFileMetadata } from './structure';
import { version } from '../package.json';

/**
 * Importing the commands from the source folder.
*/
import { Search, Version } from './commands';

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
 * Adding the commands to the BotForge command line interface.
*/
ForgeCLI.addCommand(Search);
ForgeCLI.addCommand(Version)

/**
 * Parse command line arguments and execute the requested command.
 * Uses async parsing to allow for commands that perform asynchronous operations.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when command execution is complete
*/
ForgeCLI.parseAsync(process.argv);

/**
 * File metadata for: index.ts
 */
export const FileMetadata_index: IFileMetadata = {
  filename: 'index.ts',
  createdAt: new Date('2025-05-11T18:58:00+02:00'),
  updatedAt: new Date('2025-05-13T16:38:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'This is the main file that defines the CLI structure and architecture.',
  tags: ['CLI', 'Index', 'Structure']
};