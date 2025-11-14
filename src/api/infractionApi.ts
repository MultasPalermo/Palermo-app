
// Módulo para consumir la API de infracciones
import apiClient from './apiClient';
import { InfraccionAPI, ConsultarInfraccionesParams } from '../types/api';
import { InfraccionListSchema, InfraccionAPISchema, safeValidateData } from '../validation/schemas';
import { logDebug, logError, logWarn } from '../utils/logger';
import { NetworkError } from '../utils/errorHandler';

// Ruta base relativa; apiClient añadirá el host.
const API_PATH = '/api/UserInfraction';

/**
 * Consulta infracciones de usuarios desde el backend
 * Valida todos los datos con Zod y filtra elementos inválidos
 *
 * @param {ConsultarInfraccionesParams} options - Parámetros de filtro opcionales
 * @param {string | number} options.documentTypeId - ID del tipo de documento
 * @param {string | number} options.documentNumber - Número de documento
 * @returns {Promise<InfraccionAPI[]>} Lista de infracciones validadas
 * @throws {NetworkError} Si no se puede conectar con el servidor
 *
 * @example
 * ```ts
 * // Consultar todas las infracciones
 * const todasLasInfracciones = await consultarInfracciones();
 *
 * // Consultar infracciones de un usuario específico
 * const infraccionesUsuario = await consultarInfracciones({
 *   documentTypeId: 1,
 *   documentNumber: '123456789'
 * });
 * ```
 */
export async function consultarInfracciones(options: ConsultarInfraccionesParams = {}): Promise<InfraccionAPI[]> {
  const context = { component: 'infraccionesApi', function: 'consultarInfracciones' };

  try {
    logDebug('Consultando infracciones', { ...context, params: options });

    const params: Record<string, string | number> = {};
    if (options.documentTypeId) params.documentTypeId = options.documentTypeId;
    if (options.documentNumber) params.documentNumber = options.documentNumber;
    if (Object.keys(params).length === 0) {
      params.getAllType = 'GetAll';
    }

    const result = await apiClient.apiFetch(API_PATH, { params });
    const rawData = Array.isArray(result) ? result : result?.data ?? [];

    const validation = safeValidateData(InfraccionListSchema, rawData);

    if (!validation.success) {
      logWarn('Algunas infracciones no cumplen con el esquema esperado', { ...context, errors: validation.error.issues });
      if (Array.isArray(rawData)) {
        const validItems = rawData.filter(item => {
          const itemValidation = safeValidateData(InfraccionAPISchema, item);
          return itemValidation.success;
        });
        logDebug(`Filtradas ${validItems.length}/${rawData.length} infracciones válidas`, context);
        return validItems;
      }
      return [];
    }

    logDebug(`${validation.data.length} infracciones consultadas exitosamente`, context);
    return validation.data;
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de infracciones', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al consultar infracciones', error, context);
    throw error;
  }
}
