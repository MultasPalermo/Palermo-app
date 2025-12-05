import { User, DocumentInfo } from '../types/api';

// Cache simple para almacenar datos de usuario y documento
let userData: User | null = null;
let documentInfo: DocumentInfo | null = null;

/**
 * Guarda el usuario en el cache local.
 * @param {Object} user - Datos del usuario
 */
export function setUser(user: User): void {
  userData = user;
}

/**
 * Obtiene el usuario almacenado en el cache.
 * @returns {Object|null} - Usuario o null si no hay datos
 */
export function getUser(): User | null {
  return userData;
}

/**
 * Guarda la información del documento en el cache local.
 * @param {Object} docInfo - Información del documento
 */
export function setDocumentInfo(docInfo: DocumentInfo): void {
  documentInfo = docInfo;
}

/**
 * Obtiene la información del documento almacenada en el cache.
 * @returns {Object|null} - Información del documento o null si no hay datos
 */
export function getDocumentInfo(): DocumentInfo | null {
  return documentInfo;
}
