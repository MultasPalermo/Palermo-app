import { MutableRefObject } from 'react';

// Document types
export type TipoDocumento = 'CC' | 'CE' | 'TI' | 'PAS' | '';

// Hook return types
export interface UseInactivityReturn {
  resetTimer: () => void;
  stopTimer: () => void;
}

export interface UseMultasReturn {
  tipoDocumento: TipoDocumento;
  setTipoDocumento: (tipo: TipoDocumento) => void;
  numeroDocumento: string;
  setNumeroDocumento: (numero: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  showTermsModal: boolean;
  setShowTermsModal: (show: boolean) => void;
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  handleConsultarMultas: () => Promise<void>;
  resetTimer: () => void;
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
}

export interface UsePaymentReturn {
  loading: boolean;
  error: string | null;
  initiatePayment: (userInfractionId: number, amount: number) => Promise<void>;
}

// Payment Agreements
export interface PaymentAgreement {
  id: string | number;
  personName?: string;
  documentNumber?: string;
  phoneNumber?: string;
  address?: string;
  neighborhood?: string;
  typeFine?: string;
  infringement?: string;
  agreementStart?: string;
  agreementEnd?: string;
  paymentMethod?: string;
  installments?: number;
  baseAmount?: number;
  monthlyFee?: number;
  outstandingAmount?: number;
  isCoactive?: boolean;
  isPaid?: boolean;
  [key: string]: any;
}

export interface ExpandedItems {
  [key: string]: boolean;
}

export interface UsePaymentAgreementsReturn {
  loading: boolean;
  agreementsData: PaymentAgreement[];
  filteredData: PaymentAgreement[];
  query: string;
  setQuery: (query: string) => void;
  expandedItems: ExpandedItems;
  toggleExpanded: (id: string | number) => void;
  fetchPaymentAgreements: () => Promise<void>;
  resetTimer: () => void;
  formatCurrency: (value: number | string | undefined) => string;
  formatDate: (dateString: string | undefined) => string;
}
