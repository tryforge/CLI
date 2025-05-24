// 1. Node.js built-ins
import fs from 'fs';

// 2. External packages
import chalk from 'chalk';

/**
 * An enum to list the available log types.
 */
enum LogLevel {
  TRACE,
  DEBUG,
  INFO,
  SUCCESS,
  WARN,
  ERROR,
  FATAL,
  SILENT
}

/**
 * An interface representing the configuration for the logger.
 */
interface LoggerConfig {
  level?: LogLevel;
  console?: boolean;
  file?: string;
  scope?: string;
}

/**
 * A class to manage console outputs.
 */
export class Logger {
  private static level: LogLevel = LogLevel.INFO;
  private static writeToConsole: boolean = true;
  private static filePath?: string;
  private static defaultScope?: string;

  public static configure(
    config: LoggerConfig = {}
  ): void {
    Logger.level = config.level ?? LogLevel.INFO;
    Logger.writeToConsole = config.console ?? true;
    Logger.filePath = config.file;
    Logger.defaultScope = config.scope;
  }

  /**
   * Main log handler method, manages and format the output.
   * @param level - The type of log to log.
   * @param message - The message to log.
   * @param scope - The custom scope to use.
   * @returns void
   */
  private static log(
    level: LogLevel,
    message: any,
    scope?: string
  ): void {
    if (level < Logger.level) return;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const levelName = LogLevel[level].toUpperCase();
    const finalScope = scope || Logger.defaultScope;

    const parts = [
      `[${timestamp}]`,
      `[${levelName}]`,
      finalScope ? `[${finalScope}]` : '',
      message
    ].filter(Boolean).join(' ');

    const colorizedMessage = Logger.colorize(level, parts);

    if (Logger.writeToConsole) {
      if ([LogLevel.ERROR, LogLevel.FATAL].includes(level)) console.error(colorizedMessage);
      else if (level === LogLevel.WARN) console.warn(colorizedMessage);
      else console.log(colorizedMessage);
    }

    if (Logger.filePath) {
      try {
        fs.appendFileSync(Logger.filePath, parts + '\n', 'utf-8');
      } catch (error) {
        console.error(`Failed to write log to file: ${(error as Error).message}`);
      }
    }
  }

  /**
   * Manages the colorization for each type.
   * @param level - The type of log to colorize.
   * @param message - The message that will be colorized.
   * @returns `message`
   */
  private static colorize(
    level: LogLevel,
    message: string
  ): string {
    switch (level) {
      case LogLevel.TRACE:
        return chalk.gray(message);

      case LogLevel.DEBUG:
        return chalk.blue(message);

      case LogLevel.INFO:
        return chalk.cyan(message);

      case LogLevel.SUCCESS:
        return chalk.green(message);

      case LogLevel.WARN:
        return chalk.yellow(message);

      case LogLevel.ERROR:
        return chalk.red(message);

      case LogLevel.FATAL:
        return chalk.bgRed.white(message);

      default:
        return message;
    }
  }

  /**
   * Handles logs with type: TRACE.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static trace(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.TRACE, message, scope);
  }

  /**
   * Handles logs with type: DEBUG.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static debug(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.DEBUG, message, scope);
  }

  /**
   * Handles logs with type: INFO.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static info(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.INFO, message, scope);
  }

  /**
   * Handles logs with type: SUCCESS.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static success(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.SUCCESS, message, scope);
  }

  /**
   * Handles logs with type: ERROR.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static warn(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.WARN, message, scope);
  }

  /**
   * Handles logs with type: ERROR.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static error(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.ERROR, message, scope);
  }

  /**
   * Handles logs with type: FATAL.
   * @param message - The message to output.
   * @param scope - The debug scope to use.
   */
  public static fatal(
    message: any,
    scope?: string
  ): void {
    Logger.log(LogLevel.FATAL, message, scope);
  }
}