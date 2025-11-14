/**
 * Componente de botón de pago para MercadoPago
 * Permite a los usuarios pagar infracciones mediante MercadoPago
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { usePayment } from '../hooks/usePayment';

interface PaymentButtonProps {
  /** ID de la infracción del usuario a pagar */
  userInfractionId: number;
  /** Monto a pagar en pesos colombianos */
  amount: number;
  /** Si el botón está deshabilitado */
  disabled?: boolean;
  /** Callback cuando se inicia el pago */
  onPaymentInitiated?: () => void;
  /** Callback cuando se completa el pago (se abre la URL) */
  onPaymentCompleted?: () => void;
  /** true para usar sandbox (pruebas), false para producción */
  useSandbox?: boolean;
}

/**
 * Botón para iniciar un pago con MercadoPago
 *
 * @example
 * ```tsx
 * <PaymentButton
 *   userInfractionId={123}
 *   amount={50000}
 *   useSandbox={true}
 *   onPaymentCompleted={() => console.log('Pago iniciado')}
 * />
 * ```
 */
export const PaymentButton: React.FC<PaymentButtonProps> = ({
  userInfractionId,
  amount,
  disabled = false,
  onPaymentInitiated,
  onPaymentCompleted,
  useSandbox = true,
}) => {
  const { loading, initiatePayment } = usePayment();

  const handlePayment = async () => {
    try {
      onPaymentInitiated?.();

      const result = await initiatePayment(userInfractionId, useSandbox);

      if (result) {
        onPaymentCompleted?.();
      }
    } catch (error) {
      // Los errores ya son manejados por el hook usePayment
      // que muestra alertas al usuario
      console.error('Error en el proceso de pago:', error);
    }
  };

  const isDisabled = disabled || loading || !userInfractionId || userInfractionId <= 0;

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
      accessibilityLabel={`Pagar ${amount.toLocaleString('es-CO')} pesos colombianos con MercadoPago`}
      accessibilityHint="Abre MercadoPago para completar el pago"
      accessibilityRole="button"
    >
      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator color="#fff" size="small" />
          <Text style={styles.loadingText}>Procesando...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.buttonText}>Pagar con MercadoPago</Text>
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
