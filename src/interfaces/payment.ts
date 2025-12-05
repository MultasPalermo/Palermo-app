/**
 * Interfaces para pagos y transacciones de MercadoPago
 */

/**
 * Respuesta de creación de preferencia de pago
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

/**
 * Estado de un pago
 */
export interface PaymentStatus {
  id: number;
  amount: number;
  status: 'Pending' | 'Approved' | 'InProcess' | 'Rejected' | 'Cancelled' | 'Refunded';
  statusDescription: string;
  paidAt?: string | null;
  mercadoPagoPaymentId?: number | null;
  paymentMethod?: string | null;
  infraction: {
    id: number;
    stateInfraction: string;
    description: string;
  };
}

/**
 * Pago de usuario
 */
export interface UserPayment {
  id: number;
  amount: number;
  status: string;
  paidAt?: string | null;
  paymentMethod?: string | null;
  created_date: string;
  infraction: {
    id: number;
    description: string;
    dateInfraction: string;
  };
}

/**
 * Respuesta de health check del sistema de pagos
 */
export interface PaymentHealthResponse {
  status: string;
  database: string;
  paymentsTable: string;
  paymentsCount: number;
  mercadoPago: string;
  timestamp: string;
}
