import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { Command } from 'commander';

import { RequestEnums, RequestEvents, RequestFunctions, SearchEnum, SearchEvent, SearchFunction } from '../../library';
import type { ICommandMetadata, IEvent, IFileMetadata, IFunction } from '../../types';

/**
 * Represents a valid search type option for BotForge object types.
 */
type SearchType = 'function' | 'event' | 'enum';

/**
 * Valid search type options for BotForge object types.
 * Maps normalized search types to their canonical form.
 */
const ValidSearchTypes: Record<string, SearchType> = {
  'function': 'function',
  'f': 'function',
  'fn': 'function',
  'func': 'function',
  'event': 'event',
  'e': 'event',
  'ev': 'event',
  'evt': 'event',
  'enum': 'enum',
  'en': 'enum',
  'n': 'enum',
  'enm': 'enum'
};

/**
 * Interface for the search command options.
 */
interface SearchOptions {
  extension?: string,
  json?: boolean,
  raw?: boolean,
  fuzzy?: boolean,
  dev?: boolean,
  force?: boolean,
  debug?: boolean
}

/**
 * Interface for the search result object.
 */
type SearchResult = IFunction | IEvent | string[] | null;

/**
 * Validates if the provided type string is a valid BotForge object type.
 */
function IsValidType(type: string): boolean {
  return Object.keys(ValidSearchTypes).includes(type.toLowerCase());
}

/**
 * Normalizes an object name for searching by converting to lowercase and removing any non-alphanumeric or underscore characters.
 */
function NormalizeObjectName(objectName: string): string {
  return objectName.toLowerCase().replace(/[^a-zA-Z0-9_]/g, '');
}

/**
 * Prepares an object name for searching based on its type.
 * Prepends '$' to function names as per BotForge conventions.
 */
function PrepareObjectName(objectName: string, searchType: 'function' | 'event' | 'enum'): string {
  return (searchType === 'function') ? `$${objectName}` : objectName;
}

/**
 * Executes the search for a BotForge object based on type and name.
 * 
 * @param {string} normalizedType - The canonical search type ('function', 'event', or 'enum')
 * @param {string} preparedObjectName - The prepared object name for searching
 * @param {string | undefined} extension - Optional extension name to limit the search scope
 * @returns {Promise<IFunction | IEvent | string[] | null>} - The search result object or null if not found
 */
async function ExecuteSearch(
  normalizedType: SearchType,
  preparedObjectName: string,
  extension?: string,
  dev?: boolean
): Promise<IFunction | IEvent | string[] /* Enum */ | null> {
  switch (normalizedType) {
    case 'function':
      const functions = await RequestFunctions(extension, !!dev);
      return SearchFunction(functions, preparedObjectName, null);
    
    case 'enum':
      const enums = await RequestEnums(extension, !!dev);
      return SearchEnum(enums, preparedObjectName, null);
    
    case 'event':
      const events = await RequestEvents(extension, !!dev);
      return SearchEvent(events, preparedObjectName, null);
  }
}

/**
 * Searches for a specific function, enum, or event in BotForge's documentation.
 *
 * This command allows users to query metadata for ForgeScript or its extensions
 * by specifying the type of object (function, event, enum) and its name or aliases.
 * It supports optional extension targeting to refine the search scope and provides
 * formatted output or raw JSON based on user preference.
 *
 * @command search
 * @alias s, lookup, lu
 * @argument {string} type - The type of BotForge object to search for (function, event, enum)
 * @argument {string} object - The name of the object to search for
 * @option {string} extension - Specify a particular extension to limit the search scope
 * @option {boolean} json - Output the result as raw JSON instead of formatted text
 * @example forge search function sendMessage - Search for the $sendMessage function
 * @example forge search event onReady - Search for the $onReady event
 * @example forge search enum LogLevel --extension forgedb - Search for the LogLevel enum in the forgedb extension
 * @since 0.0.1
 */
