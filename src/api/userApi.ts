
import apiClient from './apiClient';

const API_PATH = '/api/Users';

/**
 * Busca un usuario por tipo y número de documento.
 * Intentará usar filtros en el servidor cuando sea posible; si el backend
 * no soporta estos parámetros, se puede adaptar la función.
 * @param {string|number} documentTypeId
 * @param {string|number} documentNumber
 */
export async function buscarUsuarioPorDocumento(documentTypeId: string | number, documentNumber: string | number): Promise<any | null> {
  if (!documentTypeId || !documentNumber) return null;
  try {
    // Intentar pedir al servidor filtrado por documento
    const params = { documentTypeId, documentNumber };
    // Algunos backends no soportan estos parámetros; apiFetch devolverá lo que haya
    const res = await apiClient.apiFetch(API_PATH, { params });
    const users = Array.isArray(res) ? res : res?.data ?? [];
    // Si la API devolvió una lista, buscar coincidencia exacta
    const encontrado = users.find(u => String(u.documentTypeId) === String(documentTypeId) && String(u.documentNumber) === String(documentNumber)) || null;
    return encontrado;
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      throw new Error('No se pudo conectar con el servidor de usuarios. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
