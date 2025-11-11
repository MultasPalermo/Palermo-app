/**
 * Tests para API de tipos de documento
 */

import {
  obtenerTiposDocumento,
  getDocumentTypeId,
  getDocumentTypeAbbreviation,
  buildDocumentTypeMap,
  clearDocumentTypeCache,
} from '../documentTypeApi';
import apiClient from '../apiClient';
import { DocumentType } from '../../types/api';

// Mock del apiClient
jest.mock('../apiClient');

const mockDocumentTypes: DocumentType[] = [
  { id: 1, name: 'Cédula de Ciudadanía', abbreviation: 'CC' },
  { id: 2, name: 'Cédula de Extranjería', abbreviation: 'CE' },
  { id: 3, name: 'Tarjeta de Identidad', abbreviation: 'TI' },
  { id: 4, name: 'Pasaporte', abbreviation: 'PAS' },
];

describe('documentTypeApi', () => {
  beforeEach(() => {
    // Limpiar cache antes de cada test
    clearDocumentTypeCache();
    jest.clearAllMocks();
  });

  describe('obtenerTiposDocumento', () => {
    it('should fetch document types from API', async () => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);

      const result = await obtenerTiposDocumento();

      expect(apiClient.apiFetch).toHaveBeenCalledWith('/api/documentType');
      expect(result).toEqual(mockDocumentTypes);
    });

    it('should cache document types', async () => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);

      // Primera llamada
      await obtenerTiposDocumento();
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(1);

      // Segunda llamada debe usar cache
      await obtenerTiposDocumento();
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(1);
    });

    it('should force refresh when requested', async () => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);

      // Primera llamada
      await obtenerTiposDocumento();
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(1);

      // Segunda llamada con forceRefresh
      await obtenerTiposDocumento(true);
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(2);
    });

    it('should handle array in data property', async () => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue({ data: mockDocumentTypes });

      const result = await obtenerTiposDocumento();

      expect(result).toEqual(mockDocumentTypes);
    });
  });

  describe('buildDocumentTypeMap', () => {
    it('should build correct mapping', () => {
      const map = buildDocumentTypeMap(mockDocumentTypes);

      expect(map.CC).toBe(1);
      expect(map.CE).toBe(2);
      expect(map.TI).toBe(3);
      expect(map.PAS).toBe(4);
    });

    it('should handle empty array', () => {
      const map = buildDocumentTypeMap([]);
      expect(map).toEqual({});
    });
  });

  describe('getDocumentTypeId', () => {
    beforeEach(() => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);
    });

    it('should return correct ID for valid abbreviations', async () => {
      expect(await getDocumentTypeId('CC')).toBe(1);
      expect(await getDocumentTypeId('CE')).toBe(2);
      expect(await getDocumentTypeId('TI')).toBe(3);
      expect(await getDocumentTypeId('PAS')).toBe(4);
    });

    it('should be case insensitive', async () => {
      expect(await getDocumentTypeId('cc')).toBe(1);
      expect(await getDocumentTypeId('Ce')).toBe(2);
      expect(await getDocumentTypeId('ti')).toBe(3);
    });

    it('should return null for invalid abbreviations', async () => {
      expect(await getDocumentTypeId('INVALID')).toBeNull();
    });

    it('should handle empty string', async () => {
      expect(await getDocumentTypeId('')).toBeNull();
    });
  });

  describe('getDocumentTypeAbbreviation', () => {
    beforeEach(() => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);
    });

    it('should return correct abbreviation for valid IDs', async () => {
      expect(await getDocumentTypeAbbreviation(1)).toBe('CC');
      expect(await getDocumentTypeAbbreviation(2)).toBe('CE');
      expect(await getDocumentTypeAbbreviation(3)).toBe('TI');
      expect(await getDocumentTypeAbbreviation(4)).toBe('PAS');
    });

    it('should return null for invalid IDs', async () => {
      expect(await getDocumentTypeAbbreviation(999)).toBeNull();
      expect(await getDocumentTypeAbbreviation(0)).toBeNull();
    });
  });

  describe('clearDocumentTypeCache', () => {
    it('should clear cache', async () => {
      (apiClient.apiFetch as jest.Mock).mockResolvedValue(mockDocumentTypes);

      // Cargar cache
      await obtenerTiposDocumento();
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(1);

      // Limpiar cache
      clearDocumentTypeCache();

      // Siguiente llamada debe recargar
      await obtenerTiposDocumento();
      expect(apiClient.apiFetch).toHaveBeenCalledTimes(2);
    });
  });
});
