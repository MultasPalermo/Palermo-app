import { useState, useMemo } from 'react';
import { coexistenceLaws, type Ley } from '../data/coexistenceLaws';
import useInactivity from './useInactivity';

interface UseCoexistenceCodeReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredLeyes: Ley[];
  resetTimer: () => void;
}

export default function useCoexistenceCode(navigation: any): UseCoexistenceCodeReturn {
  const [query, setQuery] = useState<string>('');

  const { resetTimer } = useInactivity(navigation, 'Welcome');

  const filteredLeyes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return coexistenceLaws;
    }

    return coexistenceLaws.filter((ley) =>
      ley.titulo.toLowerCase().includes(normalizedQuery) ||
      ley.descripcion.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return {
    query,
    setQuery,
    filteredLeyes,
    resetTimer
  };
}
