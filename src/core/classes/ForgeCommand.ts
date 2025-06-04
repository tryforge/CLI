// External packages.
import { Command } from 'commander';

/**
 * An interface representing how the ForgeCommand class is structured.
 */
interface ForgeScheme {
  /**
   * Registers a function to be executed before the main command execution.
   *
   * @param func - An asynchronous function to be called pre-execution.
   * @returns The current instance for method chaining.
   */
  preExecute?(
    func: () => Promise<void>
  ): ForgeCommand;

  /**
   * Registers a function to be executed after the main command execution.
   *
   * @param func - An asynchronous function to be called post-execution.
   * @returns The current instance for method chaining.
   */
  postExecute(
    func: () => Promise<void>
  ): ForgeCommand;
  
  /**
   * Retrieves the list of hooks to be executed before the main command execution.
   *
   * @returns An array containing the pre-execution hooks.
   */
  preExecuteHooks?(): Array<() => Promise<void>>;

  /**
   * Retrieves the list of hooks to be executed after the main command execution.
   *
   * @returns An array containing the post-execution hooks.
   */
  postExecuteHooks?(): Array<() => Promise<void>>;

  /**
   * Overrides the base `action` method to add pre- and post-execution hooks.
   *
   * @param fn - The main function to execute when the command is invoked. Can be synchronous or asynchronous.
   * @returns The result of the parent class's `action` method, with hooks executed before and after `fn`.
   *
   * @remarks
   * - Executes all registered pre-execution hooks before running `fn`.
   * - Executes all registered post-execution hooks after `fn` completes.
   * - Hooks are awaited, so they can be asynchronous.
   */
  action?(
    fn: (...args: any[]) => void | Promise<void>
  ): ForgeCommand;
}

/**
 * Extends the base `Command` class to provide a hookable command execution flow.
 * 
 * The `ForgeCommand` class allows registration of asynchronous pre- and post-execution hooks,
 * which are executed before and after the main command action, respectively. This enables
 * additional logic (such as setup, teardown, or logging) to be injected into the command
 * lifecycle in a composable and reusable manner.
 * 
 * @remarks
 * - Hooks are registered via the `preExecute` and `postExecute` methods.
 * - All hooks are awaited in sequence, ensuring proper order and completion before/after the main action.
 * - The `action` method is overridden to automatically invoke registered hooks around the main command logic.
 * 
 * @typeParam Command - The base command class being extended.
 * @implements ForgeScheme
 */
export class ForgeCommand extends Command implements ForgeScheme {
  private _preExecuteHooks: Array<() => Promise<void>> = [];
  private _postExecuteHooks: Array<() => Promise<void>> = [];

  /**
   * Creates a new instance of the ForgeCommand class with the specified name.
   *
   * @param name - The name of the command.
   */
  constructor(name: string) {
    super(name);
  }

  /**
   * Registers a function to be executed before the main command execution.
   *
   * @param func - An asynchronous function to be called pre-execution.
   * @returns The current instance for method chaining.
   */
  public preExecute(func: () => Promise<void>): this {
    this._preExecuteHooks.push(func);
    return this;
  }

  /**
   * Registers a function to be executed after the main command execution.
   *
   * @param func - An asynchronous function to be called post-execution.
   * @returns The current instance for method chaining.
   */
  public postExecute(func: () => Promise<void>) {
    this._postExecuteHooks.push(func);
    return this;
  }

  /**
   * Retrieves the list of hooks to be executed before the main command execution.
   *
   * @returns An array containing the pre-execution hooks.
   */
  public preExecuteHooks() {
    return this._preExecuteHooks;
  }

  /**
   * Retrieves the list of hooks to be executed after the main command execution.
   *
   * @returns An array containing the post-execution hooks.
   */
  public postExecuteHooks() {
    return this._postExecuteHooks;
  }

  /**
   * Overrides the base `action` method to add pre- and post-execution hooks.
   *
   * @param fn - The main function to execute when the command is invoked. Can be synchronous or asynchronous.
   * @returns The result of the parent class's `action` method, with hooks executed before and after `fn`.
   *
   * @remarks
   * - Executes all registered pre-execution hooks before running `fn`.
   * - Executes all registered post-execution hooks after `fn` completes.
   * - Hooks are awaited, so they can be asynchronous.
   */
  public override action(fn: (...args: any[]) => void | Promise<void>): this {
    return super.action(async (...args: any[]) => {
      for (const hook of this._preExecuteHooks) await hook();
      await fn(...args);
      for (const hook of this._postExecuteHooks) await hook();
    });
  }
}