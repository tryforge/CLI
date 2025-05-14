/**
 * Interface representing a map of enums and their allowed values.
 */
export interface IEnum {
  /**
   * The name of the enum as the key, and an array of valid string values for that enum.
   */
  [enumName: string]: string[];
}