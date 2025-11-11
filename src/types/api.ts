/**
 * Tipos para respuestas de API
 * Define estructuras de datos devueltas por el backend
 */

// Tipos de usuario
export interface User {
  id: string | number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  documentTypeId?: string | number;
  documentNumber?: string | number;
  email?: string;
  phoneNumber?: string;
}

// Tipos de infracción
export interface InfraccionAPI {
  id?: string | number;
  userId?: string | number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  typeInfractionName?: string;
  tipo?: string;
  type?: string;
  observations?: string;
  description?: string;
  descripcion?: string;
  valor?: number;
  amount?: number;
  monto?: number | string;
  total?: number;
  fechaMax?: string;
  dueDate?: string;
  fecha_max?: string;
  number?: string;
  fecha?: string;
  date?: string;
  dateInfraction?: string;
}

// Tipos de documento
export interface DocumentType {
  id: number;
  name: string;
  abbreviation: string;
}

// Tipos de acuerdo de pago
export interface PaymentAgreement {
  id: string | number;
  personName?: string;
  documentNumber?: string;
  document?: string;
  phoneNumber?: string;
  phone?: string;
  address?: string;
  neighborhood?: string;
  agreementStart?: string;
  startDate?: string;
  quotaValue?: number;
  amount?: number;
  quotaQuantity?: number;
  quantity?: number;
  payDay?: string;
  paymentDate?: string;
  paymentMethod?: string;
  method?: string;
  observations?: string;
  notes?: string;
  createdDate?: string;
  modifiedDate?: string;
}

// Parámetros de consulta
export interface ConsultarInfraccionesParams {
  documentTypeId?: string | number;
  documentNumber?: string | number;
}

export interface BuscarUsuarioParams {
  documentTypeId: string | number;
  documentNumber: string | number;
}

// Respuestas de API
export interface APIResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface APIListResponse<T> extends APIResponse<T[]> {
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}

// Tipos para cache
export interface DocumentInfo {
  documentTypeId: string | number;
  numeroDocumento?: string;
  documentNumber?: string;
}
