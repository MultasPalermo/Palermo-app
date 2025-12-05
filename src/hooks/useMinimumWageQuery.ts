import { useState } from 'react';
import useInactivity from './useInactivity';
import type { MultaSmdlv, UseConsultaSmlvReturn } from '../interfaces/minimumWage';

const defaultMultas: MultaSmdlv[] = [
  { id: '1', nombre: 'Multa Tipo 1', smdlv: 2 },
  { id: '2', nombre: 'Multa Tipo 2', smdlv: 4 },
  { id: '3', nombre: 'Multa Tipo 3', smdlv: 3 },
  { id: '4', nombre: 'Multa Tipo 4', smdlv: 16 },
];

export default function useMinimumWageQuery(navigation: any): UseConsultaSmlvReturn {
  const [multas] = useState<MultaSmdlv[]>(defaultMultas);
  const { resetTimer } = useInactivity(navigation, 'Welcome');
  return { multas, resetTimer };
}
