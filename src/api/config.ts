/**
 * Archivo de configuración centralizada para la API
 * Lee variables de entorno desde .env usando react-native-dotenv
 */

// Valor por defecto si no hay variable de entorno
const DEFAULT_API_HOST = "http://172.30.160.1:5162";
const DEFAULT_API_TIMEOUT = 30000;

// Intentar leer de variables de entorno
let envHost: string | null = null;
let envTimeout: string | null = null;
let envDebug: string | null = null;

try {
	envHost = process.env.API_HOST || null;
	envTimeout = process.env.API_TIMEOUT || null;
	envDebug = process.env.DEBUG_MODE || null;
} catch (e) {
	// Si falla, usar valores por defecto
}

/**
 * URL base del servidor API
 * Se lee desde la variable de entorno API_HOST o usa el valor por defecto
 */
export const API_HOST: string = envHost || DEFAULT_API_HOST;

/**
 * Timeout para peticiones API en milisegundos
 * Se lee desde la variable de entorno API_TIMEOUT o usa 30 segundos por defecto
 */
export const API_TIMEOUT: number = envTimeout ? parseInt(envTimeout, 10) : DEFAULT_API_TIMEOUT;

/**
 * Modo debug para logging adicional
 * Se lee desde la variable de entorno DEBUG_MODE
 */
export const DEBUG_MODE: boolean = envDebug === 'true';

/**
 * Obtiene el host de la API
 * @returns URL del host de la API
 */
export function getApiHost(): string {
	return API_HOST;
}

/**
 * Obtiene el timeout configurado para peticiones API
 * @returns Timeout en milisegundos
 */
export function getApiTimeout(): number {
	return API_TIMEOUT;
}

/**
 * Verifica si el modo debug está habilitado
 * @returns true si el modo debug está hasbilitado
 */
export function isDebugMode(): boolean {
	return DEBUG_MODE;
}
