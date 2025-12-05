/**
 * Constantes relacionadas con tiempo de inactividad
 */

/**
 * Tiempo de inactividad en milisegundos (5 minutos)
 */
export const INACTIVITY_TIMEOUT = 300000; // 5 minutos

/**
 * Mensajes de alerta de inactividad
 */
export const INACTIVITY_MESSAGES = {
  title: 'Inactividad',
  message: '¿Deseas continuar en la sesión o cerrar sesión por inactividad?',
  logout: 'Cerrar sesión',
  continue: 'Seguir en la sesión',
} as const;
