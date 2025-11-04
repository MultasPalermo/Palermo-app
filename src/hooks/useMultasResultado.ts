import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { getInfracciones } from '../api/infraccionesCache';
import { getUser, getDocumentInfo } from '../api/userCache';

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

interface RouteParams {
  multas?: Multa[];
  userName?: string;
  numeroDocumento?: string;
  documentNumber?: string;
}

interface Route {
  params?: RouteParams;
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

// Hook para encapsular lógica de MultasResultadoScreen
export default function useMultasResultado(
  navigation: any,
  route: Route
): UseMultasResultadoReturn {
  const multasInitial = route?.params?.multas || getInfracciones() || [];
  const cachedUser = getUser();
  const cachedDoc = getDocumentInfo();

  const displayName = route?.params?.userName || cachedUser?.userName || `${cachedUser?.firstName || ''} ${cachedUser?.lastName || ''}`.trim();
  const docNumber = route?.params?.numeroDocumento || route?.params?.documentNumber || cachedDoc?.numeroDocumento || cachedDoc?.documentNumber || '';

  const [query, setQuery] = useState<string>('');
  const [filteredMultas, setFilteredMultas] = useState<Multa[]>(multasInitial || []);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFilteredMultas(multasInitial || []);
  }, [multasInitial]);

  const showInactivityAlert = () => {
    // Reuse same UX as screens: reset to Bienvenida or keep session
    // Note: keep Alert call here to preserve UI surface
    // Importing Alert here would create a native dependency; instead call navigation.reset directly on timeout
    navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] });
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    // keep 5 minutos as original
    timerRef.current = setTimeout(() => {
      // show the alert by navigating to Bienvenida (keeps behavior consistent)
      showInactivityAlert();
    }, 300000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toggleSelect = (id: string | number) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const formatCurrency = (value: number | string | null | undefined): string => {
    const n = Number(value || 0);
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
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
