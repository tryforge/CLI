// Node.js built-ins
import path from "path";

// Local modules
import { FileSystem } from "./FileSystem";

/**
 * An interface representing how the ConfiguratioManager class is structured.
 */
interface ConfigurationScheme {
  /**
   * The absolute path to the Forge CLI configuration file.
   */
  ConfigurationPath?: string;

  /**
   * Retrieves the configuration object from the configuration file.
   *
   * This static method reads the configuration file from the path specified by `ConfigurationPath`.
   * If the file exists, it parses and returns the configuration object of type `T`. If the file does not exist, it returns `null`.
   * The method is generic, allowing you to specify the expected type of the configuration object.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const config = await ConfigurationManager.GetConfiguration<{ theme: string }>();
   * if (config) {
   *   console.log(config.theme);
   * }
   * ```
   *
   * @template T - The expected type of the configuration object.
   * @returns A promise that resolves to the configuration object of type `T` if the file exists, or `null` otherwise.
   */
  GetConfiguration?<T = any>(): Promise<T | null>;

  /**
   * Writes the provided configuration object to the configuration file at the specified path.
   *
   * This static method saves the given key-value pairs as a JSON object to the configuration file.
   * If the operation is successful, it returns `true`; otherwise, it returns `false`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.SetConfiguration({ theme: 'dark', language: 'en' });
   * ```
   *
   * @param config - An object containing configuration key-value pairs to be saved.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  SetConfiguration?(
    config: Record<string, string>
  ): Promise<boolean>;

  /**
   * Sets a specific configuration key to the provided value and persists the updated configuration to disk.
   *
   * This static method updates or adds a key-value pair in the configuration object and writes the updated configuration back to the configuration file.
   * If the operation is successful, it returns `true`; otherwise, it returns `false`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.SetConfigurationKey('theme', 'light');
   * ```
   *
   * @template T - The type of the value to set for the configuration key.
   * @param key - The configuration key to set or update.
   * @param value - The value to assign to the configuration key.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  SetConfigurationKey?<T = any>(
    key: string,
    value: T
  ): Promise<boolean>;

  /**
   * Deletes the configuration file if it exists at the specified path.
   *
   * This static method checks for the existence of the configuration file and deletes it if found.
   * Returns `true` if the file was successfully deleted, or `false` if the file does not exist or deletion failed.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.DeleteConfiguration();
   * ```
   *
   * @returns A promise that resolves to `true` if the configuration file was deleted, or `false` otherwise.
   */
  DeleteConfiguration?(): Promise<boolean>;

  /**
   * Checks whether the configuration file exists at the specified configuration path.
   *
   * This static method verifies the existence of the configuration file.
   * Returns `true` if the file exists, or `false` otherwise.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const exists = await ConfigurationManager.ConfigurationExists();
   * ```
   *
   * @returns A promise that resolves to `true` if the configuration file exists, or `false` otherwise.
   */
  ConfigurationExists?(): Promise<boolean>;

  /**
   * Retrieves the value associated with a specific configuration key from the configuration file.
   *
   * This static method reads the configuration object and returns the value for the specified key.
   * If the key does not exist or the configuration file is missing, it returns `undefined`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const theme = await ConfigurationManager.GetConfigurationKey<string>('theme');
   * ```
   *
   * @template T - The expected type of the configuration value.
   * @param key - The key of the configuration value to retrieve.
   * @returns A promise that resolves to the value for the given key, or `undefined` if not found.
   */
  GetConfigurationKey?<T = any>(
    key: string
  ): Promise<T>;

  /**
   * Returns a list of all configuration field names (keys) present in the configuration file.
   *
   * This static method fetches the current configuration object and returns an array of its keys.
   * If no configuration is found, it returns an empty array.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const fields = await ConfigurationManager.ListConfigurationFields();
   * console.log(fields); // ['theme', 'language']
   * ```
   *
   * @returns A promise that resolves to an array of configuration field names.
   */
  ListConfigurationFields?(): Promise<string[]>;
}

/**
 * Manages reading, writing, updating, and deleting the Forge CLI configuration file.
 *
 * The `ConfigurationManager` class provides static methods to interact with the Forge CLI configuration,
 * which is stored as a JSON file in the user's home directory. It supports retrieving the entire configuration,
 * setting or updating configuration values, deleting the configuration file, checking for its existence,
 * retrieving individual configuration keys, and listing all configuration fields.
 *
 * All methods rely on the `FileSystem` class for file operations.
 *
 * @since 0.0.1
 * @see FileSystem
 * @see https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts
 *
 * @example
 * ```typescript
 * // Retrieve the entire configuration
 * const config = await ConfigurationManager.GetConfiguration<{ theme: string }>();
 *
 * // Set a configuration value
 * await ConfigurationManager.SetConfigurationKey('theme', 'dark');
 *
 * // Get a specific configuration value
 * const theme = await ConfigurationManager.GetConfigurationKey<string>('theme');
 *
 * // List all configuration fields
 * const fields = await ConfigurationManager.ListConfigurationFields();
 * ```
 */
