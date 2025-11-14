/**
 * Módulo para consumir la API de pagos de MercadoPago
 * Gestiona creación de preferencias, verificación de estados y historial
 */

import apiClient from './apiClient';
import {
  PaymentPreferenceResponseSchema,
  PaymentStatusSchema,
  UserPaymentListSchema,
  PaymentHealthSchema,
  validateData,
  safeValidateData,
} from '../validation/schemas';
import { logDebug, logError, logWarn } from '../utils/logger';
import { NetworkError, ValidationError } from '../utils/errorHandler';

// Rutas de la API
const PAYMENT_BASE_PATH = '/api/payment';

/**
 * Interfaces para respuestas de API
 */
export interface PaymentPreferenceResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
  amount: number;
  paymentId: number;
}

export interface PaymentStatus {
  id: number;
  amount: number;
  status: 'Pending' | 'Approved' | 'InProcess' | 'Rejected' | 'Cancelled' | 'Refunded';
  statusDescription: string;
  paidAt: string | null;
  mercadoPagoPaymentId: number | null;
  paymentMethod: string | null;
  infraction: {
    id: number;
    stateInfraction: string;
    description: string;
  };
}

export interface UserPayment {
  id: number;
  amount: number;
  status: string;
  paidAt: string | null;
  paymentMethod: string | null;
  created_date: string;
  infraction: {
    id: number;
    description: string;
    dateInfraction: string;
  };
}

export interface PaymentHealthResponse {
  status: string;
  database: string;
  paymentsTable: string;
  paymentsCount: number;
  mercadoPago: string;
  timestamp: string;
}

/**
 * Crear preferencia de pago para una infracción
 *
 * @param {number} userInfractionId - ID de la infracción del usuario
 * @returns {Promise<PaymentPreferenceResponse>} Datos de la preferencia creada
 * @throws {NetworkError} Si no se puede conectar con el servidor
 * @throws {ValidationError} Si la respuesta no cumple con el esquema esperado
 *
 * @example
 * ```ts
 * const preference = await createPaymentPreference(123);
 * console.log(preference.initPoint); // URL para producción
 * console.log(preference.sandboxInitPoint); // URL para pruebas
 * ```
 */
export async function createPaymentPreference(
  userInfractionId: number
): Promise<PaymentPreferenceResponse> {
  const context = { component: 'paymentApi', function: 'createPaymentPreference' };

  if (!userInfractionId || userInfractionId <= 0) {
    const error = new ValidationError('ID de infracción inválido');
    logError(error.message, error, context);
    throw error;
  }

  try {
    logDebug(`Creando preferencia de pago para infracción: ${userInfractionId}`, context);

    const result = await apiClient.apiFetch(
      `${PAYMENT_BASE_PATH}/create-preference/${userInfractionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      }
    );

    const validated = validateData(PaymentPreferenceResponseSchema, result);

    if (!validated) {
      logWarn('Respuesta de preferencia de pago no cumple con el esquema esperado', context);
      throw new ValidationError('Datos de preferencia de pago inválidos');
    }

    logDebug('Preferencia de pago creada exitosamente', { ...context, paymentId: validated.paymentId });
    return validated;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al crear preferencia de pago', error, context);
    throw error;
  }
}

/**
 * Obtener estado de un pago específico
 *
 * @param {number} paymentId - ID del pago a consultar
 * @returns {Promise<PaymentStatus>} Estado actual del pago
 * @throws {NetworkError} Si no se puede conectar con el servidor
 * @throws {ValidationError} Si la respuesta no cumple con el esquema esperado
 *
 * @example
 * ```ts
 * const status = await getPaymentStatus(456);
 * if (status.status === 'Approved') {
 *   console.log('Pago aprobado!');
 * }
 * ```
 */
export async function getPaymentStatus(paymentId: number): Promise<PaymentStatus> {
  const context = { component: 'paymentApi', function: 'getPaymentStatus' };

  if (!paymentId || paymentId <= 0) {
    const error = new ValidationError('ID de pago inválido');
    logError(error.message, error, context);
    throw error;
  }

  try {
    logDebug(`Consultando estado del pago: ${paymentId}`, context);

    const result = await apiClient.apiFetch(`${PAYMENT_BASE_PATH}/${paymentId}`, {
      method: 'GET',
    });

    const validated = validateData(PaymentStatusSchema, result);

    if (!validated) {
      logWarn('Respuesta de estado de pago no cumple con el esquema esperado', context);
      throw new ValidationError('Datos de estado de pago inválidos');
    }

    logDebug('Estado de pago consultado exitosamente', { ...context, status: validated.status });
    return validated;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al obtener estado del pago', error, context);
    throw error;
  }
}

/**
 * Obtener historial de pagos de un usuario
 *
 * @param {number} userId - ID del usuario
 * @returns {Promise<UserPayment[]>} Lista de pagos del usuario
 * @throws {NetworkError} Si no se puede conectar con el servidor
 *
 * @example
 * ```ts
 * const payments = await getUserPayments(789);
 * const approvedPayments = payments.filter(p => p.status === 'Approved');
 * ```
 */
export async function getUserPayments(userId: number): Promise<UserPayment[]> {
  const context = { component: 'paymentApi', function: 'getUserPayments' };

  if (!userId || userId <= 0) {
    const error = new ValidationError('ID de usuario inválido');
    logError(error.message, error, context);
    throw error;
  }

  try {
    logDebug(`Consultando historial de pagos del usuario: ${userId}`, context);

    const result = await apiClient.apiFetch(`${PAYMENT_BASE_PATH}/user/${userId}`, {
      method: 'GET',
    });

    const rawData = Array.isArray(result) ? result : result?.data ?? [];
    const validation = safeValidateData(UserPaymentListSchema, rawData);

    if (!validation.success) {
      logWarn('Algunos pagos no cumplen con el esquema esperado', {
        ...context,
        errors: validation.error.issues
      });

      // Filtrar solo los items válidos
      if (Array.isArray(rawData)) {
        const validItems = rawData.filter(item => {
          const itemValidation = validateData(UserPaymentListSchema.element, item);
          return itemValidation !== null;
        });
        logDebug(`Filtrados ${validItems.length}/${rawData.length} pagos válidos`, context);
        return validItems;
      }
      return [];
    }

    logDebug(`${validation.data.length} pagos consultados exitosamente`, context);
    return validation.data;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al obtener historial de pagos', error, context);
    throw error;
  }
}

/**
 * Verificar estado del sistema de pagos (health check)
 *
 * @returns {Promise<PaymentHealthResponse>} Estado del sistema de pagos
 * @throws {NetworkError} Si no se puede conectar con el servidor
 *
 * @example
 * ```ts
 * const health = await checkPaymentHealth();
 * if (health.status === 'Healthy') {
 *   console.log('Sistema de pagos operativo');
 * }
 * ```
 */
export async function checkPaymentHealth(): Promise<PaymentHealthResponse> {
  const context = { component: 'paymentApi', function: 'checkPaymentHealth' };

  try {
    logDebug('Verificando salud del sistema de pagos', context);

    const result = await apiClient.apiFetch(`${PAYMENT_BASE_PATH}/health`, {
      method: 'GET',
    });

    const validated = validateData(PaymentHealthSchema, result);

    if (!validated) {
      logWarn('Respuesta de health check no cumple con el esquema esperado', context);
      // En caso de health check, permitir respuesta aunque no valide perfectamente
      return result as PaymentHealthResponse;
    }

    logDebug('Health check completado', { ...context, status: validated.status });
    return validated;
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al verificar salud del sistema de pagos', error, context);
    throw error;
  }
}
