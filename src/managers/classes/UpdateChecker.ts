// Node.js built-ins
import path from 'path';

// Local modules
import { FileSystem } from './FileSystem';
import { NetworkManager } from './NetworkManager';

/**
 * This interface represents the comparaison object after fetching the local and latest version.
 */
interface CheckedVersion {
  currentVersion: string;
  latestVersion: string | null | unknown;
  updateAvailable: boolean;
}

/**
 * An interface representing how the UpdateChecker class is structured.
 */
interface UpdateScheme {
  /**
   * A static instance of {@link NetworkManager} configured to interact with the NPM registry
   * for the `@tryforge/forgescript` package.
   */
  Network?: NetworkManager;

  /**
   * Retrieves the local version of the application by reading the `version` field
   * from the nearest `package.json` file relative to the current directory.
   *
   * @returns A promise that resolves to the version string from `package.json`.
   */
  LocalVersion?(): string;

  /**
   * Retrieves the latest version string from the network.
   *
   * @returns A promise that resolves to the latest version as a string if available, or `null` if not found.
   * @throws May throw if the network request fails.
   */
  LatestVersion?(): Promise<boolean | null>;
  
  /**
   * Fetches and compares the local and latest available versions.
   *
   * @returns {Promise<CheckedVersion>} An object containing the current version, the latest version, and a boolean indicating if an update is available.
   */
  FetchVersion?(): Promise<CheckedVersion>;

  /**
   * Checks if an update is available for the application.
   *
   * @returns A promise that resolves to `true` if an update is available, otherwise `false`.
   */
  UpdateAvailable?(): Promise<boolean>;
}

/**
 * A class to handle versioning for the CLI.
 */
export class UpdateChecker implements UpdateScheme {
  /**
   * A static instance of {@link NetworkManager} configured to interact with the NPM registry
   * for the `@tryforge/forgescript` package.
   */
  public static Network = new NetworkManager('https://registry.npmjs.org/@tryforge/forgescript')
  
  /**
   * Retrieves the local version of the application by reading the `version` field
   * from the nearest `package.json` file relative to the current directory.
   *
   * @returns A promise that resolves to the version string from `package.json`.
   */
  public static async LocalVersion(): Promise<string> {
    return (await FileSystem.ReadJSON(path.resolve(__dirname, '../../../package.json'))).version;
  };

  /**
   * Retrieves the latest version string from the network.
   *
   * @returns A promise that resolves to the latest version as a string if available, or `null` if not found.
   * @throws May throw if the network request fails.
   */
  public static async LatestVersion(): Promise<string | null> {
    const response = await this.Network.Get('/latest');
    if (typeof response === 'object' && response !== null && 'version' in response) {
      return (response as { version: string }).version;
    }
    return null
  }

  /**
   * Fetches and compares the local and latest available versions.
   *
   * @returns {Promise<CheckedVersion>} An object containing the current version, the latest version, and a boolean indicating if an update is available.
   */
  public static async FetchVersion(): Promise<CheckedVersion> {
    const currentVersion = await this.LocalVersion();
    const latestVersion = await this.LatestVersion();
    return {
      currentVersion,
      latestVersion,
      updateAvailable: currentVersion !== latestVersion
    }
  }

  /**
   * Checks if an update is available for the application.
   *
   * @returns A promise that resolves to `true` if an update is available, otherwise `false`.
   */
  public static async UpdateAvailable(): Promise<boolean> {
    return (await this.FetchVersion()).updateAvailable
  }
}