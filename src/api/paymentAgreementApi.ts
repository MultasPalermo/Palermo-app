import { API_HOST } from './config';

/**
 * Obtiene todos los acuerdos de pago desde la API.
 * Retorna un array (vacío si no hay datos).
 */
export async function fetchAllPaymentAgreements(): Promise<any[]> {
  const res = await fetch(`${API_HOST}/api/PaymentAgreement`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : [json];
}

/**
 * Obtiene los acuerdos de pago filtrados por número de documento.
 * Si no se pasa documentNumber retorna un array vacío.
 */
export async function fetchPaymentAgreementsByDocument(documentNumber?: string | number): Promise<any[]> {
  if (!documentNumber) return [];
  const all = await fetchAllPaymentAgreements();
  return all.filter(agreement => String(agreement.documentNumber || agreement.document || '').trim() === String(documentNumber).trim());
}

export default {
  fetchAllPaymentAgreements,
  fetchPaymentAgreementsByDocument,
};
