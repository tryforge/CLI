// Node.js built-ins
import path from 'path';

// Local modules
import { FileSystem } from './FileSystem';
import { Logger } from './Logger';

/**
 * An interface representing how the ErrorManager class is structured.
 */
interface ErrorScheme {
  /**
   * The default error log file path (relative to workspace directory).
   */
  LogFile?: string;

  /**
   * Logs an error message to the ForgeCLI error log file.
   *
   * This static method appends a formatted error message to the error log file located in the workspace directory.
   * You can provide an error object or a string, and optionally a context string to add more details. The log entry includes a timestamp and the formatted error message.
   * Returns a promise that resolves to `true` if the log entry was successfully appended, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.LogError(new Error('Something went wrong'), 'Initialization');
   * ```
   *
   * @param error - The error object or string to log.
   * @param context - Optional context information to include with the error.
   * @returns A promise that resolves to `true` if the log entry was successfully appended, or `false` otherwise.
   */
  LogError?(
    error: Error | string,
    context?: string
  ): Promise<boolean>;

  /**
   * Formats an error message with optional context and stack trace.
   *
   * This static method takes an error object or string and returns a formatted string including the error message,
   * optional context, and stack trace if available. Useful for consistent error reporting and logging.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * const formatted = ErrorManager.FormatError('File not found', 'FileSystem');
   * ```
   *
   * @param error - The error object or string to format.
   * @param context - Optional context information to prepend to the message.
   * @returns The formatted error message, including context and stack trace if available.
   */
  FormatError?(
    error: Error | string,
    context?: string
  ): string;

  /**
   * Handles an error by optionally logging it and notifying the user.
   *
   * This static method processes an error by optionally logging it to the error log file and always notifying the user via the console.
   * You can provide an error object or string, a boolean to control logging, and an optional context string. The method ensures the error is surfaced to the user and optionally persisted for later review.
   * Returns a promise that resolves when the error has been handled. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.Handle('Network error', true, 'NetworkManager');
   * ```
   *
   * @param error - The error object or message string to handle.
   * @param log - Whether to log the error (default: false).
   * @param context - Optional context information about where the error occurred.
   * @returns A promise that resolves when the error has been handled.
   */
  Handle?(
    error: Error | string,
    context?: string
  ): Promise<void>;

  /**
   * Clears the contents of the error log file.
   *
   * This static method empties the error log file, either at the default location or at a custom path if provided.
   * Returns a promise that resolves to `true` if the log file was successfully cleared, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.ClearErrorLog();
   * ```
   *
   * @param logPath - Optional. The path to the error log file. If not provided, the default log file path is used.
   * @returns A promise that resolves to `true` if the log file was successfully cleared, or `false` otherwise.
   */
  ClearErrorLog?(
    logPath?: string
  ): Promise<boolean>;

  /**
   * Logs a formatted error message to the console for user notification.
   *
   * This static method prints a formatted error message to the console, including optional context and stack trace if available.
   * Intended for immediate user feedback about errors.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * ErrorManager.NotifyUser('Invalid input', 'UserPrompt');
   * ```
   *
   * @param error - The error object or message string to notify the user about.
   * @param context - Optional context information to provide additional details about the error.
   */
  NotifyUser?(
    error: Error | string,
    context?: string
  ): void;
}

/**
 * Manages error handling, logging, formatting, and user notification for the ForgeCLI.
 *
 * The `ErrorManager` class provides static methods for consistent error management across the CLI application.
 * It supports logging errors to a file, formatting error messages with context and stack traces, notifying users via the console,
 * and clearing the error log. All file operations are delegated to the `FileSystem` class manager.
 *
 * @since 0.0.1
 * @see FileSystem
 * @see https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts
 *
 * @example
 * ```typescript
 * await ErrorManager.LogError(new Error('Something went wrong'), 'Initialization');
 * await ErrorManager.Handle('Network error', true, 'NetworkManager');
 * await ErrorManager.ClearErrorLog();
 * ErrorManager.NotifyUser('Invalid input', 'UserPrompt');
 * ```
 */