export class ConfigurationManager implements ConfigurationScheme {
  /**
   * The absolute path to the Forge CLI configuration file.
   */
  public static ConfigurationPath: string = path.join(FileSystem.GetHomePath(), '.forge', 'config.json');

  /**
   * Retrieves the configuration object from the configuration file.
   *
   * This static method reads the configuration file from the path specified by `ConfigurationPath`.
   * If the file exists, it parses and returns the configuration object of type `T`. If the file does not exist, it returns `null`.
   * The method is generic, allowing you to specify the expected type of the configuration object.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const config = await ConfigurationManager.GetConfiguration<{ theme: string }>();
   * if (config) {
   *   console.log(config.theme);
   * }
   * ```
   *
   * @template T - The expected type of the configuration object.
   * @returns A promise that resolves to the configuration object of type `T` if the file exists, or `null` otherwise.
   */
  public static async GetConfiguration<T = any>(): Promise<T | null> {
    if (!(await FileSystem.FileExists(this.ConfigurationPath))) return null;
    return await FileSystem.ReadJSON(this.ConfigurationPath);
  }

  /**
   * Writes the provided configuration object to the configuration file at the specified path.
   *
   * This static method saves the given key-value pairs as a JSON object to the configuration file.
   * If the operation is successful, it returns `true`; otherwise, it returns `false`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.SetConfiguration({ theme: 'dark', language: 'en' });
   * ```
   *
   * @param config - An object containing configuration key-value pairs to be saved.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  public static async SetConfiguration(
    config: Record<string, string>
  ): Promise<boolean> {
    return await FileSystem.WriteJSON(this.ConfigurationPath, config);
  }

  /**
   * Sets a specific configuration key to the provided value and persists the updated configuration to disk.
   *
   * This static method updates or adds a key-value pair in the configuration object and writes the updated configuration back to the configuration file.
   * If the operation is successful, it returns `true`; otherwise, it returns `false`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.SetConfigurationKey('theme', 'light');
   * ```
   *
   * @template T - The type of the value to set for the configuration key.
   * @param key - The configuration key to set or update.
   * @param value - The value to assign to the configuration key.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  public static async SetConfigurationKey<T = any>(key: string, value: T): Promise<boolean> {
    let configuration: Record<string, any> = (await this.GetConfiguration()) || {};
    configuration[key] = value;
    return await FileSystem.WriteJSON(this.ConfigurationPath, configuration);
  }

  /**
   * Deletes the configuration file if it exists at the specified path.
   *
   * This static method checks for the existence of the configuration file and deletes it if found.
   * Returns `true` if the file was successfully deleted, or `false` if the file does not exist or deletion failed.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * await ConfigurationManager.DeleteConfiguration();
   * ```
   *
   * @returns A promise that resolves to `true` if the configuration file was deleted, or `false` otherwise.
   */
  public static async DeleteConfiguration(): Promise<boolean> {
    if (!(await FileSystem.FileExists(this.ConfigurationPath))) return false;
    return await FileSystem.DeleteFile(this.ConfigurationPath);
  }

  /**
   * Checks whether the configuration file exists at the specified configuration path.
   *
   * This static method verifies the existence of the configuration file.
   * Returns `true` if the file exists, or `false` otherwise.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const exists = await ConfigurationManager.ConfigurationExists();
   * ```
   *
   * @returns A promise that resolves to `true` if the configuration file exists, or `false` otherwise.
   */
  public static async ConfigurationExists(): Promise<boolean> {
    return await FileSystem.FileExists(this.ConfigurationPath);
  }

  /**
   * Retrieves the value associated with a specific configuration key from the configuration file.
   *
   * This static method reads the configuration object and returns the value for the specified key.
   * If the key does not exist or the configuration file is missing, it returns `undefined`.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const theme = await ConfigurationManager.GetConfigurationKey<string>('theme');
   * ```
   *
   * @template T - The expected type of the configuration value.
   * @param key - The key of the configuration value to retrieve.
   * @returns A promise that resolves to the value for the given key, or `undefined` if not found.
   */
  public static async GetConfigurationKey<T = any>(key: string): Promise<T | undefined> {
    const configuration = await this.GetConfiguration() as Record<string, any> | null;
    return configuration ? (configuration[key] as T) : undefined;
  }

  /**
   * Returns a list of all configuration field names (keys) present in the configuration file.
   *
   * This static method fetches the current configuration object and returns an array of its keys.
   * If no configuration is found, it returns an empty array.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ConfigurationManager.ts)
   *
   * Example usage:
   * ```typescript
   * const fields = await ConfigurationManager.ListConfigurationFields();
   * console.log(fields); // ['theme', 'language']
   * ```
   *
   * @returns A promise that resolves to an array of configuration field names.
   */
  public static async ListConfigurationFields(): Promise<string[]> {
    const config = await this.GetConfiguration();
    return config ? Object.keys(config) : [];
  }
}
