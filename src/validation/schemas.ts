/**
 * Esquemas de validación con Zod para respuestas de API
 * Proporciona validación en tiempo de ejecución y tipos seguros
 */

import { z } from 'zod';

// Esquema para Tipo de Documento
export const DocumentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string(),
});

export const DocumentTypeListSchema = z.array(DocumentTypeSchema);

// Esquema para Usuario
export const UserSchema = z.object({
  id: z.union([z.string(), z.number()]),
  userName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  documentTypeId: z.union([z.string(), z.number()]).optional(),
  documentNumber: z.union([z.string(), z.number()]).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
}).passthrough(); // Permite campos adicionales

// Esquema para Infracción
export const InfraccionAPISchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  userId: z.union([z.string(), z.number()]).optional(),
  userName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  typeInfractionName: z.string().optional(),
  tipo: z.string().optional(),
  type: z.string().optional(),
  observations: z.string().optional(),
  description: z.string().optional(),
  descripcion: z.string().optional(),
  valor: z.number().optional(),
  amount: z.number().optional(),
  monto: z.union([z.number(), z.string()]).optional(),
  total: z.number().optional(),
  fechaMax: z.string().optional(),
  dueDate: z.string().optional(),
  fecha_max: z.string().optional(),
  number: z.string().optional(),
  fecha: z.string().optional(),
  date: z.string().optional(),
  dateInfraction: z.string().optional(),
}).passthrough();

// Esquema para Acuerdo de Pago
export const PaymentAgreementSchema = z.object({
  id: z.union([z.string(), z.number()]),
  personName: z.string().optional(),
  documentNumber: z.string().optional(),
  document: z.string().optional(),
  phoneNumber: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  agreementStart: z.string().optional(),
  startDate: z.string().optional(),
  quotaValue: z.number().optional(),
  amount: z.number().optional(),
  quotaQuantity: z.number().optional(),
  quantity: z.number().optional(),
  payDay: z.string().optional(),
  paymentDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  method: z.string().optional(),
  observations: z.string().optional(),
  notes: z.string().optional(),
  createdDate: z.string().optional(),
  modifiedDate: z.string().optional(),
}).passthrough();

// Esquema para lista de usuarios
export const UserListSchema = z.array(UserSchema);

// Esquema para lista de infracciones
export const InfraccionListSchema = z.array(InfraccionAPISchema);

// Esquema para lista de acuerdos de pago
export const PaymentAgreementListSchema = z.array(PaymentAgreementSchema);

// Esquemas para Pagos de MercadoPago
export const PaymentStatusTypeSchema = z.enum(['Pending', 'Approved', 'InProcess', 'Rejected', 'Cancelled', 'Refunded']);

export const PaymentPreferenceResponseSchema = z.object({
  preferenceId: z.string(),
  initPoint: z.string().url(),
  sandboxInitPoint: z.string().url(),
  amount: z.number().positive(),
  paymentId: z.number().int().positive(),
}).passthrough();

export const PaymentStatusSchema = z.object({
  id: z.number().int().positive(),
  amount: z.number(),
  status: PaymentStatusTypeSchema,
  statusDescription: z.string(),
  paidAt: z.string().nullable(),
  mercadoPagoPaymentId: z.number().int().nullable(),
  paymentMethod: z.string().nullable(),
  infraction: z.object({
    id: z.number().int().positive(),
    stateInfraction: z.string(),
    description: z.string(),
  }).passthrough(),
}).passthrough();

export const UserPaymentSchema = z.object({
  id: z.number().int().positive(),
  amount: z.number(),
  status: z.string(),
  paidAt: z.string().nullable(),
  paymentMethod: z.string().nullable(),
  created_date: z.string(),
  infraction: z.object({
    id: z.number().int().positive(),
    description: z.string(),
    dateInfraction: z.string(),
  }).passthrough(),
}).passthrough();

export const UserPaymentListSchema = z.array(UserPaymentSchema);

export const PaymentHealthSchema = z.object({
  status: z.string(),
  database: z.string(),
  paymentsTable: z.string(),
  paymentsCount: z.number().int().nonnegative(),
  mercadoPago: z.string(),
  timestamp: z.string(),
}).passthrough();

// Tipos inferidos de los esquemas
export type ValidatedUser = z.infer<typeof UserSchema>;
export type ValidatedInfraccion = z.infer<typeof InfraccionAPISchema>;
export type ValidatedPaymentAgreement = z.infer<typeof PaymentAgreementSchema>;
export type ValidatedPaymentPreferenceResponse = z.infer<typeof PaymentPreferenceResponseSchema>;
export type ValidatedPaymentStatus = z.infer<typeof PaymentStatusSchema>;
export type ValidatedUserPayment = z.infer<typeof UserPaymentSchema>;
export type ValidatedPaymentHealth = z.infer<typeof PaymentHealthSchema>;

/**
 * Valida datos con un esquema Zod y retorna datos seguros o null
 * @param schema - Esquema Zod para validar
 * @param data - Datos a validar
 * @returns Datos validados o null si la validación falla
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
    }
    return null;
  }
}

/**
 * Valida datos de forma segura sin lanzar excepciones
 * @param schema - Esquema Zod para validar
 * @param data - Datos a validar
 * @returns Objeto con success y data o error
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
