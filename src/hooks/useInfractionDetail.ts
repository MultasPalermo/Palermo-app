import { useMemo } from 'react';
import useInactivity from './useInactivity';
import { RootNavigationProp } from '../types/navigation';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  InfraccionInput,
  UseInfractionDetailReturn
} from '../interfaces/infraction';

// Hook para encapsular lógica mínima de InfractionDetail
export default function useInfractionDetail(
  navigation: RootNavigationProp,
  infraccionFromRoute: InfraccionInput | null | undefined
): UseInfractionDetailReturn {
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
          {
            icon: 'information-circle-outline',
            texto: 'Número de comparendo',
            valor: String(infraccionFromRoute.number || infraccionFromRoute.id || '-')
          },
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
