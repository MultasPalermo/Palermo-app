
import apiClient from './apiClient';
import { User } from '../types/api';
import { UserSchema, validateData } from '../validation/schemas';
import { logDebug, logError, logWarn } from '../utils/logger';
import { NetworkError, ValidationError } from '../utils/errorHandler';

const API_PATH = '/api/Users';

/**
 * Busca un usuario por tipo y número de documento.
 * Intentará usar filtros en el servidor cuando sea posible; si el backend
 * no soporta estos parámetros, se puede adaptar la función.
 * @param {string|number} documentTypeId
 * @param {string|number} documentNumber
 */
export async function buscarUsuarioPorDocumento(documentTypeId: string | number, documentNumber: string | number): Promise<User | null> {
  if (!documentTypeId || !documentNumber) return null;

  const context = { component: 'userApi', function: 'buscarUsuarioPorDocumento' };

  try {
    logDebug(`Buscando usuario: ${documentTypeId} - ${documentNumber}`, context);

    const params = { documentTypeId, documentNumber };
    const res = await apiClient.apiFetch(API_PATH, { params });
    const users = Array.isArray(res) ? res : res?.data ?? [];

    const encontrado = users.find((u: User) => String(u.documentTypeId) === String(documentTypeId) && String(u.documentNumber) === String(documentNumber)) || null;

    if (encontrado) {
      const validated = validateData(UserSchema, encontrado);
      if (!validated) {
        logWarn('Usuario devuelto por API no cumple con el esquema esperado', context);
        throw new ValidationError('Datos de usuario inválidos');
      }
      logDebug('Usuario encontrado y validado', context);
      return validated;
    }

    logDebug('Usuario no encontrado', context);
    return null;
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de usuarios', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al buscar usuario', error, context);
    throw error;
  }
}
