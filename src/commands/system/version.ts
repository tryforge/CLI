import chalk from 'chalk';
import { Command } from 'commander';
import { ProgressManager } from '../../managers';
import { version as currentVersion, name as packageName } from '../../../package.json';
import type { ICommandMetadata, IFileMetadata } from '../../structure';

/**
 * Prints the current CLI version and checks for updates from the npm registry.
 *
 * This command is useful for ensuring the user is running the latest version
 * of ForgeCLI. It fetches the latest version from npm and compares it to the
 * locally installed version. If a newer version exists, the user is prompted
 * to update the CLI.
 *
 * @async
 * @since 0.0.1
 * @command version
 */
export const Version: Command = new Command('version')
  .description('Returns the current version of the CLI and checks for updates.')
  .aliases(['v', 'ver'])
  .action(async () => {
    console.log(`Current version: ${chalk.cyan(currentVersion)}\n`);

    const spinner = new ProgressManager();
    spinner.Start('Checking for new version...');

    try {
      const response = await fetch(`https://registry.npmjs.org/@tryforge/cli`);
      const data = await response.json();
      const latestVersion = data['dist-tags'].latest;

      spinner.Stop();

      if (latestVersion !== currentVersion) {
        console.log(
          `${chalk.yellow('A new version is available!')} ${chalk.gray(currentVersion)} → ${chalk.green(latestVersion)}`
        );
        console.log(`Run ${chalk.cyan(`npm i -g ${packageName}`)} to update.\n`);
      } else {
        console.log(chalk.green('You are using the latest version.\n'));
      }
    } catch (err) {
      spinner.Stop();
      console.error(`${chalk.red('[ERROR]')} ${(err as Error).message}`);
    }
  });

/**
 * Metadata about the file implementing the version command.
 * Contains ownership, location, and purpose information.
 */
export const FileMetadata_version: IFileMetadata = {
  filename: 'version.ts',
  createdAt: new Date('2025-05-11T15:45:00+02:00'),
  updatedAt: new Date('2025-05-13T18:10:00+02:00'),
  author: 'Sébastien (@striatp)',
  description: 'CLI command that prints the current version and checks for updates from npm.',
  tags: ['CLI', 'Versioning', 'NPM', 'ForgeCLI']
};

/**
 * Metadata describing the version command structure.
 * Useful for API documentation, CLI help menus, and internal usage analytics.
 */
export const CommandMetadata_Version: ICommandMetadata = {
  name: 'version',
  description: 'Returns the current version of the CLI and checks for updates.',
  usage: 'forge version',
  aliases: ['v', 'ver'],
  options: [],
  examples: ['forge version', 'forge v', 'forge ver'],
  filePath: './src/commands/general/version.ts'
};
