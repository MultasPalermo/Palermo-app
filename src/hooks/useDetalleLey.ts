import { useMemo } from 'react';
import useInactivity from './useInactivity';

interface LeyInput {
  descripcion?: string;
  textoCompleto?: string;
  multa?: string | null;
  articulos?: string | null;
  [key: string]: any;
}

interface LeyProcessed extends LeyInput {
  descripcion: string;
  textoCompleto: string;
  multa: string | null;
  articulos: string | null;
}

interface UseDetalleLeyReturn {
  ley: LeyProcessed | null;
  resetTimer: () => void;
  stopTimer: () => void;
}

export default function useDetalleLey(
  navigation: any,
  leyFromRoute: LeyInput | null | undefined
): UseDetalleLeyReturn {
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Bienvenida', 10000);

  const ley = useMemo(() => {
    if (!leyFromRoute) return null;

    // Pasar algunos formatos básicos si fueran necesarios
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
