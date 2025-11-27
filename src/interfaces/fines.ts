// Multa/Fine interfaces
export interface Multa {
  id: string;
  nombre: string;
  smdlv: number;
  descripcion?: string;
  monto?: number;
  valor?: number;
}

export interface Resumen {
  totalMultas: number;
  totalPagar: number;
}

export interface UseMultasResultadoReturn {
  multas: any[];
  resumen: Resumen;
  resetTimer: () => void;
}
