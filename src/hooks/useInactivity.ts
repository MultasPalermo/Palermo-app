import { useRef, useCallback, useEffect, MutableRefObject } from 'react';
import { Alert } from 'react-native';
import { RootNavigationProp } from '../types/navigation';

interface UseInactivityReturn {
  resetTimer: () => void;
  stopTimer: () => void;
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
}

/**
 * Hook para detectar inactividad del usuario y mostrar alerta
 * Previene memory leaks usando refs para valores que cambian
 *
 * @param {RootNavigationProp} navigation - Objeto de navegación
 * @param {string} routeName - Nombre de la ruta a la que navegar al cerrar sesión (default: 'Welcome')
 * @param {number} timeoutMs - Tiempo de inactividad en milisegundos (default: 300000 = 5 minutos)
 * @returns {UseInactivityReturn} Funciones para controlar el timer de inactividad
 *
 * @example
 * ```tsx
 * const { resetTimer, stopTimer } = useInactivity(navigation, 'Welcome', 300000);
 * // Resetear timer en cada interacción del usuario
 * <TouchableOpacity onPress={resetTimer}>...</TouchableOpacity>
 * ```
 */
export default function useInactivity(
  navigation: RootNavigationProp,
  routeName: keyof import('../types/navigation').RootStackParamList = 'Welcome',
  timeoutMs: number = 300000
): UseInactivityReturn {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigationRef = useRef(navigation);
  const routeNameRef = useRef(routeName);
  const timeoutMsRef = useRef(timeoutMs);

  // Actualizar refs cuando cambien las props
  useEffect(() => {
    navigationRef.current = navigation;
    routeNameRef.current = routeName;
    timeoutMsRef.current = timeoutMs;
  }, [navigation, routeName, timeoutMs]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();

    timerRef.current = setTimeout(() => {
      Alert.alert(
        'Inactividad',
        '¿Deseas continuar en la sesión o cerrar la aplicación por inactividad?',
        [
          {
            text: 'Cerrar aplicación',
            style: 'destructive',
            onPress: () => navigationRef.current.reset({ index: 0, routes: [{ name: routeNameRef.current }] }),
          },
          {
            text: 'Seguir en la sesión',
            style: 'cancel',
            onPress: () => resetTimer(),
          },
        ]
      );
    }, timeoutMsRef.current);
  }, [stopTimer]);

  useEffect(() => {
    resetTimer();
    return () => stopTimer();
    // Dependencias vacías: solo ejecutar al montar y limpiar al desmontar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { resetTimer, stopTimer, timerRef };
}
