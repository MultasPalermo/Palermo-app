import { useState, useRef, useCallback } from 'react';
import { consultarInfracciones } from '../api/infractionApi';
import { buscarUsuarioPorDocumento } from '../api/userApi';
import { getDocumentTypeId } from '../api/documentTypeApi';
import { setDocumentInfo, setUser } from '../api/userCache';
import { setInfracciones } from '../api/infractionCache';
import { sanitizeDocumentNumber } from '../utils/documentValidation';
import { createInactivityTimer } from '../utils/inactivityTimer';
import { enrichUserWithInfractionData } from '../utils/userEnrichment';
import { filterInfractionsByUser } from '../utils/infractionFilters';
import type { RootNavigationProp } from '../types/navigation';
import type { TipoDocumento, UseMultasReturn } from '../interfaces/hooks';

export default function useFines(navigation: RootNavigationProp): UseMultasReturn {
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('');
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNumeroDocumentoChange = useCallback((text: string) => {
    const sanitized = sanitizeDocumentNumber(text, tipoDocumento);
    setNumeroDocumento(sanitized);
  }, [tipoDocumento]);

  const resetTimer = useCallback(
    createInactivityTimer(navigation, timerRef),
    [navigation]
  );

  const handleConsultarMultas = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const documentTypeId = await getDocumentTypeId(tipoDocumento);

      if (!documentTypeId || !numeroDocumento) {
        setError('Selecciona tipo y número de documento.');
        return;
      }

      setDocumentInfo({ documentTypeId, numeroDocumento });

      const usuario = await buscarUsuarioPorDocumento(documentTypeId, numeroDocumento);
      if (!usuario) {
        setError('No existe un usuario con ese documento.');
        return;
      }

      const multas = await consultarInfracciones({
        documentTypeId,
        documentNumber: numeroDocumento,
      });

      const multasUsuario = filterInfractionsByUser(multas, usuario);

      if (!multasUsuario || multasUsuario.length === 0) {
        setUser(usuario);
        setError('No se encontraron multas para este documento.');
        return;
      }

      const enrichedUser = enrichUserWithInfractionData(usuario, multasUsuario);
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
