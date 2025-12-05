/**
 * Constantes y configuraciones para tipos de documentos
 */

export type DocumentTypeCode = 'CC' | 'CE' | 'TI' | 'PAS' | '';

/**
 * Configuración de longitud máxima por tipo de documento
 */
export const DOCUMENT_MAX_LENGTH: Record<string, number> = {
  CC: 10,   // Cédula de Ciudadanía Colombia
  CE: 7,    // Cédula de Extranjería
  TI: 11,   // Tarjeta de Identidad
  PAS: 20,  // Pasaporte
  DEFAULT: 15,
};

/**
 * Obtiene la longitud máxima permitida para un tipo de documento
 */
export function getDocumentMaxLength(documentType: string): number {
  return DOCUMENT_MAX_LENGTH[documentType] || DOCUMENT_MAX_LENGTH.DEFAULT;
}