export class ErrorManager implements ErrorScheme {
  /**
   * The default error log file path (relative to workspace directory).
   */
  public static LogFile: string = 'error.log';

  /**
   * Logs an error message to the ForgeCLI error log file.
   *
   * This static method appends a formatted error message to the error log file located in the workspace directory.
   * You can provide an error object or a string, and optionally a context string to add more details. The log entry includes a timestamp and the formatted error message.
   * Returns a promise that resolves to `true` if the log entry was successfully appended, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.LogError(new Error('Something went wrong'), 'Initialization');
   * ```
   *
   * @param error - The error object or string to log.
   * @param context - Optional context information to include with the error.
   * @returns A promise that resolves to `true` if the log entry was successfully appended, or `false` otherwise.
   */
  public static async LogError(
    error: Error | string,
    context?: string
  ): Promise<boolean> {
    const logPath = path.join(FileSystem.GetWorkspaceDirectory(), '.forge', this.LogFile);
    const logEntry = `[${new Date().toISOString()}] ${this.FormatError(error, context)}\n`;
    return FileSystem.AppendToFile(logPath, logEntry);
  };
  
  /**
   * Formats an error message with optional context and stack trace.
   *
   * This static method takes an error object or string and returns a formatted string including the error message,
   * optional context, and stack trace if available. Useful for consistent error reporting and logging.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * const formatted = ErrorManager.FormatError('File not found', 'FileSystem');
   * ```
   *
   * @param error - The error object or string to format.
   * @param context - Optional context information to prepend to the message.
   * @returns The formatted error message, including context and stack trace if available.
   */
  public static FormatError(
    error: Error | string,
    context?: string
  ): string {
    let msg = typeof error === 'string' ? error : error.message;
    if (context) msg = `[${context}] ${msg}`;
    if (error instanceof Error && error.stack) {
      msg += `\nStack: ${error.stack}`;
    }
    return msg;
  };

  /**
   * Handles an error by optionally logging it and notifying the user.
   *
   * This static method processes an error by optionally logging it to the error log file and always notifying the user via the console.
   * You can provide an error object or string, a boolean to control logging, and an optional context string. The method ensures the error is surfaced to the user and optionally persisted for later review.
   * Returns a promise that resolves when the error has been handled. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.Handle('Network error', true, 'NetworkManager');
   * ```
   *
   * @param error - The error object or message string to handle.
   * @param log - Whether to log the error (default: false).
   * @param context - Optional context information about where the error occurred.
   * @returns A promise that resolves when the error has been handled.
   */
  public static async Handle(
    error: Error | string,
    log: boolean = false,
    context?: string
  ): Promise<void> {
    log ? await this.LogError(error, context) : () => {};
    this.NotifyUser(error, context);
  };
  
  /**
   * Clears the contents of the error log file.
   *
   * This static method empties the error log file, either at the default location or at a custom path if provided.
   * Returns a promise that resolves to `true` if the log file was successfully cleared, or `false` otherwise. This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - This class uses the [FileSystem](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts) class manager.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * await ErrorManager.ClearErrorLog();
   * ```
   *
   * @param logPath - Optional. The path to the error log file. If not provided, the default log file path is used.
   * @returns A promise that resolves to `true` if the log file was successfully cleared, or `false` otherwise.
   */
  public static async ClearErrorLog(
    logPath?: string
  ): Promise<boolean> {
    const pathToLog = logPath || path.join(FileSystem.GetWorkspaceDirectory(), this.LogFile);
    return FileSystem.WriteFile(pathToLog, '');
  };

  /**
   * Logs a formatted error message to the console for user notification.
   *
   * This static method prints a formatted error message to the console, including optional context and stack trace if available.
   * Intended for immediate user feedback about errors.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/ErrorHandler.ts)
   *
   * Example usage:
   * ```typescript
   * ErrorManager.NotifyUser('Invalid input', 'UserPrompt');
   * ```
   *
   * @param error - The error object or message string to notify the user about.
   * @param context - Optional context information to provide additional details about the error.
   */
  public static NotifyUser(
    error: Error | string,
    context?: string
  ): void {
    Logger.error(this.FormatError(error, context));
  };
}
