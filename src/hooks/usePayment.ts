/**
 * Hook personalizado para manejar pagos con MercadoPago
 * Gestiona el ciclo completo: crear preferencia, abrir URL y verificar estado
 */

import { useState, useCallback } from 'react';
import { Linking, Alert } from 'react-native';
import {
  createPaymentPreference,
  createAgreementInstallmentPayment,
  getPaymentStatus,
} from '../api/paymentApi';
import type {
  PaymentPreferenceResponse,
  PaymentStatus,
} from '../interfaces';
import { logDebug, logError } from '../utils/logger';
import { NetworkError, ValidationError } from '../utils/errorHandler';

interface UsePaymentReturn {
  loading: boolean;
  error: string | null;
  paymentData: PaymentPreferenceResponse | null;
  initiatePayment: (userInfractionId: number) => Promise<PaymentPreferenceResponse | null>;
  initiateInstallmentPayment: (agreementId: number, installmentId: number) => Promise<PaymentPreferenceResponse | null>;
  checkStatus: (paymentId: number) => Promise<PaymentStatus | null>;
  reset: () => void;
}

/**
 * Hook para gestionar pagos de infracciones y cuotas de acuerdos con MercadoPago
 *
 * @returns {UsePaymentReturn} Funciones y estado para manejar pagos
 *
 * @example
 * ```tsx
 * const { loading, error, initiatePayment, initiateInstallmentPayment, checkStatus } = usePayment();
 *
 * // Pagar una infracción
 * const handleInfractionPay = async () => {
 *   const result = await initiatePayment(infractionId);
 *   if (result) {
 *     console.log('Pago iniciado:', result.preferenceId);
 *     console.log('Monto:', result.amount, result.currency);
 *   }
 * };
 *
 * // Pagar una cuota de acuerdo
 * const handleInstallmentPay = async () => {
 *   const result = await initiateInstallmentPayment(agreementId, installmentId);
 *   if (result) {
 *     console.log('Pago de cuota iniciado:', result.preferenceId);
 *   }
 * };
 * ```
 */
