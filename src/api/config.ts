
// Archivo de configuración centralizada para las URLs base de la API
// Lee la configuración desde variables de entorno cuando estén disponibles.
// Para Expo se puede inyectar en `app.config.js`/`app.json` (extra) o usar un .env en desarrollo.
let envHost: string | null = null;
try {
	// Intentar leer de `process.env` (útil en builds o cuando se use react-native-dotenv)
	envHost = process.env.API_HOST || null;
} catch (e) {
	// ignore
}

// Valor por defecto (mantener el comportamiento anterior si no hay env configurada)
const DEFAULT_API_HOST = 'http://172.30.3.135:7286';

export const API_HOST: string = envHost || DEFAULT_API_HOST;

// También exportamos una función por si se necesita resolución dinámica desde otras fuentes.
export function getApiHost(): string {
	return API_HOST;
}
