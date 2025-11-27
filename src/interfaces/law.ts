export interface LawInput {
  id?: number;
  titulo?: string;
  descripcion?: string;
  textoCompleto?: string;
  multa?: string | null;
  articulos?: string | null;
  [key: string]: any;
}

export interface LawProcessed extends LawInput {
  descripcion: string;
  textoCompleto: string;
  multa: string | null;
  articulos: string | null;
}

export interface UseLawDetailReturn {
  ley: LawProcessed | null;
  resetTimer: () => void;
  stopTimer: () => void;
}
