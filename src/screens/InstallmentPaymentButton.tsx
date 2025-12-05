/**
 * Componente de botón de pago para cuotas de acuerdos de pago con MercadoPago
 * Permite a los usuarios pagar cuotas de acuerdos mediante MercadoPago
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { usePayment } from '../hooks/usePayment';

interface InstallmentPaymentButtonProps {
  /** ID del acuerdo de pago */
  agreementId: number;
  /** ID de la cuota a pagar */
  installmentId: number;
  /** Monto de la cuota en pesos colombianos */
  amount: number;
  /** Si el botón está deshabilitado */
  disabled?: boolean;
  /** Callback cuando se inicia el pago */
  onPaymentInitiated?: () => void;
  /** Callback cuando se completa el pago (se abre la URL) */
  onPaymentCompleted?: () => void;
}

/**
 * Botón para iniciar un pago de cuota de acuerdo con MercadoPago
 *
 * @example
 * ```tsx
 * <InstallmentPaymentButton
 *   agreementId={123}
 *   installmentId={456}
 *   amount={50000}
 *   onPaymentCompleted={() => console.log('Pago de cuota iniciado')}
 * />
 * ```
 */
export const InstallmentPaymentButton: React.FC<InstallmentPaymentButtonProps> = ({
  agreementId,
  installmentId,
  amount,
  disabled = false,
  onPaymentInitiated,
  onPaymentCompleted,
}) => {
  const { loading, initiateInstallmentPayment } = usePayment();

  const handlePayment = async () => {
    console.log('🔵 [InstallmentPaymentButton] Botón clickeado');
    console.log('🔵 [InstallmentPaymentButton] agreementId:', agreementId);
    console.log('🔵 [InstallmentPaymentButton] installmentId:', installmentId);
    console.log('🔵 [InstallmentPaymentButton] amount:', amount);

    try {
      console.log('🔵 [InstallmentPaymentButton] Llamando onPaymentInitiated');
      onPaymentInitiated?.();

      console.log('🔵 [InstallmentPaymentButton] Llamando initiateInstallmentPayment');
      const result = await initiateInstallmentPayment(agreementId, installmentId);
      console.log('🔵 [InstallmentPaymentButton] Resultado:', result);

      if (result) {
        console.log('🔵 [InstallmentPaymentButton] Pago exitoso, llamando onPaymentCompleted');
        onPaymentCompleted?.();
      } else {
        console.log('🔵 [InstallmentPaymentButton] No se recibió resultado');
      }
    } catch (error) {
      // Los errores ya son manejados por el hook usePayment
      // que muestra alertas al usuario
      console.error('❌ [InstallmentPaymentButton] Error en el proceso de pago de cuota:', error);
    }
  };

  const isDisabled = disabled || loading || !agreementId || agreementId <= 0 || !installmentId || installmentId <= 0;

  console.log('🔵 [InstallmentPaymentButton] Render - isDisabled:', isDisabled, {
    disabled,
    loading,
    agreementId,
    installmentId,
    validAgreementId: agreementId > 0,
    validInstallmentId: installmentId > 0,
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled
      ]}
      onPress={handlePayment}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={`Pagar cuota de ${amount.toLocaleString('es-CO')} pesos colombianos con MercadoPago`}
      accessibilityHint="Abre MercadoPago para completar el pago de la cuota"
      accessibilityRole="button"
    >
      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator color="#fff" size="small" />
          <Text style={styles.loadingText}>Procesando...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.buttonText}>Pagar Cuota con MercadoPago</Text>
          <Text style={styles.amountText}>
            ${amount.toLocaleString('es-CO')} COP
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#009EE3', // Color oficial de MercadoPago
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 56, // Tamaño mínimo para accesibilidad
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
    elevation: 0,
    shadowOpacity: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
});
