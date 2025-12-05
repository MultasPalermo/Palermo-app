import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUser, getDocumentInfo } from '../api/userCache';
import { fetchPaymentAgreementsByDocument } from '../api/paymentAgreementApi';

interface PaymentAgreement {
  id: string | number;
  personName?: string;
  documentNumber?: string;
  document?: string;
  typeFine?: string;
  infringement?: string;
  [key: string]: any;
}

interface ExpandedItems {
  [key: string]: boolean;
  [key: number]: boolean;
}

interface UsePaymentAgreementsReturn {
  loading: boolean;
  agreementsData: PaymentAgreement[];
  filteredData: PaymentAgreement[];
  query: string;
  setQuery: (query: string) => void;
  expandedItems: ExpandedItems;
  toggleExpanded: (agreementId: string | number) => void;
  fetchPaymentAgreements: () => Promise<void>;
  resetTimer: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string | null | undefined) => string;
}

export default function usePaymentAgreements(navigation: any): UsePaymentAgreementsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [agreementsData, setAgreementsData] = useState<PaymentAgreement[]>([]);
  const [filteredData, setFilteredData] = useState<PaymentAgreement[]>([]);
  const [query, setQuery] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPaymentAgreements = useCallback(async () => {
    setLoading(true);
    try {
      const user = getUser();
      const docInfo = getDocumentInfo();
      const userDocumentNumber = docInfo?.numeroDocumento || docInfo?.documentNumber || user?.documentNumber;

      if (!userDocumentNumber) {
        Alert.alert('Error', 'No se encontró información del usuario. Por favor, realice una consulta de multas primero.');
        setLoading(false);
        return;
      }

      const userAgreements = await fetchPaymentAgreementsByDocument(userDocumentNumber);
      setAgreementsData(userAgreements);
      setFilteredData(userAgreements);
    } catch (err: any) {
      Alert.alert('Error', `No se pudieron cargar los acuerdos de pago: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleExpanded = useCallback((agreementId: string | number) => {
    setExpandedItems(prev => ({ ...prev, [agreementId]: !prev[agreementId] }));
  }, []);

  useEffect(() => {
    fetchPaymentAgreements();
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fetchPaymentAgreements]);

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = String(query || '').trim().toLowerCase();
      if (!q) {
        setFilteredData(agreementsData);
        return;
      }

      const filtered = agreementsData.filter((item: PaymentAgreement) => {
        const personName = String(item.personName || '').toLowerCase();
        const documentNumber = String(item.documentNumber || item.document || '').toLowerCase();
        const typeFine = String(item.typeFine || '').toLowerCase();
        const infringement = String(item.infringement || '').toLowerCase();
        const agreementId = String(item.id || '').toLowerCase();

        return (
          personName.includes(q) ||
          documentNumber.includes(q) ||
          typeFine.includes(q) ||
          infringement.includes(q) ||
          agreementId.includes(q)
        );
      });

      setFilteredData(filtered);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, agreementsData]);

  useEffect(() => {
    // keep timer active when screen gains focus via navigation
    const unsubscribe = navigation?.addListener?.('focus', () => {
      resetTimer();
    });
    return () => unsubscribe && unsubscribe();
  }, [navigation]);

  const showInactivityAlert = useCallback(() => {
    Alert.alert(
      'Inactividad',
      '¿Deseas continuar en la sesión o cerrar sesión por inactividad?',
      [
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
          },
        },
        {
          text: 'Seguir en la sesión',
          style: 'cancel',
          onPress: () => {
            resetTimer();
          },
        },
      ]
    );
  }, [navigation]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(showInactivityAlert, 300000); // 5 minutos
  }, [showInactivityAlert]);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString: string | null | undefined): string => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  return {
    loading,
    agreementsData,
    filteredData,
    query,
    setQuery,
    expandedItems,
    toggleExpanded,
    fetchPaymentAgreements,
    resetTimer,
    formatCurrency,
    formatDate,
  };
}
