import chalk from 'chalk';
import ora from 'ora';
import { Command } from 'commander';

import { RequestEnums, RequestEvents, RequestFunctions, SearchEnum, SearchEvents, SearchFunction } from '@/library';
import type { ICommandMetadata, IEnum, IEvent, IFileMetadata, IFunction } from '@/types';

/**
 * Helper function to validate the type argument.
 * Ensures that the type provided is a valid BotForge object type.
 * 
 * @param {string} type - The object type to validate ('function', 'event', 'enum').
 * @returns {boolean} - Returns true if the type is valid, false otherwise.
 */
function isValidType(type: string): boolean {
  const validTypes = ['function', 'event', 'enum', 'f', 'e', 'n'];
  return validTypes.includes(type.toLowerCase());
};

/**
 * Searches for a specific function, enum, or event in BotForge's documentation.
 *
 * This command allows users to query metadata for ForgeScript or its extensions
 * by specifying the type of object (function, event, enum) and its name or aliases.
 * It supports optional extension targeting to refine the search.
 *
 * @async
 * @since 0.0.1
 * @command search
 * @example forge search function '$sendMessage'
 */
export const Search: Command = new Command('search')
  .aliases(['s', 'lookup', 'lu'])
  .description("Search for a specific function, enum or event through BotForge's documentation.")
  .argument('<type>', "The type of object to search for ('function | f', 'event | e' or 'enum | en'. Case insensitive).")
  .argument('<object>', 'The object to search for (Case insensitive).')
  .option('-e, --extension <extension>', 'Specify an extension where to search.')
  .option('-j, --json', 'Output raw JSON.')
  .action(async (type: string, object: string, options: { extension?: string, json?: boolean }) => {
    const lowerType = type.toLowerCase();
    const lowerObject = object.toLowerCase();

    const spinner = ora(`Retrieving the ${type}...`).start();

    if (isValidType(lowerType)) {
      let result: IFunction | IEnum | IEvent | string[] | null = null;
      try {
        if (lowerType === 'function' || lowerType === 'f') {
          const datas = await RequestFunctions(options.extension);
          result = await SearchFunction(datas, lowerObject, null);
        } else if (lowerType === 'enum' || lowerType === 'en' || lowerType === 'n') {
          const datas = await RequestEnums(options.extension);
          result = await SearchEnum(datas, lowerObject, null);
        } else if (lowerType === 'event' || lowerType === 'e') {
          const datas = await RequestEvents(options.extension);
          result = await SearchEvents(datas, lowerObject, null);
        }

        spinner.stop();

        if (result) {
          if (options.json) {
            console.log(JSON.stringify(result, null, 2));
          } else {
            console.log(result);
          }
        } else {
          console.log(`${chalk.red('[ERROR]')} No exact match found for '${object}'.`);
        }
      } catch (err) {
        spinner.stop();
        console.error(`${chalk.red('[ERROR]')} ${(err as Error).message}`);
      }
    } else {
      spinner.stop();
      console.log(`${chalk.red('[ERROR]')} Unknown object type: '${type}'. Please enter a valid object type ('function', 'event' or 'enum').`);
    }
  });


/**
 * Metadata about the file implementing the search command.
 * Contains authorship, path, and purpose information.
 */
export const FileMetadata_search: IFileMetadata = {
  filename: 'search.ts',
  path: './src/commands/search/search.ts',
  createdAt: new Date('2025-05-11T17:00:00+02:00'),
  updatedAt: new Date('2025-05-13T20:02:00+02:00'),
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
    'forge search function "sendMessage"',
    'forge search event "onReady"',
    'forge search enum "LogLevel" --extension forgedb'
  ],
  options: [
    {
      flag: '--extension, -e',
      description: 'Specify an extension where to search.',
      required: false
    }
  ],
  filePath: './src/commands/search/search.ts'
};