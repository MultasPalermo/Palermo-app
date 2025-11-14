import { useMemo } from 'react';
import useInactivity from './useInactivity';
import { RootNavigationProp } from '../types/navigation';
import { formatCurrency, formatDate } from '../utils/formatters';

interface InfoMulta {
  icon: string;
  texto: string;
  valor: string;
}

interface InfraccionInput {
  typeInfractionName?: string;
  tipo?: string;
  type?: string;
  observations?: string;
  description?: string;
  descripcion?: string;
  valor?: number;
  amount?: number;
  amountToPay?: number;
  monto?: number;
  fechaMax?: string;
  dueDate?: string;
  fecha_max?: string;
  number?: string;
  id?: string;
  fecha?: string;
  date?: string;
  dateInfraction?: string;
  infoMulta?: InfoMulta[];
  [key: string]: any;
}

interface InfraccionProcessed extends Omit<InfraccionInput, 'monto' | 'fechaMax' | 'infoMulta'> {
  tipo: string;
  descripcion: string;
  fechaTexto: string;
  consulta: string;
  infoMulta: InfoMulta[];
  monto: string;
  fechaMax: string;
  valorTexto: string;
}

interface UseDetalleInfraccionReturn {
  infraccion: InfraccionProcessed | null;
  resetTimer: () => void;
  stopTimer: () => void;
}

// Hook para encapsular lógica mínima de InfractionDetail
export default function useInfractionDetail(
  navigation: RootNavigationProp,
  infraccionFromRoute: InfraccionInput | null | undefined
): UseDetalleInfraccionReturn {
  // Reuse the common inactivity hook (default timeout 10s like used elsewhere)
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Welcome', 10000);

  const infraccion = useMemo(() => {
    if (!infraccionFromRoute) return null;

    // Normalizar los campos para la pantalla
    const tipo = infraccionFromRoute.typeInfractionName || infraccionFromRoute.tipo || infraccionFromRoute.type || 'No especificado';
    const descripcion = infraccionFromRoute.observations || infraccionFromRoute.description || infraccionFromRoute.descripcion || '';
    const monto = formatCurrency(infraccionFromRoute.amountToPay ?? infraccionFromRoute.valor ?? infraccionFromRoute.amount ?? infraccionFromRoute.monto);
    const fechaMax = formatDate(infraccionFromRoute.fechaMax || infraccionFromRoute.dueDate || infraccionFromRoute.fecha_max);

    // Construir infoMulta si no existe
    const infoMulta = Array.isArray(infraccionFromRoute.infoMulta)
      ? infraccionFromRoute.infoMulta
      : [
          { icon: 'information-circle-outline', texto: 'Número de comparendo', valor: infraccionFromRoute.number || infraccionFromRoute.id || '-' },
        ];

    return {
      ...infraccionFromRoute,
      tipo,
      descripcion,
      fechaTexto: formatDate(infraccionFromRoute.fecha || infraccionFromRoute.date || infraccionFromRoute.dateInfraction),
      consulta: 'SMDLV',
      infoMulta,
      monto,
      fechaMax,
      valorTexto: monto,
    };
  }, [infraccionFromRoute]);

  return {
    infraccion,
    resetTimer,
    stopTimer,
  };
}
