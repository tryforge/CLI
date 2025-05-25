// Node.js built-ins
import path from "path";

// Local modules
import { FileSystem } from "./FileSystem";

/**
 * An interface representing how the ConfiguratioManager class is structured.
 */
interface ConfigurationScheme {
  ConfigurationPath?: string;

  /**
   * Retrieves the configuration object from the configuration file.
   *
   * @template T - The expected type of the configuration object.
   * @returns A promise that resolves to the configuration object of type `T` if the configuration file exists,
   *          or `null` if the file does not exist.
   */
  GetConfiguration?(): Promise<Record<string, string> | null>;

  /**
   * Asynchronously sets the configuration by writing the provided key-value pairs to a JSON file
   * at the specified configuration path.
   *
   * @param config - An object containing configuration key-value pairs to be saved.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  SetConfiguration?(
    config: Record<string, string>
  ): Promise<boolean>;

  /**
   * Sets a configuration key to the specified value and persists the updated configuration to disk.
   *
   * @template T - The type of the value to set for the configuration key.
   * @param {string} key - The configuration key to set.
   * @param {T} value - The value to assign to the configuration key.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  SetConfigurationKey?<T>(
    key: string,
    value: T
  ): Promise<boolean>;

  /**
   * Deletes the configuration file if it exists.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the configuration file was successfully deleted,
   * or `false` if the file does not exist or deletion failed.
   */
  DeleteConfiguration?(): Promise<boolean>;

  /**
   * Checks whether the configuration file exists at the specified configuration path.
   *
   * @returns A promise that resolves to `true` if the configuration file exists, or `false` otherwise.
   */
  ConfigurationExists?(): Promise<boolean>;

  /**
   * Retrieves a specific configuration value by its key from the configuration store.
   *
   * @template T - The expected type of the configuration value.
   * @param {string} key - The key of the configuration value to retrieve.
   * @returns {Promise<T | undefined>} A promise that resolves to the value associated with the given key,
   * or `undefined` if the key does not exist or the configuration is not available.
   */
  GetConfigurationKey?<T>(
    key: string
  ): Promise<T>;

  /**
   * Retrieves a list of configuration field names.
   *
   * This static asynchronous method fetches the current configuration object
   * and returns an array containing the names of its fields (keys).
   * If no configuration is found, it returns an empty array.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of configuration field names.
   */
  ListConfigurationFields?(): Promise<string[]>;
}


/**
 * Manages the application's configuration stored in a JSON file.
 */
export class ConfigurationManager implements ConfigurationScheme {
  public static ConfigurationPath: string = path.join(FileSystem.GetHomePath(), '.forge', 'config.json');

  /**
   * Retrieves the configuration object from the configuration file.
   *
   * @template T - The expected type of the configuration object.
   * @returns A promise that resolves to the configuration object of type `T` if the configuration file exists,
   *          or `null` if the file does not exist.
   */
  public static async GetConfiguration<T>(): Promise<T | null> {
    if (!(await FileSystem.FileExists(this.ConfigurationPath))) return null;
    return await FileSystem.ReadJSON(this.ConfigurationPath);
  };

  /**
   * Asynchronously sets the configuration by writing the provided key-value pairs to a JSON file
   * at the specified configuration path.
   *
   * @param config - An object containing configuration key-value pairs to be saved.
   * @returns A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  public static async SetConfiguration(
    config: Record<string, string>
  ): Promise<boolean> {
    return await FileSystem.WriteJSON(this.ConfigurationPath, config);
  };

  /**
   * Sets a configuration key to the specified value and persists the updated configuration to disk.
   *
   * @template T - The type of the value to set for the configuration key.
   * @param {string} key - The configuration key to set.
   * @param {T} value - The value to assign to the configuration key.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the configuration was successfully written, or `false` otherwise.
   */
  public static async SetConfigurationKey<T>(key: string, value: T): Promise<boolean> {
    let configuration: Record<string, any> = (await this.GetConfiguration()) || {};
    configuration[key] = value;
    return await FileSystem.WriteJSON(this.ConfigurationPath, configuration);
  };

  /**
   * Deletes the configuration file if it exists.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the configuration file was successfully deleted,
   * or `false` if the file does not exist or deletion failed.
   */
  public static async DeleteConfiguration(): Promise<boolean> {
    if (!(await FileSystem.FileExists(this.ConfigurationPath))) return false;
    return await FileSystem.DeleteFile(this.ConfigurationPath);
  };

  /**
   * Checks whether the configuration file exists at the specified configuration path.
   *
   * @returns A promise that resolves to `true` if the configuration file exists, or `false` otherwise.
   */
  public static async ConfigurationExists(): Promise<boolean> {
    return await FileSystem.FileExists(this.ConfigurationPath);
  };

  /**
   * Retrieves a specific configuration value by its key from the configuration store.
   *
   * @template T - The expected type of the configuration value.
   * @param {string} key - The key of the configuration value to retrieve.
   * @returns {Promise<T | undefined>} A promise that resolves to the value associated with the given key,
   * or `undefined` if the key does not exist or the configuration is not available.
   */
  public static async GetConfigurationKey<T>(key: string): Promise<T | undefined> {
    const configuration = await this.GetConfiguration() as Record<string, any> | null;
    return configuration ? (configuration[key] as T) : undefined;
  };

  /**
   * Retrieves a list of configuration field names.
   *
   * This static asynchronous method fetches the current configuration object
   * and returns an array containing the names of its fields (keys).
   * If no configuration is found, it returns an empty array.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of configuration field names.
   */
  public static async ListConfigurationFields(): Promise<string[]> {
    const config = await this.GetConfiguration();
    return config ? Object.keys(config) : [];
  };
}