/**
 * Módulo para consumir la API de pagos de MercadoPago
 * Gestiona creación de preferencias, verificación de estados y historial
 */

import apiClient from './apiClient';
import {
  PaymentPreferenceResponseSchema,
  SimpleCheckoutResponseSchema,
  PaymentStatusSchema,
  UserPaymentListSchema,
  PaymentHealthSchema,
  validateData,
  safeValidateData,
} from '../validation/schemas';
import { logDebug, logError, logWarn } from '../utils/logger';
import { NetworkError, ValidationError } from '../utils/errorHandler';
import type {
  PaymentPreferenceResponse,
  PaymentStatus,
  UserPayment,
  PaymentHealthResponse,
} from '../interfaces';

// Rutas de la API
const PAYMENT_BASE_PATH = '/api/payments';

/**
 * Transforma respuesta simplificada de checkout a PaymentPreferenceResponse
 * @private
 */
function transformSimpleCheckoutResponse(
  url: string,
  obligationId: number,
  contractId: number = 0
): PaymentPreferenceResponse {
  const prefMatch = url.match(/pref_id=([^&]+)/);
  const preferenceId = prefMatch ? prefMatch[1] : '';

  return {
    preferenceId,
    initPoint: url,
    amount: 0,
    currency: 'COP',
    obligationId,
    contractId,
    paymentId: null,
  };
}

/**
 * Maneja errores comunes de las llamadas a la API de pagos
 * @private
 */
function handlePaymentError(
  error: any,
  context: Record<string, any>,
  resourceType: string,
  resourceId: number | string
): never {
  if (error instanceof ValidationError) {
    throw error;
  }

  if (error?.status === 404) {
    const errorMsg = `No se encontró ${resourceType} con ID ${resourceId}`;
    logError(errorMsg, error, { ...context, suggestion: 'Verifica que el recurso existe en la base de datos' });
    throw new Error(`${errorMsg}. Verifica que el ID sea correcto.`);
  }

  if (error?.message?.includes('No se pudo conectar')) {
    const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
    logError(networkError.message, networkError, context);
    throw networkError;
  }

  logError(`Error en operación de ${resourceType}`, error, context);
  throw error;
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
 * console.log(preference.initPoint); // URL de redirección a MercadoPago
 * console.log(preference.preferenceId); // ID de preferencia de MercadoPago
 * console.log(preference.amount); // Monto del pago
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
      `${PAYMENT_BASE_PATH}/infraction/${userInfractionId}/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      }
    );

    const simpleValidation = safeValidateData(SimpleCheckoutResponseSchema, result);

    if (!simpleValidation.success) {
      logWarn('Respuesta de preferencia de pago no cumple con el esquema esperado', {
        ...context,
        errors: simpleValidation.error.issues,
        receivedData: result
      });
      throw new ValidationError('Datos de preferencia de pago inválidos');
    }

    const validated = transformSimpleCheckoutResponse(
      simpleValidation.data.url,
      userInfractionId
    );

    logDebug('Preferencia de pago creada exitosamente', { ...context, url: validated.initPoint });
    return validated;
  } catch (error: any) {
    handlePaymentError(error, context, 'la infracción', userInfractionId);
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
    return validated as PaymentStatus;
  } catch (error: any) {
    handlePaymentError(error, context, 'el pago', paymentId);
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
        }) as UserPayment[];
        logDebug(`Filtrados ${validItems.length}/${rawData.length} pagos válidos`, context);
        return validItems;
      }
      return [];
    }

    logDebug(`${validation.data.length} pagos consultados exitosamente`, context);
    return validation.data as UserPayment[];
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
 * Crear preferencia de pago para una cuota de acuerdo de pago
 *
 * @param {number} agreementId - ID del acuerdo de pago
 * @param {number} installmentId - ID de la cuota a pagar
 * @returns {Promise<PaymentPreferenceResponse>} Datos de la preferencia creada
 * @throws {NetworkError} Si no se puede conectar con el servidor
 * @throws {ValidationError} Si la respuesta no cumple con el esquema esperado
 *
 * @example
 * ```ts
 * const preference = await createAgreementInstallmentPayment(123, 456);
 * console.log(preference.initPoint); // URL de redirección a MercadoPago
 * console.log(preference.preferenceId); // ID de preferencia de MercadoPago
 * console.log(preference.amount); // Monto de la cuota
 * ```
 */
export async function createAgreementInstallmentPayment(
  agreementId: number,
  installmentId: number
): Promise<PaymentPreferenceResponse> {
  const context = { component: 'paymentApi', function: 'createAgreementInstallmentPayment' };

  if (!agreementId || agreementId <= 0) {
    const error = new ValidationError('ID de acuerdo inválido');
    logError(error.message, error, context);
    throw error;
  }

  if (!installmentId || installmentId <= 0) {
    const error = new ValidationError('ID de cuota inválido');
    logError(error.message, error, context);
    throw error;
  }

  try {
    const endpoint = `${PAYMENT_BASE_PATH}/agreement/${agreementId}/installment/${installmentId}/checkout`;
    logDebug(`Creando preferencia de pago para cuota ${installmentId} del acuerdo ${agreementId}`, context);

    const result = await apiClient.apiFetch(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      }
    );

    const simpleValidated = validateData(SimpleCheckoutResponseSchema, result);

    if (simpleValidated) {
      const transformed = transformSimpleCheckoutResponse(
        simpleValidated.url,
        installmentId,
        agreementId
      );

      logDebug('Preferencia de pago de cuota creada exitosamente', {
        ...context,
        preferenceId: transformed.preferenceId,
        agreementId,
        installmentId
      });
      return transformed;
    }

    const validated = validateData(PaymentPreferenceResponseSchema, result);

    if (!validated) {
      logWarn('Respuesta de preferencia de pago no cumple con el esquema esperado', context);
      throw new ValidationError('Datos de preferencia de pago inválidos');
    }

    logDebug('Preferencia de pago de cuota creada exitosamente', { ...context, paymentId: validated.paymentId });
    return validated as PaymentPreferenceResponse;
  } catch (error: any) {
    handlePaymentError(error, context, 'el acuerdo o cuota', `${agreementId}/${installmentId}`);
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
