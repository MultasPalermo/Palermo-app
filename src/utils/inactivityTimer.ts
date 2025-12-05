/**
 * Utilidades para manejo de timer de inactividad
 */

import { Alert } from 'react-native';
import { INACTIVITY_TIMEOUT, INACTIVITY_MESSAGES } from '../constants/inactivity';
import type { RootNavigationProp } from '../types/navigation';

/**
 * Crea y gestiona un timer de inactividad
 *
 * @param navigation - Objeto de navegación
 * @param timerRef - Referencia al timer actual
 * @returns Función para resetear el timer
 */
export function createInactivityTimer(
  navigation: RootNavigationProp,
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>
): () => void {
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      Alert.alert(
        INACTIVITY_MESSAGES.title,
        INACTIVITY_MESSAGES.message,
        [
          {
            text: INACTIVITY_MESSAGES.logout,
            style: 'destructive',
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }),
          },
          {
            text: INACTIVITY_MESSAGES.continue,
            style: 'cancel',
            onPress: () => resetTimer(),
          },
        ]
      );
    }, INACTIVITY_TIMEOUT);
  };

  return resetTimer;
}

/**
 * Limpia el timer de inactividad
 *
 * @param timerRef - Referencia al timer a limpiar
 */
export function clearInactivityTimer(timerRef: React.MutableRefObject<NodeJS.Timeout | null>): void {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}
