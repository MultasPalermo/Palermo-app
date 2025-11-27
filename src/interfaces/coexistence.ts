export interface Ley {
  id: string;
  titulo: string;
  descripcion: string;
  textoCompleto: string;
  multa: string;
  articulos: string;
}

export interface UseCoexistenceCodeReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredLeyes: Ley[];
  resetTimer: () => void;
}
