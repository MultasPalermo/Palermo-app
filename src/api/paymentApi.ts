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

// Rutas de la API
const PAYMENT_BASE_PATH = '/api/payments';

/**
 * Interfaces para respuestas de API
 */
export interface PaymentPreferenceResponse {
  preferenceId: string;
  initPoint: string;
  amount: number;
  currency: string;
  obligationId: number;
  contractId: number;
  paymentId: number | null;
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

    // LOG TEMPORAL: Ver la respuesta real del backend
    console.log('🔍 [DEBUG] Respuesta raw del backend:', JSON.stringify(result, null, 2));

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
    
    // Manejo específico de error 404
    if (error?.status === 404) {
      const endpoint = `${PAYMENT_BASE_PATH}/infraction/${userInfractionId}/checkout`;
      const errorMsg = `No se encontró la infracción con ID ${userInfractionId}`;
      logError(errorMsg, error, { 
        ...context, 
        endpoint, 
        userInfractionId,
        suggestion: 'Verifica que la infracción existe en la base de datos'
      });
      throw new Error(`No se encontró la infracción con ID ${userInfractionId}. Verifica que el ID sea correcto.`);
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
    
    // Manejo específico de error 404
    if (error?.status === 404) {
      const endpoint = `${PAYMENT_BASE_PATH}/${paymentId}`;
      logError('Endpoint de estado de pago no encontrado', error, { 
        ...context, 
        endpoint,
        paymentId
      });
      throw new Error(`No se encontró el pago con ID ${paymentId} o el endpoint no está disponible.`);
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
    console.log('🔍 [DEBUG] URL completa a llamar:', endpoint);
    console.log('🔍 [DEBUG] Parámetros:', { agreementId, installmentId });

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

    // LOG TEMPORAL: Ver la respuesta real del backend
    console.log('🔍 [DEBUG] Respuesta raw del backend (cuota):', JSON.stringify(result, null, 2));

    // Intentar validar primero con el esquema simplificado (solo URL)
    const simpleValidated = validateData(SimpleCheckoutResponseSchema, result);
    
    if (simpleValidated) {
      // Backend devolvió formato simplificado, transformar a formato completo
      logDebug('Respuesta de checkout simplificada recibida, transformando...', context);
      
      // Extraer preferenceId de la URL
      const urlMatch = simpleValidated.url.match(/pref_id=([^&]+)/);
      const preferenceId = urlMatch ? urlMatch[1] : 'unknown';
      
      const transformed: PaymentPreferenceResponse = {
        preferenceId: preferenceId,
        initPoint: simpleValidated.url,
        amount: 0, // No disponible en respuesta simplificada
        currency: 'COP', // Valor por defecto para Colombia
        obligationId: installmentId, // ID de la cuota (obligación)
        contractId: agreementId, // ID del acuerdo (contrato)
        paymentId: null, // No disponible aún, se generará en MercadoPago
      };
      
      logDebug('Preferencia de pago de cuota creada exitosamente (formato simplificado)', { 
        ...context, 
        preferenceId,
        agreementId,
        installmentId 
      });
      return transformed;
    }
    
    // Si no es formato simplificado, intentar con esquema completo
    const validated = validateData(PaymentPreferenceResponseSchema, result);

    if (!validated) {
      logWarn('Respuesta de preferencia de pago no cumple con el esquema esperado', context);
      throw new ValidationError('Datos de preferencia de pago inválidos');
    }

    logDebug('Preferencia de pago de cuota creada exitosamente', { ...context, paymentId: validated.paymentId });
    return validated;
  } catch (error: any) {
    // LOG DETALLADO DEL ERROR
    console.error('❌ [DEBUG] Error completo en createAgreementInstallmentPayment:', {
      message: error?.message,
      status: error?.status,
      body: error?.body,
      stack: error?.stack,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });

    if (error instanceof ValidationError) {
      throw error;
    }

    // Manejo específico de error 404
    if (error?.status === 404) {
      const endpoint = `${PAYMENT_BASE_PATH}/agreement/${agreementId}/installment/${installmentId}/checkout`;
      const errorMsg = error?.message?.includes('cuota')
        ? `No se encontró la cuota con ID ${installmentId}`
        : `No se encontró el acuerdo con ID ${agreementId}`;
      logError(errorMsg, error, {
        ...context,
        endpoint,
        agreementId,
        installmentId,
        suggestion: 'Verifica que el acuerdo y la cuota existen en la base de datos'
      });
      throw new Error(errorMsg);
    }

    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de pagos', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al crear preferencia de pago de cuota', error, context);
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
