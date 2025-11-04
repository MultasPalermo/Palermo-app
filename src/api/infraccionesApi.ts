
// Módulo para consumir la API de infracciones
import apiClient from './apiClient';
import { getApiHost } from './config';

// Ruta base relativa; apiClient añadirá el host.
const API_PATH = '/api/UserInfraction';

interface ConsultarInfraccionesOptions {
  documentTypeId?: string | number;
  documentNumber?: string | number;
}

/**
 * Consulta infracciones. Si se pasan documentTypeId y documentNumber, se incluyen como filtros en la query
 * (si el backend los soporta) — en caso contrario, la función aún intentará solicitar datos más limitados.
 * @param {Object} options - { documentTypeId, documentNumber }
 * @returns {Promise<Array>} - Lista de infracciones
 */
export async function consultarInfracciones(options: ConsultarInfraccionesOptions = {}): Promise<any[]> {
  try {
    // Construir parámetros: si el backend soporta filtros por documento, pasar aquí
    const params: Record<string, any> = {};
    if (options.documentTypeId) params.documentTypeId = options.documentTypeId;
    if (options.documentNumber) params.documentNumber = options.documentNumber;
    // Fallback: si no hay filtros, intentar pedir paginación o tipo getAllType
    if (Object.keys(params).length === 0) {
      params.getAllType = 'GetAll';
    }

    const result = await apiClient.apiFetch(API_PATH, { params });
    // El apiFetch ya parsea JSON; soportar array directo o { data }
    return Array.isArray(result) ? result : result?.data ?? [];
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      throw new Error('No se pudo conectar con el servidor de infracciones. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
