/**
 * Utilidades para formateo de datos
 * Centraliza funciones de formateo de moneda, fechas, etc.
 */

/**
 * Formatea un valor numérico como moneda colombiana (COP)
 * @param value - Valor a formatear (number, string, null o undefined)
 * @returns String formateado como moneda o '-' si el valor es nulo
 * @example
 * formatCurrency(150000) // "$150.000"
 * formatCurrency(null) // "-"
 */
export function formatCurrency(value: number | string | null | undefined): string {
  if (value == null) return '-';

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '-';

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(numValue);
}

/**
 * Formatea una fecha ISO 8601 a formato colombiano (dd/mm/yyyy)
 * @param isoDate - Fecha en formato ISO 8601 o undefined
 * @returns String formateado como fecha o '-' si la fecha es inválida
 * @example
 * formatDate("2025-01-15T10:30:00Z") // "15/01/2025"
 * formatDate(undefined) // "-"
 */
export function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return '-';

  try {
    const date = new Date(isoDate);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('es-CO');
  } catch (error) {
    return '-';
  }
}

/**
 * Formatea una fecha ISO 8601 con hora
 * @param isoDate - Fecha en formato ISO 8601 o undefined
 * @returns String formateado como fecha y hora o '-' si la fecha es inválida
 * @example
 * formatDateTime("2025-01-15T10:30:00Z") // "15/01/2025, 10:30:00"
 */
export function formatDateTime(isoDate: string | undefined): string {
  if (!isoDate) return '-';

  try {
    const date = new Date(isoDate);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleString('es-CO');
  } catch (error) {
    return '-';
  }
}

/**
 * Formatea un número de documento con máscara
 * @param documentNumber - Número de documento
 * @returns Número de documento formateado
 * @example
 * formatDocumentNumber("1234567890") // "1.234.567.890"
 */
export function formatDocumentNumber(documentNumber: string | number): string {
  const numStr = String(documentNumber);

  if (!numStr) return '-';

  // Aplicar formato con puntos para separador de miles
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Formatea un número de teléfono colombiano
 * @param phoneNumber - Número de teléfono
 * @returns Número de teléfono formateado
 * @example
 * formatPhoneNumber("3001234567") // "300 123 4567"
 */
export function formatPhoneNumber(phoneNumber: string | number): string {
  const numStr = String(phoneNumber).replace(/\D/g, '');

  if (!numStr) return '-';

  // Formato para móviles colombianos (10 dígitos)
  if (numStr.length === 10) {
    return `${numStr.slice(0, 3)} ${numStr.slice(3, 6)} ${numStr.slice(6)}`;
  }

  // Formato para fijos (7 dígitos)
  if (numStr.length === 7) {
    return `${numStr.slice(0, 3)} ${numStr.slice(3)}`;
  }

  return numStr;
}

/**
 * Trunca un texto a una longitud específica y añade "..."
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 * @example
 * truncateText("Este es un texto muy largo", 10) // "Este es un..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param text - Texto a capitalizar
 * @returns Texto con primera letra de cada palabra en mayúscula
 * @example
 * capitalizeWords("juan pérez") // "Juan Pérez"
 */
export function capitalizeWords(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