export const usePayment = (): UsePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentPreferenceResponse | null>(null);

  const context = { component: 'usePayment' };

  /**
   * Iniciar proceso de pago
   * 1. Crea preferencia de pago en el servidor
   * 2. Abre la URL de MercadoPago en el navegador
   * 3. Opcionalmente verifica el estado después de un tiempo
   *
   * @param {number} userInfractionId - ID de la infracción a pagar
   * @returns {Promise<PaymentPreferenceResponse | null>} Datos de la preferencia o null si falla
   */
  const initiatePayment = useCallback(async (
    userInfractionId: number
  ): Promise<PaymentPreferenceResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      logDebug('Iniciando proceso de pago', { ...context, userInfractionId });

      // Validar parámetros
      if (!userInfractionId || userInfractionId <= 0) {
        throw new ValidationError('ID de infracción inválido');
      }

      // 1. Crear preferencia de pago
      const response = await createPaymentPreference(userInfractionId);
      setPaymentData(response);

      // 2. Abrir MercadoPago
      const paymentUrl = response.initPoint;

      logDebug('Abriendo URL de pago', { ...context, paymentUrl });

      const canOpen = await Linking.canOpenURL(paymentUrl);

      if (!canOpen) {
        throw new Error('No se puede abrir la URL de pago. Verifica los permisos de la aplicación.');
      }

      await Linking.openURL(paymentUrl);

      logDebug('URL de pago abierta exitosamente', { ...context, paymentId: response.paymentId });

      // 3. No verificamos automáticamente - mejor que el usuario lo haga manualmente
      // o usar un webhook del backend
      return response;

    } catch (err: any) {
      let errorMessage = 'Error al procesar el pago';
      let alertTitle = 'Error en el pago';

      if (err instanceof NetworkError) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err.message && err.message.includes('no ha sido implementado')) {
        // Error 404 - Endpoint no implementado
        alertTitle = 'Servicio no disponible';
        errorMessage = 'La funcionalidad de pagos en línea aún no está disponible. Por favor, contacta al administrador del sistema o realiza el pago por otros medios.';
        logError('Endpoint de pagos no implementado', err, { 
          ...context, 
          userInfractionId,
          action: 'Notificar al equipo de backend para implementar el endpoint'
        });
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      logError('Error al iniciar pago', err, { ...context, userInfractionId });

      Alert.alert(alertTitle, errorMessage, [{ text: 'Entendido' }]);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Iniciar proceso de pago para una cuota de acuerdo de pago
   * 1. Crea preferencia de pago en el servidor
   * 2. Abre la URL de MercadoPago en el navegador
   *
   * @param {number} agreementId - ID del acuerdo de pago
   * @param {number} installmentId - ID de la cuota a pagar
   * @returns {Promise<PaymentPreferenceResponse | null>} Datos de la preferencia o null si falla
   */
  const initiateInstallmentPayment = useCallback(async (
    agreementId: number,
    installmentId: number
  ): Promise<PaymentPreferenceResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      logDebug('Iniciando proceso de pago de cuota', { ...context, agreementId, installmentId });

      // Validar parámetros
      if (!agreementId || agreementId <= 0) {
        throw new ValidationError('ID de acuerdo inválido');
      }

      if (!installmentId || installmentId <= 0) {
        throw new ValidationError('ID de cuota inválido');
      }

      // 1. Crear preferencia de pago
      const response = await createAgreementInstallmentPayment(agreementId, installmentId);
      setPaymentData(response);

      // 2. Abrir MercadoPago
      const paymentUrl = response.initPoint;

      logDebug('Abriendo URL de pago de cuota', { ...context, paymentUrl });

      const canOpen = await Linking.canOpenURL(paymentUrl);

      if (!canOpen) {
        throw new Error('No se puede abrir la URL de pago. Verifica los permisos de la aplicación.');
      }

      await Linking.openURL(paymentUrl);

      logDebug('URL de pago de cuota abierta exitosamente', { ...context, paymentId: response.paymentId });

      return response;

    } catch (err: any) {
      let errorMessage = 'Error al procesar el pago de la cuota';
      let alertTitle = 'Error en el pago';

      if (err instanceof NetworkError) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err.message && err.message.includes('no ha sido implementado')) {
        alertTitle = 'Servicio no disponible';
        errorMessage = 'La funcionalidad de pagos en línea aún no está disponible. Por favor, contacta al administrador del sistema o realiza el pago por otros medios.';
        logError('Endpoint de pagos de cuota no implementado', err, {
          ...context,
          agreementId,
          installmentId,
          action: 'Notificar al equipo de backend para implementar el endpoint'
        });
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      logError('Error al iniciar pago de cuota', err, { ...context, agreementId, installmentId });

      Alert.alert(alertTitle, errorMessage, [{ text: 'Entendido' }]);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verificar estado del pago
   * Consulta el estado actual de un pago y muestra alertas según el resultado
   *
   * @param {number} paymentId - ID del pago a verificar
   * @returns {Promise<PaymentStatus | null>} Estado del pago o null si falla
   */
  const checkStatus = useCallback(async (paymentId: number): Promise<PaymentStatus | null> => {
    try {
      logDebug('Verificando estado del pago', { ...context, paymentId });

      if (!paymentId || paymentId <= 0) {
        throw new ValidationError('ID de pago inválido');
      }

      const status = await getPaymentStatus(paymentId);

      // Mostrar alertas según el estado
      switch (status.status) {
        case 'Approved':
          Alert.alert(
            'Pago Exitoso',
            'Tu pago ha sido aprobado correctamente.',
            [{ text: 'Excelente' }]
          );
          break;

        case 'Rejected':
          Alert.alert(
            'Pago Rechazado',
            status.statusDescription || 'Tu pago fue rechazado. Por favor, intenta nuevamente con otro método de pago.',
            [{ text: 'Entendido' }]
          );
          break;

        case 'Pending':
          Alert.alert(
            'Pago Pendiente',
            'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
            [{ text: 'OK' }]
          );
          break;

        case 'InProcess':
          Alert.alert(
            'Pago en Proceso',
            'Tu pago está en proceso de verificación.',
            [{ text: 'OK' }]
          );
          break;

        case 'Cancelled':
          Alert.alert(
            'Pago Cancelado',
            'El pago fue cancelado.',
            [{ text: 'OK' }]
          );
          break;

        case 'Refunded':
          Alert.alert(
            'Pago Reembolsado',
            'El pago fue reembolsado a tu cuenta.',
            [{ text: 'OK' }]
          );
          break;

        default:
          logDebug('Estado de pago desconocido', { ...context, status: status.status });
      }

      return status;
    } catch (err: any) {
      logError('Error al verificar estado del pago', err, { ...context, paymentId });

      if (err instanceof ValidationError) {
        Alert.alert('Error', err.message, [{ text: 'OK' }]);
      }
      // No mostramos alert para otros errores de red, solo logueamos
      return null;
    }
  }, []);

  /**
   * Limpiar estado del hook
   * Útil para resetear después de completar un pago o cancelar
   */
  const reset = useCallback(() => {
    setPaymentData(null);
    setError(null);
    setLoading(false);
    logDebug('Estado de pago reseteado', context);
  }, []);

  return {
    loading,
    error,
    paymentData,
    initiatePayment,
    initiateInstallmentPayment,
    checkStatus,
    reset,
  };
};
