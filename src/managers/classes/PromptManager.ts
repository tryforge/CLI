// External packages
import { prompt } from 'enquirer';

/**
 * An interface representing how the PromptManager class is structured.
 */
export interface PromptScheme {
  /**
   * Prompts the user for a string input.
   * @param message The message/question to display.
   * @param initial Optional default value.
   * @param validate Optional validation function.
   * @returns Promise resolving to the user's input.
   */
  input?(
    message: string,
    initial?: string,
    validate?: (value: string) => boolean | string
  ): Promise<string>;

  /**
   * Prompts the user to select one option from a list.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional default index or value.
   * @returns Promise resolving to the selected value.
   */
  select?(
    message: string,
    choices: string[] | { name: string; value?: any }[],
    initial?: number | string
  ): Promise<any>;

  /**
   * Prompts the user for a yes/no confirmation.
   * @param message The message/question to display.
   * @param initial Optional default value (true/false).
   * @returns Promise resolving to true or false.
   */
  confirm?(
    message: string,
    initial?: boolean
  ): Promise<boolean>;

  /**
   * Prompts the user to select multiple options from a list.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional array of default selected values.
   * @returns Promise resolving to an array of selected values.
   */
  multiselect?(
    message: string,
    choices: string[] | { name: string; value?: any }[],
    initial?: any[]
  ): Promise<any[]>;

  /**
   * Prompts the user for a password (input hidden).
   * @param message The message/question to display.
   * @param validate Optional validation function.
   * @returns Promise resolving to the entered password.
   */
  password?(
    message: string,
    validate?: (value: string) => boolean | string
  ): Promise<string>;

  /**
   * Prompts the user with an autocomplete input.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional default value.
   * @returns Promise resolving to the selected value.
   */
  autocomplete?(
    message: string,
    choices: string[] | { name: string; value?: any }[],
    initial?: string
  ): Promise<any>;

  /**
   * Prompts the user with a form.
   * @param message The message/question to display.
   * @param choices Array of field definitions.
   * @returns Promise resolving to an object with the form answers.
   */
  form?(
    message: string,
    choices: { name: string; message?: string; initial?: string }[]
  ): Promise<Record<string, any>>;

  /**
   * Runs a batch of prompts and returns all answers as an object.
   * @param prompts Array of Enquirer-style prompt configs.
   * @returns Promise resolving to an object with answers.
   */
  promptAll?(
    prompts: any[]
  ): Promise<Record<string, any>>;
}

/**
 * A class that manages prompts using the Enquirer library.
 */
export class PromptManager implements PromptScheme {
  /**
   * Prompts the user for a string input.
   * @param message The message/question to display.
   * @param initial Optional default value.
   * @param validate Optional validation function.
   * @returns Promise resolving to the user's input.
   */
  static async input(
    message: string,
    initial?: string,
    validate?: (value: string) => boolean | string
  ): Promise<string> {
    const response = await prompt<{ input: any }>({
      type: 'input',
      name: 'input',
      message,
      initial,
      validate
    });
    return response.input;
  }

  /**
   * Prompts the user to select one option from a list.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional default index or value.
   * @returns Promise resolving to the selected value.
   */
  static async select(
    message: string,
    choices: any[],
    initial?: number | string
  ): Promise<any> {
    const response = await prompt<{ select: string[] }>({
      type: 'select',
      name: 'select',
      message, choices,
      initial 
    });
    return response.select;
  }

  /**
   * Prompts the user for a yes/no confirmation.
   * @param message The message/question to display.
   * @param initial Optional default value (true/false).
   * @returns Promise resolving to true or false.
   */
  static async confirm(
    message: string,
    initial?: boolean
  ): Promise<boolean> {
    const response = await prompt<{ confirm: boolean }>({
      type: 'confirm',
      name: 'confirm',
      message,
      initial
    });
    return response.confirm;
  }

  /**
   * Prompts the user to select multiple options from a list.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional array of default selected values.
   * @returns Promise resolving to an array of selected values.
   */
  static async multiselect(
    message: string,
    choices: any[],
    initial?: any[]
  ): Promise<any[]> {
    const response = await prompt<{ multiselect: any[] }>({
      type: 'multiselect',
      name: 'multiselect',
      message,
      choices,
      initial
    });
    return response.multiselect;
  }

  /**
   * Prompts the user for a password (input hidden).
   * @param message The message/question to display.
   * @param validate Optional validation function.
   * @returns Promise resolving to the entered password.
   */
  static async password(
    message: string,
    validate?: (value: string) => boolean | string
  ): Promise<string> {
    const response = await prompt<{ password: string }>({
      type: 'password',
      name: 'password',
      message,
      validate
    });
    return response.password;
  }

  /**
   * Prompts the user with an autocomplete input.
   * @param message The message/question to display.
   * @param choices Array of choices.
   * @param initial Optional default value.
   * @returns Promise resolving to the selected value.
   */
  static async autocomplete(
    message: string,
    choices: any[],
    initial?: string
  ): Promise<any> {
    const response = await prompt<{ autocomplete: any }>({
      type: 'autocomplete',
      name: 'autocomplete',
      message,
      choices,
      initial
    });
    return response.autocomplete;
  }

  /**
   * Prompts the user with a form.
   * @param message The message/question to display.
   * @param choices Array of field definitions.
   * @returns Promise resolving to an object with the form answers.
   */
  static async form(
    message: string,
    choices: { name: string; message?: string; initial?: string }[]
  ): Promise<Record<string, any>> {
    const response = await prompt<{ form: Record<string, any> }>({
      type: 'form',
      name: 'form',
      message,
      choices
    });
    return response.form;
  }

  /**
   * Runs a batch of prompts and returns all answers as an object.
   * @param prompts Array of Enquirer-style prompt configs.
   * @returns Promise resolving to an object with answers.
   */
  static async promptAll(
    prompts: any[]
  ): Promise<Record<string, any>> {
    return await prompt(prompts);
  }
}