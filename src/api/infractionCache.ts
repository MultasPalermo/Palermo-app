import { InfraccionAPI } from '../types/api';

// Cache simple para almacenar las infracciones consultadas
let infraccionesData: InfraccionAPI[] | null = null;

/**
 * Guarda las infracciones en el cache local.
 * @param {Array} infracciones - Lista de infracciones
 */
export function setInfracciones(infracciones: InfraccionAPI[]): void {
  infraccionesData = infracciones;
}

/**
 * Obtiene las infracciones almacenadas en el cache.
 * @returns {Array|null} - Lista de infracciones o null si no hay datos
 */
export function getInfracciones(): InfraccionAPI[] | null {
  return infraccionesData;
}
