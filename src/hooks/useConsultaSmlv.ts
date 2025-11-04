import { useState } from 'react';
import useInactivity from './useInactivity';

interface Multa {
  id: number;
  nombre: string;
  smdlv: number;
}

const defaultMultas: Multa[] = [
  { id: 1, nombre: 'Multa Tipo 1', smdlv: 2 },
  { id: 2, nombre: 'Multa Tipo 2', smdlv: 4 },
  { id: 3, nombre: 'Multa Tipo 3', smdlv: 3 },
  { id: 4, nombre: 'Multa Tipo 4', smdlv: 16 },
];

interface UseConsultaSmlvReturn {
  multas: Multa[];
  resetTimer: () => void;
}

export default function useConsultaSmlv(navigation: any): UseConsultaSmlvReturn {
  const [multas] = useState<Multa[]>(defaultMultas);
  const { resetTimer } = useInactivity(navigation, 'Bienvenida');
  return { multas, resetTimer };
}
