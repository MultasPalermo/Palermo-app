import { useState, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { consultarInfracciones } from '../api/infractionApi';
import { buscarUsuarioPorDocumento } from '../api/userApi';
import { getDocumentTypeId } from '../api/documentTypeApi';
import { setDocumentInfo, setUser } from '../api/userCache';
import { setInfracciones } from '../api/infractionCache';
import { RootNavigationProp, Infraccion } from '../types/navigation';
import { TipoDocumento, UseMultasReturn } from '../interfaces/hooks';

export default function useFines(navigation: RootNavigationProp): UseMultasReturn {
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('');
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Validación y sanitización del número de documento
  const handleNumeroDocumentoChange = useCallback((text: string) => {
    // Solo permitir números
    const sanitized = text.replace(/[^0-9]/g, '');

    // Límites según tipo de documento
    let maxLength = 15; // Default

    switch (tipoDocumento) {
      case 'CC':
        maxLength = 10; // Cédula de Ciudadanía Colombia
        break;
      case 'CE':
        maxLength = 7; // Cédula de Extranjería
        break;
      case 'TI':
        maxLength = 11; // Tarjeta de Identidad
        break;
      case 'PAS':
        maxLength = 20; // Pasaporte
        break;
    }

    // Aplicar límite
    if (sanitized.length <= maxLength) {
      setNumeroDocumento(sanitized);
    }
  }, [tipoDocumento]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      Alert.alert(
        'Inactividad',
        '¿Deseas continuar en la sesión o cerrar sesión por inactividad?',
        [
          {
            text: 'Cerrar sesión',
            style: 'destructive',
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }),
          },
          {
            text: 'Seguir en la sesión',
            style: 'cancel',
            onPress: () => resetTimer(),
          },
        ]
      );
    }, 300000);
  }, [navigation]);

  const handleConsultarMultas = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Obtener ID del tipo de documento desde la base de datos
      const documentTypeId = await getDocumentTypeId(tipoDocumento);

      if (!documentTypeId || !numeroDocumento) {
        setError('Selecciona tipo y número de documento.');
        setLoading(false);
        return;
      }
      setDocumentInfo({ documentTypeId, numeroDocumento });
      const usuario = await buscarUsuarioPorDocumento(documentTypeId, numeroDocumento);
      if (!usuario) {
        setError('No existe un usuario con ese documento.');
        setLoading(false);
        return;
      }
      const multas = await consultarInfracciones({ documentTypeId, documentNumber: numeroDocumento });
      const multasUsuario = (Array.isArray(multas) ? multas : []).filter((m: Infraccion) => {
        if (usuario?.id != null && m?.userId != null) {
          return String(m.userId) === String(usuario.id);
        }
        if (usuario?.userName && m?.userName) {
          return String(m.userName).trim().toLowerCase() === String(usuario.userName).trim().toLowerCase();
        }
        return false;
      });
      if (!multasUsuario || multasUsuario.length === 0) {
        setUser(usuario);
        setError('No se encontraron multas para este documento.');
        setLoading(false);
        return;
      }
      const firstInfraction = multasUsuario[0];
      let firstName = firstInfraction?.firstName;
      let lastName = firstInfraction?.lastName;
      if ((!firstName || !lastName) && firstInfraction?.userName) {
        const parts = String(firstInfraction.userName).trim().split(/\s+/);
        firstName = firstName || (parts[0] || '');
        lastName = lastName || (parts.slice(1).join(' ') || '');
      }
      const enrichedUser = {
        ...usuario,
        userName: firstInfraction?.userName || usuario?.userName,
        firstName: firstName || usuario?.firstName || '',
        lastName: lastName || usuario?.lastName || '',
      };
      setUser(enrichedUser);
      setInfracciones(multasUsuario);
      navigation.navigate('FinesResult', { multas: multasUsuario });
    } catch (err: any) {
      setError('Error: ' + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  }, [tipoDocumento, numeroDocumento, navigation]);

  return {
    tipoDocumento,
    setTipoDocumento,
    numeroDocumento,
    setNumeroDocumento,
    handleNumeroDocumentoChange,
    acceptedTerms,
    setAcceptedTerms,
    showTermsModal,
    setShowTermsModal,
    loading,
    error,
    setError,
    handleConsultarMultas,
    resetTimer,
    timerRef,
  };
}
