import { useMemo } from 'react';
import useInactivity from './useInactivity';
import type { LawInput, UseLawDetailReturn } from '../interfaces/law';

export default function useLawDetail(
  navigation: any,
  leyFromRoute: LawInput | null | undefined
): UseLawDetailReturn {
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Welcome', 10000);

  const ley = useMemo(() => {
    if (!leyFromRoute) return null;

    // Apply basic formatting if necessary
    return {
      ...leyFromRoute,
      descripcion: leyFromRoute.descripcion || '-',
      textoCompleto: leyFromRoute.textoCompleto || '-',
      multa: leyFromRoute.multa || null,
      articulos: leyFromRoute.articulos || null,
    };
  }, [leyFromRoute]);

  return { ley, resetTimer, stopTimer };
}
