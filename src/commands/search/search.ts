import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { Command } from 'commander';

import { Logger } from '../../managers/classes/Logger';

import { SearchMetadata, requestMetadata } from '../../library';
import type { ICommandMetadata, IFileMetadata, TSearchResult, TSearchType } from '../../structure';

/**
 * Valid search type options for BotForge object types.
 */
const ValidSearchTypes: Record<string, TSearchType> = {
  'function': 'function', 'f': 'function', 'fn': 'function', 'func': 'function',
  'event': 'event', 'e': 'event', 'ev': 'event', 'evt': 'event',
  'enum': 'enum', 'en': 'enum', 'n': 'enum', 'enm': 'enum'
};

/**
 * Interface for the search command options.
 */
interface SearchOptions {
  extension?: string, /* -e */
  raw?: boolean, /* -r */
  dev?: boolean, /* -d */
  fetch?: boolean,
  debug?: boolean
};

/**
 * Validates if the provided type string is a valid BotForge object type.
 */
function IsValidType(type: string): boolean {
  return Object.keys(ValidSearchTypes).includes(type.toLowerCase());
};

/**
 * Normalizes an object name for searching by converting to lowercase and removing any non-alphanumeric or underscore characters.
 */
function NormalizeObjectName(objectName: string): string {
  return objectName.toLowerCase().replace(/[^a-zA-Z0-9_]/g, '');
};

/**
 * Prepares an object name for searching based on its type.
 */
function PrepareObjectName(
  objectName: string,
  searchType: TSearchType
): string {
  return (searchType === 'function') ? `$${objectName}` : objectName;
};

/**
 * Executes the search for a BotForge object based on type and name.
 */
async function ExecuteSearch(
  normalizedType: TSearchType,
  preparedObjectName: string,
  extension?: string,
  dev?: boolean,
  debug?: boolean,
  forceFetch?: boolean
): Promise<TSearchResult> {
  if (debug) {
    console.log(`${chalk.yellow('[DEBUG]')} Starting the search.`)
  };
  const Functions = await requestMetadata(normalizedType, extension, !!dev, !!debug, !!forceFetch);
  
  return SearchMetadata(normalizedType, Functions, preparedObjectName, null);
};

/**
 * Searches for a specific function, enum, or event in BotForge's documentation.
 *
 * This command allows users to query metadata for ForgeScript or its extensions
 * by specifying the type of object (function, event, enum) and its name or aliases.
 * It supports optional extension targeting to refine the search scope and provides
 * formatted output or raw JSON based on user preference.
 *
 * @command search
 * @alias s, lookup
 * @argument {string} type - The type of object to search for (or their shortcuts).
 * @argument {string} object - The object name to search for (case insensitive).
 * @option {string} extension - Specify an extension to limit the search scope.
 * @option {boolean} raw - Output the result as raw JSON instead of formatted text.
 * @option {boolean} dev - Perform your research on the development branch.
 * @option {boolean} debug - Show debug information during the search process.
 * @option {boolean} fetch - Fetch information using HTTP request and forces to cache the results.
 * @since 0.0.1
 */
export const Search: Command = new Command('search')
  .aliases(['s', 'lookup'])
  .description('Search for a specific function, enum or event in BotForge\'s documentation.')
  .argument('<type>', 'The type of object to search for (or their shortcuts).')
  .argument('<object>', 'The object name to search for (case insensitive).')
  .option('-e, --extension <extension>', 'Specify an extension to limit the search scope.')
  .option('-r, --raw', 'Output the result as raw JSON instead of formatted text.')
  .option('-d, --dev', 'Perform your research on the development branch.')
  .option('--debug', 'Show debug information during the search process.')
  .option('--fetch', 'Fetch information using HTTP request and forces to cache the results.')
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
      const NormalizedType: TSearchType = ValidSearchTypes[SearchType];
      const NormalizedObject: string = NormalizeObjectName(object);
      const PreparedObjectName: string = PrepareObjectName(NormalizedObject, NormalizedType);

      if (options.debug) {
        console.log(`\n${chalk.yellow('[DEBUG]')} Requesting (GET) 'https://github.com/tryforge/ForgeScript/blob/dev/metadata/${NormalizedType}s.json' and potentially storing them inside cache (if caching cooldown is over).`);
      };

      Spinner.text = `Retrieving ${NormalizedType} '${object}'${options.extension ? ` from extension '${options.extension}'` : ''}...`;

      // Execute the search
      const SearchResult: TSearchResult = await ExecuteSearch(NormalizedType, PreparedObjectName, options.extension, !!options.dev, !!options.debug);

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
          };
        }
      } else {
        console.log(`${chalk.red('[ERROR]')} No match found for '${object}' (${NormalizedType}).`);
        console.log(`Try checking the spelling or use 'forge list ${NormalizedType}s' to see all available ${NormalizedType}s.`);
      };
    } catch (error) {
      Spinner.stop();
      console.error(`${chalk.red('[ERROR]')} ${(error as Error).message}`);
      if ((error as Error).stack && process.env.DEBUG) {
        console.error(chalk.gray((error as Error).stack));
      }
      process.exit(1);
    };
  });

/**
 * Metadata about the file implementing the search command.
 */
export const FileMetadata_search: IFileMetadata = {
  filename: 'search.ts',
  createdAt: new Date('2025-05-11T17:00:00+02:00'),
  updatedAt: new Date('2025-05-15T18:16:00+02:00'),
  author: 'striatp',
  description: 'CLI command to search for BotForge objects (functions, enums, events) in documentation.',
  tags: ['CLI', 'Search', 'Documentation', 'BotForge', 'Metadata']
};

/**
 * Metadata describing the search command structure.
 */
export const CommandMetadata_Search: ICommandMetadata = {
  name: 'search',
  aliases: ['s', 'lookup'],
  description: 'Search for a specific function, enum or event in BotForge\'s documentation.',
  usage: 'forge search <type> <object> [options]',
  examples: [
    'forge search function sendMessage',
    'forge search f "$sendMessage"',
    'forge search event onReady',
    'forge search enum LogLevel --extension forgedb',
    'forge search function sendMessage --dev'
  ],
  arguments: [
    {
      flag: 'type, <type>',
      description: 'The type of object to search for (or their shortcuts).',
      required: true
    },
    {
      flag: 'object, <object>',
      description: 'The object name to search for (case insensitive).',
      required: true
    },
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
    },
    {
      flag: '--debug',
      description: 'Show debug information during the search process.',
      required: false
    },
    {
      flag: '--fetch',
      description: 'Fetch information using HTTP request and forces to cache the results.',
      required: false
    }
  ],
  filePath: './src/commands/search/search.ts'
};