import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Calculate folder paths for saving log files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.resolve(__dirname, '../../logs');
const logFile = path.join(logDir, 'execution.log');

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

/**
 * Unified Logger utility for enterprise automation framework.
 * Standardizes log format with timestamps, levels, and outputs to both console and disk.
 */
export class Logger {
  private static currentLevel: LogLevel = LogLevel.INFO;

  /**
   * Set the current logger severity filter level.
   */
  public static setLogLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  /**
   * Log an informational message.
   */
  public static info(message: string, context?: string): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log a warning message.
   */
  public static warn(message: string, context?: string): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log an error message.
   */
  public static error(message: string, error?: Error, context?: string): void {
    const errMsg = error ? `${message} | Error: ${error.message}\nStack: ${error.stack}` : message;
    this.log(LogLevel.ERROR, errMsg, context);
  }

  /**
   * Log a debug message (only visible if LogLevel set to DEBUG).
   */
  public static debug(message: string, context?: string): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * General logging engine. Writes to stdout/stderr and disk.
   */
  private static log(level: LogLevel, message: string, context?: string): void {
    if (level < this.currentLevel) return;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const levelStr = LogLevel[level].padEnd(5);
    const contextStr = context ? ` [${context}]` : '';
    const formattedMessage = `[${timestamp}] [${levelStr}]${contextStr} ${message}`;

    // Print to console
    if (level === LogLevel.ERROR) {
      console.error(formattedMessage);
    } else {
      console.log(formattedMessage);
    }

    // Write to file asynchronously without blocking test execution
    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(logFile, formattedMessage + '\n', 'utf8');
    } catch (err) {
      // Fail-silent on file logging failures to prevent halting tests
    }
  }
}
