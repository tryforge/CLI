// External packages
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
 * An interface representing how the Logger class is structured.
 */
interface LoggerScheme {
  /**
   * Logs a message at the specified log level.
   * @param level The log level.
   * @param args The message arguments.
   */
  log?(
    level: LogLevel,
    ...args: string[]
  ): void;

  /**
   * Logs a trace message.
   * @param args The message arguments.
   */
  trace?(
    ...args: string[]
  ): void;

  /**
   * Logs a debug message.
   * @param args The message arguments.
   */
  debug?(
    ...args: string[]
  ): void;

  /**
   * Logs an info message.
   * @param args The message arguments.
   */
  info?(
    ...args: string[]
  ): void;

  /**
   * Logs a success message.
   * @param args The message arguments.
   */
  success?(
    ...args: string[]
  ): void;

  /**
   * Logs a warning message.
   * @param args The message arguments.
   */
  warn?(
    ...args: string[]
  ): void;

  /**
   * Logs an error message.
   * @param args The message arguments.
   */
  error?(
    ...args: string[]
  ): void;
  
  /**
   * Logs a fatal error message.
   * @param args The message arguments.
   */
  fatal?(
    ...args: string[]
  ): void;

}

/**
 * Logger class for logging messages at various log levels.
 */
export class Logger implements LoggerScheme {
  private static currentLevel: LogLevel = LogLevel.INFO;

  /**
   * Sets the current log level.
   * @param level The log level to set.
   */
  public static setLevel(level: LogLevel): void {
    Logger.currentLevel = level;
  }

  /**
   * Logs a message at the specified log level.
   * @param level The log level.
   * @param args The message arguments.
   */
  public static log(level: LogLevel, ...args: string[]): void {
    if (level < Logger.currentLevel) return;
    const prefix = LogLevel[level];
    
    switch (level) {
      case (LogLevel.TRACE):
        args.forEach(arg => console.log(`${chalk.gray(prefix)} ${chalk.gray(arg)}`))
        break

      case (LogLevel.DEBUG):
        args.forEach(arg => console.log(`${chalk.yellow(prefix)} ${chalk.yellow(arg)}`))
        break

      case (LogLevel.INFO):
        args.forEach(arg => console.log(`${chalk.blue(prefix)} ${chalk.blue(arg)}`))
        break

      case (LogLevel.SUCCESS):
        args.forEach(arg => console.log(`${chalk.green(prefix)} ${chalk.green(arg)}`))
        break

      case (LogLevel.WARN):
        args.forEach(arg => console.log(`${chalk.yellow(prefix)} ${chalk.yellow(arg)}`))
        break

      case (LogLevel.ERROR):
        args.forEach(arg => console.log(`${chalk.red(prefix)} ${chalk.red(arg)}`))
        break

      case (LogLevel.FATAL):
        args.forEach(arg => console.log(`${chalk.red(prefix)} ${chalk.red(arg)}`))
        break
    }
  }

  /**
   * Logs a trace message.
   * @param args The message arguments.
   */
  public trace(...args: string[]): void {
    Logger.log(LogLevel.TRACE, ...args);
  }

  /**
   * Logs a debug message.
   * @param args The message arguments.
   */
  public debug(...args: string[]): void {
    Logger.log(LogLevel.DEBUG, ...args);
  }

  /**
   * Logs an info message.
   * @param args The message arguments.
   */
  public info(...args: string[]): void {
    Logger.log(LogLevel.INFO, ...args);
  }

  /**
   * Logs a success message.
   * @param args The message arguments.
   */
  public success(...args: string[]): void {
    Logger.log(LogLevel.SUCCESS, ...args);
  }

  /**
   * Logs a warning message.
   * @param args The message arguments.
   */
  public warn(...args: string[]): void {
    Logger.log(LogLevel.WARN, ...args);
  }

  /**
   * Logs an error message.
   * @param args The message arguments.
   */
  public error(...args: string[]): void {
    Logger.log(LogLevel.ERROR, ...args);
  }

  /**
   * Logs a fatal error message.
   * @param args The message arguments.
   */
  public fatal(...args: string[]): void {
    Logger.log(LogLevel.FATAL, ...args);
  }
}