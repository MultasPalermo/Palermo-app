/**
 * Utilidades para manejo centralizado de errores
 */

import { logError, LogContext } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'NETWORK_ERROR', 0, originalError);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'VALIDATION_ERROR', 400, originalError);
    this.name = 'ValidationError';
  }
}

/**
 * Maneja errores de forma centralizada con logging
 */
export function handleError(error: unknown, context?: LogContext): AppError {
  if (error instanceof AppError) {
    logError(error.message, error, context);
    return error;
  }

  if (error instanceof Error) {
    const appError = new AppError(error.message, 'UNKNOWN_ERROR', 500, error);
    logError(error.message, error, context);
    return appError;
  }

  const genericError = new AppError('Error desconocido', 'UNKNOWN_ERROR', 500);
  logError('Error desconocido', genericError, context);
  return genericError;
}

/**
 * Obtiene un mensaje de error amigable para el usuario
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof NetworkError) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
  }

  if (error instanceof ValidationError) {
    return 'Los datos recibidos no son válidos. Por favor intenta de nuevo.';
  }

  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.';
}
