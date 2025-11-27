export interface LawInput {
  id?: number;
  titulo?: string;
  descripcion?: string;
  textoCompleto?: string;
  multa?: string;
  articulos?: string;
}

export interface LawProcessed extends LawInput {
  titulo: string;
  descripcion: string;
  textoCompleto: string;
  multa: string;
  articulos: string;
}

export interface UseLawDetailReturn {
  ley: LawProcessed | null;
  resetTimer: () => void;
}
