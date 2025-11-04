
// Cache simple para almacenar datos de usuario y documento
let userData: any | null = null;
let documentInfo: any | null = null;

/**
 * Guarda el usuario en el cache local.
 * @param {Object} user - Datos del usuario
 */
export function setUser(user: any): void {
  userData = user;
}

/**
 * Obtiene el usuario almacenado en el cache.
 * @returns {Object|null} - Usuario o null si no hay datos
 */
export function getUser(): any | null {
  return userData;
}

/**
 * Guarda la información del documento en el cache local.
 * @param {Object} docInfo - Información del documento
 */
export function setDocumentInfo(docInfo: any): void {
  documentInfo = docInfo;
}

/**
 * Obtiene la información del documento almacenada en el cache.
 * @returns {Object|null} - Información del documento o null si no hay datos
 */
export function getDocumentInfo(): any | null {
  return documentInfo;
}
