// 2. External packages
import chalk from 'chalk';

/**
 * Log levels ordered by severity.
 */
export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  SUCCESS = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
  SILENT = 7
}

/**
 * Interface for defining a log message format.
 */
export interface LogFormat {
  timestamp?: boolean;
  level?: boolean;
  scope?: boolean;
  color?: boolean;
}

/**
 * Logger configuration options.
 */
export interface LoggerConfig {
  /**
   * Minimum log level to display.
   */
  level?: LogLevel;

  /**
   * Format for log messages.
   */
  format?: LogFormat;

  /**
   * Whether to write to console.
   */
  console?: boolean;

  /**
   * Optional file path to write logs to.
   */
  file?: string;

  /**
   * Default scope for log messages.
   */
  scope?: string;
}

/**
 * A flexible and configurable logging utility class.
 */
export class LoggerManager {
  // Instance properties
  private level: LogLevel;
  private format: LogFormat;
  private writeToConsole: boolean;
  private filePath?: string;
  private defaultScope?: string;

  /**
   * Creates a new Logger instance
   * 
   * @param config Logger configuration options
   */
  constructor(config: LoggerConfig = {}) {
    this.level = config.level ?? LogLevel.INFO;
    this.format = {
      timestamp: config.format?.timestamp ?? true,
      level: config.format?.level ?? true,
      scope: config.format?.scope ?? true,
      color: config.format?.color ?? true
    };
    this.writeToConsole = config.console ?? true;
    this.filePath = config.file;
    this.defaultScope = config.scope;
  }

  /**
   * Creates a child logger with a specific scope
   * 
   * @param scope The scope name for the child logger
   * @returns A new Logger instance with the specified scope
   */
  public scope(scope: string): LoggerManager {
    const childLogger = new LoggerManager({
      level: this.level,
      format: this.format,
      console: this.writeToConsole,
      file: this.filePath,
      scope
    });

    return childLogger;
  }

  /**
   * Sets the minimum log level
   * 
   * @param level The minimum level to log
   * @returns The logger instance for chaining
   */
  public setLevel(level: LogLevel): LoggerManager {
    this.level = level;
    return this;
  }

  /**
   * Formats a log message with the appropriate prefixes and colors
   * 
   * @param level The log level
   * @param message The message to log
   * @param scope Optional scope override
   * @returns Formatted log message
   */
  private formatMessage(level: LogLevel, message: string, scope?: string): string {
    const parts: string[] = [];

    // Add timestamp if enabled
    if (this.format.timestamp) {
      const now = new Date();
      const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
      parts.push(this.format.color ? chalk.gray(`[${timestamp}]`) : `[${timestamp}]`);
    }

    // Add level if enabled
    if (this.format.level) {
      const levelName = LogLevel[level].toUpperCase();
      let levelStr = `[${levelName}]`;

      if (this.format.color) {
        switch (level) {
          case LogLevel.TRACE:
            levelStr = chalk.gray(levelStr);
            break;
          case LogLevel.DEBUG:
            levelStr = chalk.blue(levelStr);
            break;
          case LogLevel.INFO:
            levelStr = chalk.cyan(levelStr);
            break;
          case LogLevel.SUCCESS:
            levelStr = chalk.green(levelStr);
            break;
          case LogLevel.WARN:
            levelStr = chalk.yellow(levelStr);
            break;
          case LogLevel.ERROR:
            levelStr = chalk.red(levelStr);
            break;
          case LogLevel.FATAL:
            levelStr = chalk.bgRed.white(levelStr);
            break;
        }
      }

      parts.push(levelStr);
    }

    // Add scope if enabled and provided
    const finalScope = scope || this.defaultScope;
    if (this.format.scope && finalScope) {
      const scopeStr = `[${finalScope}]`;
      parts.push(this.format.color ? chalk.magenta(scopeStr) : scopeStr);
    }

    // Add the actual message
    parts.push(message);

    return parts.join(' ');
  }

  /**
   * Internal logging method
   * 
   * @param level Log level
   * @param message Message or object to log
   * @param scope Optional scope override
   */
  private log(level: LogLevel, message: any, scope?: string): void {
    // Skip if below configured level
    if (level < this.level) return;

    // Convert objects to strings if needed
    const messageStr = typeof message === 'string'
      ? message
      : JSON.stringify(message, null, 2);

    const formattedMessage = this.formatMessage(level, messageStr, scope);

    // Write to console if enabled
    if (this.writeToConsole) {
      switch (level) {
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        default:
          console.log(formattedMessage);
      }
    }

    // File logging could be implemented here
    if (this.filePath) {
      // In a real implementation, you'd write to a file here
      // Using fs.appendFile or a streaming approach
    }
  }

  /**
   * Logs a trace message (most verbose)
   */
  public trace(message: any, scope?: string): void {
    this.log(LogLevel.TRACE, message, scope);
  }

  /**
   * Logs a debug message
   */
  public debug(message: any, scope?: string): void {
    this.log(LogLevel.DEBUG, message, scope);
  }

  /**
   * Logs an info message
   */
  public info(message: any, scope?: string): void {
    this.log(LogLevel.INFO, message, scope);
  }

  /**
   * Logs a success message
   */
  public success(message: any, scope?: string): void {
    this.log(LogLevel.SUCCESS, message, scope);
  }

  /**
   * Logs a warning message
   */
  public warn(message: any, scope?: string): void {
    this.log(LogLevel.WARN, message, scope);
  }

  /**
   * Logs an error message
   */
  public error(message: any, scope?: string): void {
    this.log(LogLevel.ERROR, message, scope);
  }

  /**
   * Logs a fatal error message (most severe)
   */
  public fatal(message: any, scope?: string): void {
    this.log(LogLevel.FATAL, message, scope);
  }

  /**
   * Creates a global logger instance with default configuration
   * 
   * @returns A configured Logger instance
   */
  public static createDefault(): LoggerManager {
    return new LoggerManager({
      level: LogLevel.INFO,
      format: {
        timestamp: false,
        level: true,
        scope: true,
        color: true
      }
    });
  }
}

/**
 * Default logger instance for quick access
 */
export const Logger = LoggerManager.createDefault();

/**
 * Metadata about the current file.
 * @internal
 */
export const FILE_METADATA_LOGGER = {
  filename: 'logger.ts',
  createdAt: new Date('2025-05-21T15:30:00+02:00'),
  updatedAt: new Date('2025-05-21T19:45:00+02:00'),
  author: 'striatp',
  description: 'Configurable logging utility class.',
  tags: ['CLI', 'Logging', 'Utility']
};