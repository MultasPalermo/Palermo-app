import { useState, useMemo } from 'react';
import { coexistenceLaws } from '../data/coexistenceLaws';
import { UseCoexistenceCodeReturn } from '../interfaces/coexistence';
import useInactivity from './useInactivity';

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
