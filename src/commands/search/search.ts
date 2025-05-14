import chalk from 'chalk';
import ora from 'ora';
import { Command } from 'commander';

import { RequestFunctions, SearchFunction } from '@/library';
import type { ICommandMetadata } from '@/types';

/**
 * Searches for a specific function, enum, or event in BotForge's documentation.
 *
 * This command allows users to query metadata for ForgeScript or its extensions
 * by specifying the type of object (function, event, enum) and its name.
 * It supports optional extension targeting to refine the search.
 *
 * @async
 * @since 0.0.1
 * @command search
 * @example forge search function sendMessage
 */
export const Search: Command = new Command('search')
  .description("Search for a specific function, enum or event through BotForge's documentation.")
  .argument('<type>', "The type of object to search for ('function', 'event' or 'enum'. Case insensitive).")
  .argument('<object>', 'The object to search for (Case insensitive).')
  .option('-e, --extension <extension>', 'Specify an extension where to search.')
  .action(async (type: string, object: string, options: { extension?: string }) => {
    const Type = type.toLowerCase();
    const Object = object.toLowerCase();

    const spinner = ora(`Retrieving the ${type}...`).start();

    const ValidTypes = ['function', 'event', 'enum'];
    if (ValidTypes.includes(Type)) {
      const functions = await RequestFunctions(options.extension);
      const result = await SearchFunction(functions, Object, null);

      spinner.stop()

      if (result) {
        console.log(result);
      } else {
        console.log(`${chalk.bgRed('[ERROR]')} ${chalk.gray('-')} ${chalk.red(`No exact match found for '${object}'.`)}`);
      }
    } else {
      console.log(`${chalk.bgRed('[ERROR]')} ${chalk.gray('-')} ${chalk.red(`Unknown object type: '${type}'. Please enter a valid object type ('function', 'event' or 'enum').`)}`);
    }
  });

/**
 * Metadata about the file implementing the search command.
 * Contains authorship, path, and purpose information.
 */
export const FileMetadata_searchCommand = {
  filename: 'search.ts',
  path: './src/commands/general/search.ts',
  createdAt: new Date('2025-05-11T17:00:00+02:00'),
  updatedAt: new Date('2025-05-13T18:35:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'CLI command to search for BotForge functions, enums, or events in documentation.',
  tags: ['CLI', 'Search', 'Documentation', 'BotForge', 'Metadata']
};

/**
 * Metadata describing the search command structure.
 * Useful for documentation, CLI auto-generation, and internal tools.
 */
export const CommandMetadata_Search: ICommandMetadata = {
  name: 'search',
  description: "Search for a specific function, enum or event through BotForge's documentation.",
  usage: 'forge search <type> <object> [--extension <name>]',
  examples: [
    'forge search function sendMessage',
    'forge search event onReady',
    'forge search enum LogLevel --extension forgedb'
  ],
  options: [
    {
      flag: '--extension, -e',
      description: 'Specify an extension where to search.',
      required: false
    }
  ],
  filePath: './src/commands/general/search.ts'
};