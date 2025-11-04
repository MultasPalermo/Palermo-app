// Cliente HTTP central para fetch con timeout y manejo básico de errores
import { getApiHost } from './config';

const DEFAULT_TIMEOUT = 15000; // 15s

interface ApiFetchOptions {
  timeout?: number;
  params?: Record<string, any> | null;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

interface ApiError extends Error {
  status?: number;
  body?: any;
}

function buildUrl(path: string, params?: Record<string, any> | null): string {
  // path puede ser ruta absoluta o relativa
  const base = path.startsWith('http') ? '' : getApiHost();
  const url = new URL(base + path);
  if (params && typeof params === 'object') {
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<any> {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const params = options.params ?? null;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers: options.headers || { accept: 'application/json' },
    signal: controller.signal,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const res = await fetch(url, fetchOptions);
    clearTimeout(id);
    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      // no JSON
    }
    if (!res.ok) {
      const message = json && (json.message || json.error) ? (json.message || json.error) : `HTTP ${res.status}`;
      const err = new Error(message) as ApiError;
      err.status = res.status;
      err.body = json;
      throw err;
    }
    return json ?? text;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('La solicitud al servidor excedió el tiempo de espera. Intenta nuevamente.');
    }
    // preserva error para que el llamador lo maneje
    throw error;
  }
}

export default {
  apiFetch,
};
