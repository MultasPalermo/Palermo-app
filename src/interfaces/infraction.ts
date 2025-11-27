export interface InfoMulta {
  icon: string;
  texto: string;
  valor: string;
}

// Alias para compatibilidad con navigation types
export type FineInfoItem = InfoMulta;

export interface InfraccionInput {
  typeInfractionName?: string;
  tipo?: string;
  type?: string;
  observations?: string;
  description?: string;
  descripcion?: string;
  valor?: number;
  amount?: number;
  amountToPay?: number;
  monto?: string | number;
  fechaMax?: string;
  dueDate?: string;
  fecha_max?: string;
  number?: string;
  id?: string | number;
  fecha?: string;
  date?: string;
  dateInfraction?: string;
  infoMulta?: InfoMulta[];
  [key: string]: any;
}

export interface InfraccionProcessed {
  tipo: string;
  descripcion: string;
  fechaTexto: string;
  consulta: string;
  infoMulta: InfoMulta[];
  monto: string;
  fechaMax: string;
  valorTexto: string;
  [key: string]: any;
}

export interface UseInfractionDetailReturn {
  infraccion: InfraccionProcessed | null;
  resetTimer: () => void;
  stopTimer: () => void;
}

export interface InfraccionDisplay {
  tipo: string;
  descripcion: string;
  fechaTexto: string;
  consulta: string;
  infoMulta: InfoMulta[];
  monto: string;
}
