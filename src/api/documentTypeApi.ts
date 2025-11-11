/**
 * API para tipos de documentos
 * Maneja la consulta de tipos de documento desde el backend
 */

import apiClient from './apiClient';
import { DocumentType } from '../types/api';
import { DocumentTypeListSchema, safeValidateData } from '../validation/schemas';
import { logDebug, logError, logWarn } from '../utils/logger';
import { NetworkError, ValidationError } from '../utils/errorHandler';

const API_PATH = '/api/documentType';

/**
 * Cache de tipos de documento
 * Se actualiza al llamar obtenerTiposDocumento()
 */
let cachedDocumentTypes: DocumentType[] | null = null;

/**
 * Obtiene todos los tipos de documento disponibles desde la base de datos
 *
 * @param {boolean} forceRefresh - Si true, fuerza una recarga desde el servidor
 * @returns {Promise<DocumentType[]>} Lista de tipos de documento validados
 * @throws {NetworkError} Si no se puede conectar con el servidor
 * @throws {ValidationError} Si los datos devueltos no cumplen el esquema
 *
 * @example
 * ```ts
 * const tipos = await obtenerTiposDocumento();
 * // [
 * //   { id: 1, name: "Cédula de Ciudadanía", abbreviation: "CC" },
 * //   { id: 2, name: "Cédula de Extranjería", abbreviation: "CE" },
 * //   ...
 * // ]
 * ```
 */
export async function obtenerTiposDocumento(forceRefresh: boolean = false): Promise<DocumentType[]> {
  const context = { component: 'documentTypeApi', function: 'obtenerTiposDocumento' };

  // Retornar cache si existe y no se solicita refresh
  if (cachedDocumentTypes && !forceRefresh) {
    logDebug(`Retornando ${cachedDocumentTypes.length} tipos de documento desde cache`, context);
    return cachedDocumentTypes;
  }

  try {
    logDebug('Consultando tipos de documento desde la base de datos', context);

    const result = await apiClient.apiFetch(API_PATH);
    const rawData = Array.isArray(result) ? result : result?.data ?? [];

    // Validar con Zod
    const validation = safeValidateData(DocumentTypeListSchema, rawData);

    if (!validation.success) {
      logWarn('Algunos tipos de documento no cumplen el esquema', {
        ...context,
        errors: validation.error.errors
      });
      throw new ValidationError('Datos de tipos de documento inválidos');
    }

    // Actualizar cache
    cachedDocumentTypes = validation.data;
    logDebug(`${validation.data.length} tipos de documento obtenidos y cacheados`, context);

    return validation.data;
  } catch (error: any) {
    if (error && error.message && error.message.includes('No se pudo conectar')) {
      const networkError = new NetworkError('No se pudo conectar con el servidor de tipos de documento', error);
      logError(networkError.message, networkError, context);
      throw networkError;
    }
    logError('Error al obtener tipos de documento', error, context);
    throw error;
  }
}

/**
 * Construye un mapa de abreviaturas a IDs desde los tipos de documento
 *
 * @param {DocumentType[]} documentTypes - Lista de tipos de documento
 * @returns {Record<string, number>} Mapa de abreviatura -> ID
 *
 * @example
 * ```ts
 * const tipos = await obtenerTiposDocumento();
 * const map = buildDocumentTypeMap(tipos);
 * // { CC: 1, CE: 2, TI: 3, PAS: 4 }
 * ```
 */
export function buildDocumentTypeMap(documentTypes: DocumentType[]): Record<string, number> {
  return documentTypes.reduce((map, dt) => {
    map[dt.abbreviation] = dt.id;
    return map;
  }, {} as Record<string, number>);
}

/**
 * Convierte una abreviatura de tipo de documento a su ID
 * Utiliza el cache si está disponible, de lo contrario consulta la API
 *
 * @param {string} abbreviation - Abreviatura del tipo de documento ('CC', 'CE', 'TI', 'PAS')
 * @returns {Promise<number | null>} ID del tipo de documento o null si no existe
 *
 * @example
 * ```ts
 * await getDocumentTypeId('CC') // 1
 * await getDocumentTypeId('TI') // 3
 * await getDocumentTypeId('INVALID') // null
 * ```
 */
export async function getDocumentTypeId(abbreviation: string): Promise<number | null> {
  const context = { component: 'documentTypeApi', function: 'getDocumentTypeId' };

  try {
    const documentTypes = await obtenerTiposDocumento();
    const abbr = abbreviation.toUpperCase();
    const docType = documentTypes.find(dt => dt.abbreviation.toUpperCase() === abbr);

    if (!docType) {
      logWarn(`Tipo de documento con abreviatura '${abbreviation}' no encontrado`, context);
      return null;
    }

    return docType.id;
  } catch (error: any) {
    logError(`Error al buscar ID para abreviatura '${abbreviation}'`, error, context);
    return null;
  }
}

/**
 * Convierte un ID de tipo de documento a su abreviatura
 * Utiliza el cache si está disponible, de lo contrario consulta la API
 *
 * @param {number} id - ID del tipo de documento
 * @returns {Promise<string | null>} Abreviatura o null si no existe
 *
 * @example
 * ```ts
 * await getDocumentTypeAbbreviation(1) // 'CC'
 * await getDocumentTypeAbbreviation(3) // 'TI'
 * ```
 */
export async function getDocumentTypeAbbreviation(id: number): Promise<string | null> {
  const context = { component: 'documentTypeApi', function: 'getDocumentTypeAbbreviation' };

  try {
    const documentTypes = await obtenerTiposDocumento();
    const docType = documentTypes.find(dt => dt.id === id);

    if (!docType) {
      logWarn(`Tipo de documento con ID ${id} no encontrado`, context);
      return null;
    }

    return docType.abbreviation;
  } catch (error: any) {
    logError(`Error al buscar abreviatura para ID ${id}`, error, context);
    return null;
  }
}

/**
 * Limpia el cache de tipos de documento
 * Útil para testing o cuando se necesita forzar una recarga
 */
export function clearDocumentTypeCache(): void {
  cachedDocumentTypes = null;
  logDebug('Cache de tipos de documento limpiado', {
    component: 'documentTypeApi',
    function: 'clearDocumentTypeCache'
  });
}
