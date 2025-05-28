// Node.js built-ins
import path from 'path';

// Local modules
import { FileSystem } from './FileSystem';

/**
 * An interface representing how the ErrorManager class is structured.
 */
interface ErrorScheme {
  /**
   * Logs an error message to the ForgeCLI error log file.
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
   * @param error - The error object or message string to handle.
   * @param context - Optional context information about where the error occurred.
   * @param log - Whether to log the error (default: false).
   * @returns A promise that resolves when the error has been handled.
   */
  Handle?(
    error: Error | string,
    context?: string
  ): Promise<void>;

  /**
   * Clears the contents of the error log file.
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
   * @param error - The error object or message string to notify the user about.
   * @param context - Optional context information to provide additional details about the error.
   */
  NotifyUser?(
    error: Error | string,
    context?: string
  ): void;
}

/**
 * A class to manage error handling, logging, and notification.
 */
export class ErrorManager implements ErrorScheme {
  /**
   * The default error log file path (relative to workspace directory).
   */
  public static LogFile: string = 'error.log';

  /**
   * Logs an error message to the ForgeCLI error log file.
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
   * @param error - The error object or message string to handle.
   * @param context - Optional context information about where the error occurred.
   * @param log - Whether to log the error (default: false).
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
   * @param error - The error object or message string to notify the user about.
   * @param context - Optional context information to provide additional details about the error.
   */
  public static NotifyUser(
    error: Error | string,
    context?: string
  ): void {
    console.error(this.FormatError(error, context));
  };
}
