
// Cache simple para almacenar las infracciones consultadas
let infraccionesData: any[] | null = null;

/**
 * Guarda las infracciones en el cache local.
 * @param {Array} infracciones - Lista de infracciones
 */
export function setInfracciones(infracciones: any[]): void {
  infraccionesData = infracciones;
}

/**
 * Obtiene las infracciones almacenadas en el cache.
 * @returns {Array|null} - Lista de infracciones o null si no hay datos
 */
export function getInfracciones(): any[] | null {
  return infraccionesData;
}
