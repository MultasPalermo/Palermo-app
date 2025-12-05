import { useState, useRef, useEffect, useCallback } from 'react';
import { getInfracciones } from '../api/infractionCache';
import { getUser, getDocumentInfo } from '../api/userCache';
import { RootNavigationProp, MultasResultadoRouteProp } from '../types/navigation';
import { formatCurrency } from '../utils/formatters';

interface Multa {
  id?: string | number;
  value?: number;
  amount?: number;
  total?: number;
  typeInfractionName?: string;
  observations?: string;
  userName?: string;
  user?: {
    userName?: string;
  };
  [key: string]: any;
}

interface Resumen {
  count: number;
  total: number;
}

interface UseMultasResultadoReturn {
  displayName: string;
  docNumber: string;
  query: string;
  setQuery: (query: string) => void;
  onQueryChange: (text: string) => void;
  filteredMultas: Multa[];
  setFilteredMultas: (multas: Multa[]) => void;
  selectedIds: (string | number)[];
  toggleSelect: (id: string | number) => void;
  resetTimer: () => void;
  formatCurrency: (value: number | string | null | undefined) => string;
  resumen: (items?: Multa[]) => Resumen;
}

// Hook para encapsular lógica de FinesResultScreen
export default function useFinesResult(
  navigation: RootNavigationProp,
  route: MultasResultadoRouteProp
): UseMultasResultadoReturn {
  const multasInitial = route?.params?.multas || getInfracciones() || [];
  const cachedUser = getUser();
  const cachedDoc = getDocumentInfo();

  const displayName = cachedUser?.userName || `${cachedUser?.firstName || ''} ${cachedUser?.lastName || ''}`.trim();
  const docNumber = cachedDoc?.numeroDocumento || cachedDoc?.documentNumber || '';

  const [query, setQuery] = useState<string>('');
  const [filteredMultas, setFilteredMultas] = useState<Multa[]>(multasInitial || []);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFilteredMultas(multasInitial || []);
  }, [multasInitial]);

  const showInactivityAlert = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }, [navigation]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      showInactivityAlert();
    }, 300000);
  }, [showInactivityAlert]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resetTimer]);

  const toggleSelect = (id: string | number) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const resumen = (items: Multa[] = []): Resumen => {
    const lista = items || [];
    const total = lista.reduce((acc, it) => {
      const price = Number(it.value ?? it.amount ?? it.total ?? 0);
      acc += isNaN(price) ? 0 : price;
      return acc;
    }, 0);
    return { count: lista.length, total };
  };

  const onQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = String(text || '').trim().toLowerCase();
      if (!q) return setFilteredMultas(multasInitial || []);
      const filtered = (multasInitial || []).filter((m: Multa) => {
        const tipo = String(m?.typeInfractionName || '').toLowerCase();
        const obs = String(m?.observations || '').toLowerCase();
        const uname = String(m?.userName || m?.user?.userName || '').toLowerCase();
        return tipo.includes(q) || obs.includes(q) || uname.includes(q);
      });
      setFilteredMultas(filtered);
    }, 150);
  };

  return {
    displayName,
    docNumber,
    query,
    setQuery,
    onQueryChange,
    filteredMultas,
    setFilteredMultas,
    selectedIds,
    toggleSelect,
    resetTimer,
    formatCurrency,
    resumen,
  };
}