export const Search: Command = new Command('search')
  .aliases(['s', 'lookup', 'lu'])
  .description("Search for a specific function, enum or event in BotForge's documentation.")
  .argument('<type>', "The type of object to search for ('function | f', 'event | e' or 'enum | en'. Case insensitive).")
  .argument('<object>', 'The object name to search for (Case insensitive).')
  .option('-e, --extension <extension>', 'Specify an extension to limit the search scope.')
  .option('-r, --raw', 'Output the result as raw JSON instead of formatted text.')
  .option('-d, --dev', 'Perform your research on the development branch.')
  .option('-f, --fuzzy', 'Perform a fuzzy search for partial or approximate matches.') // Soon.
  .option('--debug', 'Show debug information during the search process.') // Soon.
  .option('--fetch', 'Fetch information using HTTP request and forces to cache the results.') // Soon.
  .action(async (type: string, object: string, options: SearchOptions) => {
    const SearchType: string = type.toLowerCase();
    const Spinner: Ora = ora(`Searching for ${SearchType} '${object}'...`).start();

    try {
      // Validate the search type
      if (!IsValidType(SearchType)) {
        Spinner.stop()
        console.log(`${chalk.red('[ERROR]')} Please enter a valid object type: 'function', 'event' or 'enum' (or their shortcuts).`);
        process.exit(1); // Exit as an error.
      }

      // Normalize inputs
      const NormalizedType: SearchType = ValidSearchTypes[SearchType];
      const NormalizedObject: string = NormalizeObjectName(object);
      const PreparedObjectName: string = PrepareObjectName(NormalizedObject, NormalizedType);
      
      Spinner.text = `Retrieving ${NormalizedType} '${object}'${options.extension ? ` from extension '${options.extension}'` : ''}...`;
      
      // Execute the search
      const SearchResult: SearchResult = await ExecuteSearch(NormalizedType, PreparedObjectName, options.extension, options.dev ? true : false);
      
      Spinner.stop();

      // Display results
      if (SearchResult) {
        if (options.raw) {
          console.log(JSON.stringify(SearchResult))
        } else {
          switch (NormalizedType) {
            case 'function':
              console.log(chalk.cyanBright(`[Function] ${SearchResult}`));
              break;

            case 'event':
              console.log(chalk.greenBright(`[Event] ${SearchResult}`));
              break;

            case 'enum':
              console.log(chalk.yellowBright(`[Enum] ${SearchResult}`));
              break;
          }
        }
      } else {
        console.log(`${chalk.red('[ERROR]')} No match found for '${object}' (${NormalizedType}).`);
        console.log(`Try checking the spelling or use 'forge list ${NormalizedType}s' to see all available ${NormalizedType}s.`);
        process.exit(1)
      }
    } catch (err) {
      Spinner.stop();
      console.error(`${chalk.red('[ERROR]')} ${(err as Error).message}`);
      if ((err as Error).stack && process.env.DEBUG) {
        console.error(chalk.gray((err as Error).stack));
      }
      process.exit(1);
    }
  });

/**
 * Metadata about the file implementing the search command.
 */
export const FileMetadata_search: IFileMetadata = {
  filename: 'search.ts',
  createdAt: new Date('2025-05-11T17:00:00+02:00'),
  updatedAt: new Date('2025-05-15T18:28:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'CLI command to search for BotForge objects (functions, enums, events) in documentation.',
  tags: ['CLI', 'Search', 'Documentation', 'BotForge', 'Metadata']
};

/**
 * Metadata describing the search command structure.
 */
export const CommandMetadata_Search: ICommandMetadata = {
  name: 'search',
  aliases: ['s', 'lookup', 'lu'],
  description: "Search for a specific function, enum or event in BotForge's documentation.",
  usage: 'forge search <type> <object> [options]',
  examples: [
    'forge search function sendMessage',
    'forge search f "$sendMessage"',
    'forge search event onReady',
    'forge search enum LogLevel --extension forgedb',
    'forge search function sendMessage --dev'
  ],
  options: [
    {
      flag: '--extension, -e <name>',
      description: 'Specify an extension to limit the search scope.',
      required: false
    },
    {
      flag: '--raw, -r',
      description: 'Output the result as raw JSON instead of formatted text.',
      required: false
    },
    {
      flag: '--dev, -d',
      description: 'Perform your research on the development branch.',
      required: false
    }
  ],
  filePath: './src/commands/search/search.ts'
};