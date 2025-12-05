/**
 * Utilidades para enriquecer datos de usuario
 */

import type { Infraccion } from '../types/navigation';

/**
 * Extrae nombre y apellido de un nombre completo
 *
 * @param fullName - Nombre completo del usuario
 * @returns Objeto con firstName y lastName
 */
export function parseFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
}

/**
 * Enriquece los datos de usuario con información de la primera infracción
 *
 * @param usuario - Usuario base
 * @param infracciones - Lista de infracciones del usuario
 * @returns Usuario enriquecido con datos adicionales
 */
export function enrichUserWithInfractionData(
  usuario: any,
  infracciones: Infraccion[]
): any {
  if (!infracciones || infracciones.length === 0) {
    return usuario;
  }

  const firstInfraction = infracciones[0];
  let firstName = firstInfraction?.firstName;
  let lastName = firstInfraction?.lastName;

  // Si no hay nombre/apellido pero hay userName, intentar parsear
  if ((!firstName || !lastName) && firstInfraction?.userName) {
    const parsed = parseFullName(String(firstInfraction.userName));
    firstName = firstName || parsed.firstName;
    lastName = lastName || parsed.lastName;
  }

  return {
    ...usuario,
    userName: firstInfraction?.userName || usuario?.userName,
    firstName: firstName || usuario?.firstName || '',
    lastName: lastName || usuario?.lastName || '',
  };
}
