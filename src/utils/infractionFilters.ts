/**
 * Utilidades para filtrado de infracciones
 */

import type { Infraccion } from '../types/navigation';

/**
 * Filtra infracciones que pertenecen a un usuario específico
 *
 * @param infracciones - Lista de infracciones
 * @param usuario - Usuario para filtrar
 * @returns Infracciones que pertenecen al usuario
 */
export function filterInfractionsByUser(
  infracciones: Infraccion[] | any,
  usuario: any
): Infraccion[] {
  const infraccList = Array.isArray(infracciones) ? infracciones : [];

  return infraccList.filter((infraction: Infraccion) => {
    // Comparar por ID si ambos están disponibles
    if (usuario?.id != null && infraction?.userId != null) {
      return String(infraction.userId) === String(usuario.id);
    }

    // Comparar por userName como alternativa
    if (usuario?.userName && infraction?.userName) {
      return (
        String(infraction.userName).trim().toLowerCase() ===
        String(usuario.userName).trim().toLowerCase()
      );
    }

    return false;
  });
}
