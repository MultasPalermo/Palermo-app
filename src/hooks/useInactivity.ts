import { useRef, useCallback, useEffect, MutableRefObject } from 'react';
import { Alert } from 'react-native';

interface UseInactivityReturn {
  resetTimer: () => void;
  stopTimer: () => void;
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
}

export default function useInactivity(
  navigation: any,
  routeName: string = 'Bienvenida',
  timeoutMs: number = 300000
): UseInactivityReturn {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showInactivityAlert = useCallback(() => {
    Alert.alert(
      'Inactividad',
      '¿Deseas continuar en la sesión o cerrar la aplicación por inactividad?',
      [
        {
          text: 'Cerrar aplicación',
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: routeName }] }),
        },
        {
          text: 'Seguir en la sesión',
          style: 'cancel',
          onPress: () => {
            resetTimer();
          },
        },
      ]
    );
  }, [navigation, routeName]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(showInactivityAlert, timeoutMs);
  }, [showInactivityAlert, timeoutMs]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    resetTimer();
    return () => stopTimer();
  }, [resetTimer, stopTimer]);

  return { resetTimer, stopTimer, timerRef };
}
