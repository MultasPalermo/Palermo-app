export interface Formatos {
  salarioTexto: string;
  calculoSmdlvTexto: string;
  valorSmdlvTexto: string;
  valorTotalTexto: string;
}

export interface UseDetalleSmlvReturn {
  SALARIO_MINIMO: number;
  SMLDV: number;
  smdlv: number;
  valorSmdlv: number;
  valorTotal: number;
  formatos: Formatos;
  resetTimer: () => void;
}

export interface UseConsultaSmlvReturn {
  multas: MultaSmdlv[];
  resetTimer: () => void;
}

export interface MultaSmdlv {
  id: string;
  nombre: string;
  smdlv: number;
}
