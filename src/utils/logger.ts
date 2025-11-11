/**
 * Sistema de logging estructurado
 * Proporciona logs con contexto y niveles para debugging y producción
 */

import { DEBUG_MODE } from '../api/config';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogContext {
  component?: string;
  function?: string;
  userId?: string | number;
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Mantener solo los últimos 100 logs en memoria

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    // Mantener historial limitado
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    return entry;
  }

  private formatMessage(entry: LogEntry): string {
    const contextStr = entry.context
      ? ` [${entry.context.component || ''}${entry.context.function ? `.${entry.context.function}` : ''}]`
      : '';

    return `[${entry.level}]${contextStr} ${entry.message}`;
  }

  private shouldLog(level: LogLevel): boolean {
    // En producción, solo logear WARN y ERROR
    if (!DEBUG_MODE) {
      return level === LogLevel.WARN || level === LogLevel.ERROR;
    }
    return true;
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.createLogEntry(LogLevel.DEBUG, message, context);
    console.debug(this.formatMessage(entry), context);
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.createLogEntry(LogLevel.INFO, message, context);
    console.info(this.formatMessage(entry), context);
  }

  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.createLogEntry(LogLevel.WARN, message, context);
    console.warn(this.formatMessage(entry), context);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, context, error);
    console.error(this.formatMessage(entry), error, context);
  }

  /**
   * Obtiene los logs almacenados en memoria
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Limpia todos los logs almacenados
   */
  clearLogs(): void {
    this.logs = [];
  }
}

// Exportar instancia singleton
export const logger = Logger.getInstance();

// Funciones helper para logging rápido
export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);

export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);

export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);

export const logError = (message: string, error?: Error, context?: LogContext) =>
  logger.error(message, error, context);
