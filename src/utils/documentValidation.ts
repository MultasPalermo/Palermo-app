/**
 * Utilidades para validación y sanitización de documentos
 */

import { getDocumentMaxLength } from '../constants/documentTypes';

/**
 * Sanitiza un número de documento, permitiendo solo números
 * y respetando la longitud máxima según el tipo de documento
 *
 * @param text - Texto a sanitizar
 * @param documentType - Tipo de documento para determinar longitud máxima
 * @returns Texto sanitizado
 */
export function sanitizeDocumentNumber(text: string, documentType: string): string {
  const sanitized = text.replace(/[^0-9]/g, '');
  const maxLength = getDocumentMaxLength(documentType);

  return sanitized.length <= maxLength ? sanitized : sanitized.substring(0, maxLength);
}

/**
 * Valida que un número de documento sea válido
 *
 * @param documentNumber - Número de documento a validar
 * @param documentType - Tipo de documento
 * @returns true si es válido, false en caso contrario
 */
export function isValidDocumentNumber(documentNumber: string, documentType: string): boolean {
  if (!documentNumber || !documentType) {
    return false;
  }

  const maxLength = getDocumentMaxLength(documentType);
  const minLength = documentType === 'CC' ? 6 : 1;

  return documentNumber.length >= minLength && documentNumber.length <= maxLength;
}
