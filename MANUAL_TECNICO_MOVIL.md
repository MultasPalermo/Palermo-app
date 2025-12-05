# Manual Técnico - Aplicación de Consulta de Infracciones Ciudadanas y Código Nacional de Policía y Convivencia

## Índice
1. [Información General del Proyecto](#información-general-del-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Componentes Principales](#componentes-principales)
7. [Flujo de Datos](#flujo-de-datos)
8. [API y Servicios](#api-y-servicios)
9. [Guía de Desarrollo](#guía-de-desarrollo)
10. [Despliegue](#despliegue)
11. [Mantenimiento](#mantenimiento)
12. [Troubleshooting](#troubleshooting)

---

## Información General del Proyecto

### Descripción
Aplicación móvil desarrollada en React Native con Expo que permite a los ciudadanos consultar **infracciones ciudadanas al Código Nacional de Policía y Convivencia**, acuerdos de pago y leyes relacionadas con comportamientos que afectan la convivencia.

**⚠️ IMPORTANTE**: Esta aplicación está diseñada para **infracciones ciudadanas al Código de Policía y Convivencia** (comportamientos contrarios a la convivencia), **NO para multas de tránsito**.

### Ámbito de Aplicación
La aplicación gestiona infracciones relacionadas con:
- Comportamientos que afectan la tranquilidad y convivencia ciudadana
- Amenazas y agresiones físicas
- Discriminación por orientación sexual o género
- Uso indebido de pólvora y pirotecnia
- Violencia contra servidores públicos
- Violencia contra la mujer
- Vulneración de derechos de menores
- Otros comportamientos contrarios a la convivencia

### Datos del Proyecto
- **Nombre**: mi-app-movil
- **Versión**: 1.0.0
- **Licencia**: 0BSD
- **Plataforma**: Android (únicamente)
- **Repositorio**: https://github.com/DanielCaicedo26/Trabajo-de-proyecto-final-react-native.git
- **Lenguaje Principal**: TypeScript

**⚠️ Nota Importante:** Esta aplicación está desarrollada **exclusivamente para Android**. No hay versiones para iOS ni Web.

### Requisitos del Sistema
- **Android**: Versión 8.0 (Oreo) o superior
- **SDK mínimo**: Android API 26
- **SDK objetivo**: Android API 34
- **Arquitectura**: Compatible con ARM, ARM64, x86, x86_64

### Características Principales
- Consulta de infracciones ciudadanas por documento de identidad
- Visualización detallada de infracciones al Código de Convivencia
- Cálculo de multas ciudadanas según SMDLV
- Consulta del Código Nacional de Policía y Convivencia (8 leyes incluidas)
- Gestión de acuerdos de pago para multas ciudadanas
- Sistema de inactividad automática (5 minutos)
- Interfaz optimizada para dispositivos Android

---

## Arquitectura del Sistema

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Screens    │  │  Components  │  │    Styles    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE LÓGICA                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Hooks     │  │  Navigation  │  │    Utils     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                            │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  API Config  │  │  API Service │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                              │
│                http://172.30.0.214:5162                     │
└─────────────────────────────────────────────────────────────┘
```

### Patrón de Arquitectura
- **Patrón**: Component-Based Architecture con Hooks
- **Lenguaje**: TypeScript con tipado estricto
- **Gestión de Estado**: React Hooks + Zustand
- **Navegación**: React Navigation (Stack Navigator)
- **Estilos**: StyleSheet separados por componente
- **Cliente HTTP**: Centralizado con timeout y manejo de errores
- **Caché**: Sistema de caché local para optimizar consultas

---

## Tecnologías Utilizadas

### Frontend Framework
- **React**: 19.1.0
- **React Native**: 0.81.4
- **Expo**: ~54.0.10
- **TypeScript**: ^5.9.3

### Navegación
- **@react-navigation/native**: ^7.1.17
- **@react-navigation/stack**: ^7.4.7
- **@react-navigation/native-stack**: ^7.3.27
- **react-native-gesture-handler**: ~2.28.0
- **react-native-screens**: ~4.16.0
- **react-native-safe-area-context**: ~5.6.0

### Gestión de Estado
- **Zustand**: ^5.0.8
- **React Redux**: ^9.2.0

### UI Components
- **@react-native-picker/picker**: 2.11.1
- **expo-linear-gradient**: ~15.0.7
- **@expo/vector-icons**: Ionicons

### Herramientas de Desarrollo
- **Babel**: ^7.20.0
- **@react-native-community/cli**: latest
- **Expo Status Bar**: ~3.0.8
- **@types/react**: ^19.2.2
- **@types/react-native**: ^0.72.8
- **@types/react-navigation**: ^3.0.8

---

## Estructura del Proyecto

```
Trabajo-de-proyecto-final-react-native/
│
├── assets/                         # Recursos estáticos
│   ├── icon.png                    # Ícono de la app
│   ├── splash-icon.png             # Pantalla de carga
│   ├── adaptive-icon.png           # Ícono adaptativo Android
│   └── favicon.png                 # Favicon para web
│
├── src/                            # Código fuente principal
│   ├── api/                        # Configuración de API y servicios
│   │   ├── apiClient.ts            # Cliente HTTP centralizado con timeout
│   │   ├── config.ts               # URL base de la API
│   │   ├── infraccionesApi.ts      # API de infracciones
│   │   ├── infraccionesCache.ts    # Caché de infracciones
│   │   ├── paymentAgreementApi.ts  # API de acuerdos de pago
│   │   ├── userApi.ts              # API de usuarios
│   │   └── userCache.ts            # Caché de usuarios
│   │
│   ├── components/                 # Componentes reutilizables
│   │   └── BackButton.tsx          # Botón de retroceso
│   │
│   ├── hooks/                      # Custom Hooks (TypeScript)
│   │   ├── useCodigoConvivencia.ts # Hook para código de convivencia
│   │   ├── useConsultaSmlv.ts      # Hook para consulta SMDLV
│   │   ├── useDetalleInfraccion.ts # Hook para detalle de infracción
│   │   ├── useDetalleLey.ts        # Hook para detalle de ley
│   │   ├── useDetalleSmlv.ts       # Hook para detalle SMDLV
│   │   ├── useInactivity.ts        # Hook de inactividad
│   │   ├── useMultas.ts            # Hook principal de multas
│   │   ├── useMultasResultado.ts   # Hook para resultados
│   │   └── usePaymentAgreements.ts # Hook de acuerdos de pago
│   │
│   ├── img/                        # Imágenes de la aplicación
│   │   ├── curva-perfil.png        # Fondo decorativo
│   │   └── image 6.png             # Logo principal
│   │
│   ├── navigation/                 # Configuración de navegación
│   │   └── AppNavigator.tsx        # Navegador principal
│   │
│   ├── screens/                    # Pantallas de la aplicación (TypeScript)
│   │   ├── AcuerdoPagoScreen.tsx   # Pantalla de acuerdos de pago
│   │   ├── BienvenidaScreen.tsx    # Pantalla de bienvenida
│   │   ├── CodigoConvivenciaScreen.tsx  # Código de convivencia
│   │   ├── ConsultaSmlvScreen.tsx  # Consulta SMDLV
│   │   ├── DetalleInfraccionScreen.tsx  # Detalle de infracción
│   │   ├── DetalleLeyScreen.tsx    # Detalle de ley
│   │   ├── DetalleSmlvScreen.tsx   # Detalle SMDLV
│   │   ├── MultasResultadoScreen.tsx    # Resultados de multas
│   │   └── MultasScreen.tsx        # Pantalla principal de multas
│   │
│   └── styles/                     # Estilos por componente (TypeScript)
│       ├── AcuerdoPagoScreenStyles.ts
│       ├── AppStyles.ts
│       ├── CodigoConvivenciaScreenStyles.ts
│       ├── ConsultaSmlvScreenStyles.ts
│       ├── DetalleInfraccionScreenStyles.ts
│       ├── DetalleLeyScreenStyles.ts
│       ├── DetalleSmlvScreenStyles.ts
│       ├── MultasResultadoScreenStyles.ts
│       └── MultasScreenStyles.ts
│
├── App.tsx                         # Punto de entrada principal
├── app.json                        # Configuración de Expo
├── babel.config.js                 # Configuración de Babel
├── index.ts                        # Registro de la app
├── package.json                    # Dependencias del proyecto
├── package-lock.json               # Lock de dependencias
├── tsconfig.json                   # Configuración de TypeScript
├── MANUAL_TECNICO_MOVIL.md         # Manual técnico
└── MANUAL_USUARIO_MOVIL.md         # Manual de usuario
```

---

## Instalación y Configuración

### Requisitos Previos
- **Node.js**: 16.x o superior
- **npm**: 8.x o superior
- **Expo CLI**: Instalado globalmente
- **Android Studio** (para desarrollo Android)
- **Xcode** (para desarrollo iOS en macOS)

### Instalación Inicial

#### 1. Clonar el repositorio
```bash
git clone <https://github.com/DanielCaicedo26/Trabajo-de-proyecto-final-react-native.git>
cd Trabajo-de-proyecto-final-react-native
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno

Editar `src/api/config.ts`:
```typescript
const DEFAULT_API_HOST = 'http://TU_IP_O_DOMINIO:PUERTO';
```

**Valor actual por defecto**: `http://172.30.0.214:5162`

O usar variables de entorno (recomendado):
```bash
# Crear archivo .env
API_HOST=http://172.30.0.214:5162
```

La aplicación incluye un cliente HTTP centralizado ([src/api/apiClient.ts](src/api/apiClient.ts)) con las siguientes características:
- Timeout configurable (15 segundos por defecto)
- Manejo automático de errores
- Soporte para parámetros de query
- Cancelación de solicitudes

#### 4. Iniciar el proyecto

**Modo desarrollo**:
```bash
npm start
# o
expo start
```

**Android**:
```bash
npm run android
# o
expo start --android
```

**iOS** (solo macOS):
```bash
npm run ios
# o
expo start --ios
```

**Web**:
```bash
npm run web
# o
expo start --web
```

---

## Componentes Principales

### 1. Screens (Pantallas)

#### BienvenidaScreen.js
**Propósito**: Pantalla inicial de la aplicación

**Características**:
- Logo animado
- Botón de inicio
- Fondo con imagen decorativa

**Hook principal**: `useInactivity`

```javascript
// Estructura básica
const BienvenidaScreen = ({ navigation }) => {
  // Lógica de animaciones
  // Navegación a MultasScreen
  return (
    <View>
      <Image source={logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Multas')}>
        <Text>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};
```

#### MultasScreen.js
**Propósito**: Consulta de infracciones ciudadanas al Código de Convivencia por documento

**Campos**:
- Tipo de documento (Picker): CC, TI, CE
- Número de documento (TextInput)
- Términos y condiciones (Checkbox)

**Hook principal**: `useMultas`

**Validaciones**:
- Documento numérico
- Términos aceptados
- Tipo de documento seleccionado

**Estados**:
- `loading`: Consulta en proceso
- `error`: Mensaje de error
- `acceptedTerms`: Estado del checkbox

**API Call**: `GET /api/infractions/{tipoId}/{numeroDocumento}`

#### MultasResultadoScreen.js
**Propósito**: Mostrar resultados de infracciones ciudadanas

**Características**:
- Lista de infracciones al Código de Convivencia (FlatList)
- Búsqueda en tiempo real por tipo de infracción
- Selección múltiple de infracciones
- Expansión de detalles
- Resumen de cuenta

**Hook principal**: `useMultasResultado`

**Tipos de infracciones mostradas**:
- Amenazas, agresiones, discriminación, uso de pólvora, etc.

#### CodigoConvivenciaScreen.js
**Propósito**: Consulta del Código Nacional de Policía y Convivencia

**Características**:
- Búsqueda de leyes ciudadanas
- Lista filtrada de leyes
- Navegación a detalle de ley

**Hook principal**: `useCodigoConvivencia`

**Leyes incluidas** (8 leyes predefinidas):
1. **LEY 1801 DE 2016**: Código Nacional de Policía y Convivencia
   - Amenazas, comportamientos contrarios a la tranquilidad
   - Multa: 4 a 8 SMDLV

2. **LEY 2318 DE 2023**: Diversidad sexual y de género
   - Restricción de muestras de afecto por discriminación
   - Multa: 8 a 16 SMDLV

3. **LEY 2197 DE 2022**: Violencia contra servidores públicos
   - Agresión física a personas
   - Multa: 16 a 32 SMDLV

4. **LEY 2054 DE 2022**: Control de artículos pirotécnicos
   - Uso o manejo de pólvora sin cumplir normas
   - Multa: 8 a 32 SMDLV + decomiso

5. **LEY 1804 DE 2016**: Protección primera infancia (Ley Cero a Siempre)
   - Sanciones según vulneración de derechos del menor

6. **LEY 1257 DE 2008**: Protección contra violencia hacia la mujer
   - Medidas de protección

7. **LEY 1098 DE 2006**: Código de Infancia y Adolescencia
   - Protección de derechos de menores

8. **LEY 599 DE 2000**: Código Penal Colombiano
   - Tipificación de conductas delictivas

**Filtrado**: Por título y descripción de comportamientos

#### AcuerdoPagoScreen.js
**Propósito**: Gestión de acuerdos de pago

**Características**:
- Acordeón expandible
- Búsqueda avanzada
- Estados visuales (pagado/pendiente)
- Información detallada

**Hook principal**: `usePaymentAgreements`

**Secciones**:
1. Información Personal
2. Detalles de Infracción
3. Detalles del Acuerdo
4. Información Financiera

#### ConsultaSmlvScreen.js
**Propósito**: Consulta de tipos de multas SMDLV

**Características**:
- Lista de tipos de multas
- Navegación a cálculo detallado

**Hook principal**: `useConsultaSmlv`

#### DetalleSmlvScreen.js
**Propósito**: Cálculo detallado de multa según SMDLV

**Información mostrada**:
- Número de SMDLV
- Salario mínimo vigente
- Cálculo del SMDLV
- Valor de un SMDLV
- Cálculo de multa
- Valor total

**Hook principal**: `useDetalleSmlv`

#### DetalleInfraccionScreen.js
**Propósito**: Detalle completo de una infracción

**Secciones**:
- Información de infracción
- Fecha y hora
- Información de multa
- Monto y fecha máxima

**Hook principal**: `useDetalleInfraccion`

#### DetalleLeyScreen.js
**Propósito**: Detalle completo de una ley

**Información**:
- Título
- Descripción
- Texto completo
- Multas
- Artículos relacionados

**Hook principal**: `useDetalleLey`

---

### 2. Custom Hooks

#### useInactivity.js
**Propósito**: Gestionar inactividad del usuario

**Parámetros**:
- `navigation`: Objeto de navegación
- `timeout`: Tiempo de inactividad (default: 300000ms = 5min)

**Funcionalidad**:
```javascript
const useInactivity = (navigation, timeout = 300000) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      navigation.navigate('Bienvenida');
    }, timeout);
  };

  return { resetTimer, timerRef };
};
```

**Uso**:
- Se importa en cada pantalla
- Se llama `resetTimer()` en cada interacción
- Se limpia el timer en `useEffect` cleanup

#### useMultas.js
**Propósito**: Lógica de consulta de multas

**Estados**:
- `tipoDocumento`: Tipo seleccionado
- `numeroDocumento`: Número ingresado
- `acceptedTerms`: Términos aceptados
- `showTermsModal`: Modal de términos
- `loading`: Estado de carga
- `error`: Mensaje de error

**Funciones principales**:
```javascript
const handleConsultarMultas = async () => {
  if (!acceptedTerms || !tipoDocumento || !numeroDocumento) {
    setError('Complete todos los campos');
    return;
  }

  setLoading(true);
  try {
    const tipoId = tipoDocumentoIdMap[tipoDocumento];
    const response = await fetch(
      `${API_HOST}/api/infractions/${tipoId}/${numeroDocumento}`
    );
    const data = await response.json();

    navigation.navigate('MultasResultado', {
      infracciones: data,
      displayName: data[0]?.firstName,
      docNumber: numeroDocumento
    });
  } catch (error) {
    setError('Error al consultar multas');
  } finally {
    setLoading(false);
  }
};
```

**Mapeo de tipos de documento**:
```javascript
const tipoDocumentoIdMap = {
  'cc': 1,  // Cédula de Ciudadanía
  'ti': 2,  // Tarjeta de Identidad
  'ce': 3   // Cédula de Extranjería
};
```

#### useMultasResultado.js
**Propósito**: Gestión de resultados de multas

**Estados**:
- `query`: Texto de búsqueda
- `selectedIds`: IDs seleccionados
- `filteredMultas`: Multas filtradas

**Funciones**:
```javascript
const toggleSelect = (id) => {
  setSelectedIds(prev =>
    prev.includes(id)
      ? prev.filter(item => item !== id)
      : [...prev, id]
  );
};

const onQueryChange = (text) => {
  setQuery(text);
  const filtered = multas.filter(item =>
    item.typeInfractionName?.toLowerCase().includes(text.toLowerCase()) ||
    item.observations?.toLowerCase().includes(text.toLowerCase()) ||
    item.firstName?.toLowerCase().includes(text.toLowerCase())
  );
  setFilteredMultas(filtered);
};
```

**Utilidades**:
```javascript
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
};

const resumen = (multas) => {
  const count = multas.length;
  const total = multas.reduce((sum, m) =>
    sum + (Number(m.value) || 0), 0
  );
  return { count, total };
};
```

#### usePaymentAgreements.js
**Propósito**: Gestión de acuerdos de pago

**Funciones principales**:
```javascript
const fetchPaymentAgreements = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${API_HOST}/api/payment-agreements`);
    const data = await response.json();
    setAgreementsData(data);
    setFilteredData(data);
  } catch (error) {
    console.error('Error fetching payment agreements:', error);
    setAgreementsData([]);
  } finally {
    setLoading(false);
  }
};

const toggleExpanded = (id) => {
  setExpandedItems(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO');
};
```

#### useCodigoConvivencia.js
**Propósito**: Búsqueda en código de convivencia

**Funcionalidad**:
```javascript
const [query, setQuery] = useState('');
const [filteredLeyes, setFilteredLeyes] = useState(leyes);

useEffect(() => {
  if (query.trim() === '') {
    setFilteredLeyes(leyes);
  } else {
    const filtered = leyes.filter(ley =>
      ley.titulo.toLowerCase().includes(query.toLowerCase()) ||
      ley.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLeyes(filtered);
  }
}, [query]);
```

#### useDetalleSmlv.js
**Propósito**: Cálculo de valores SMDLV

**Constantes**:
```javascript
const SALARIO_MINIMO = 1423500; // Salario mínimo 2025
const SMLDV = SALARIO_MINIMO / 30; // Salario mínimo legal diario
```

**Cálculos**:
```javascript
const valorSmdlv = SMLDV;
const valorTotal = valorSmdlv * smdlv;

const formatos = {
  salarioTexto: formatCurrency(SALARIO_MINIMO),
  calculoSmdlvTexto: `$${formatCurrency(SALARIO_MINIMO)} / 30`,
  valorSmdlvTexto: formatCurrency(valorSmdlv),
  valorTotalTexto: formatCurrency(valorTotal)
};
```

---

### 3. Componentes Reutilizables

#### BackButton.js
**Propósito**: Botón de navegación hacia atrás

**Props**:
- `onPress`: Función de callback
- `style`: Estilos adicionales

**Implementación**:
```javascript
const BackButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={24} color="#01763C" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
```

---

### 4. Navegación

#### AppNavigator.js
**Tipo**: Stack Navigator

**Configuración**:
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Bienvenida"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Multas" component={MultasScreen} />
        <Stack.Screen name="MultasResultado" component={MultasResultadoScreen} />
        <Stack.Screen name="CodigoConvivencia" component={CodigoConvivenciaScreen} />
        <Stack.Screen name="DetalleLey" component={DetalleLeyScreen} />
        <Stack.Screen name="DetalleInfraccion" component={DetalleInfraccionScreen} />
        <Stack.Screen name="ConsultaSmlv" component={ConsultaSmlvScreen} />
        <Stack.Screen name="DetalleSmlv" component={DetalleSmlvScreen} />
        <Stack.Screen name="AcuerdoPago" component={AcuerdoPagoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**Navegación entre pantallas**:
```javascript
// Navegar con parámetros
navigation.navigate('MultasResultado', {
  infracciones: data,
  displayName: 'Juan Pérez',
  docNumber: '123456789'
});

// Volver atrás
navigation.goBack();

// Obtener parámetros
const { infracciones } = route.params;
```

---

## Flujo de Datos

### 1. Flujo de Consulta de Infracciones Ciudadanas

```
Usuario ingresa datos (tipo y número de documento)
       ↓
MultasScreen (useMultas)
       ↓
Validación de campos:
  - Tipo documento seleccionado (CC, TI, CE)
  - Número documento ingresado
  - Términos y condiciones aceptados
       ↓
Mapeo de tipo documento a ID:
  - CC → 1
  - TI → 2
  - CE → 3
       ↓
API Call: GET /api/infractions/{tipoId}/{documento}
       ↓
Recepción de datos de infracciones ciudadanas
(amenazas, agresiones, discriminación, etc.)
       ↓
Navegación a MultasResultadoScreen con params:
  - infracciones: array de infracciones
  - displayName: nombre del ciudadano
  - docNumber: número de documento
       ↓
MultasResultadoScreen (useMultasResultado)
       ↓
Renderizado de lista de infracciones al Código de Convivencia
       ↓
Usuario puede:
  - Buscar infracciones por tipo/descripción
  - Seleccionar infracciones (checkbox)
  - Expandir para ver detalles
       ↓
Usuario presiona "Ver más"
       ↓
DetalleInfraccionScreen con datos completos:
  - Tipo de infracción ciudadana
  - Descripción del comportamiento
  - Fecha y hora
  - Monto a pagar
  - Enlace a consulta SMDLV
```

### 2. Flujo de Inactividad

```
Usuario interactúa con pantalla
       ↓
resetTimer() se ejecuta
       ↓
Limpia timer anterior
       ↓
Inicia nuevo timer (5 minutos)
       ↓
Si no hay interacción en 5 min
       ↓
navigation.navigate('Bienvenida')
       ↓
Usuario vuelve a pantalla inicial
```

### 3. Flujo de Cálculo SMDLV

```
Usuario en DetalleInfraccionScreen
       ↓
Presiona "Consulta SMDLV"
       ↓
ConsultaSmlvScreen muestra tipos de multas
       ↓
Usuario selecciona tipo
       ↓
DetalleSmlvScreen recibe parámetro smdlv
       ↓
Cálculo automático:
  - SMDLV = SALARIO_MINIMO / 30
  - Valor Total = SMDLV * número_smdlv
       ↓
Renderizado de resultados formateados
```

---

## API y Servicios

### Configuración de API

**Archivo**: `src/api/config.ts`

```typescript
// Archivo de configuración centralizada para las URLs base de la API
let envHost: string | null = null;
try {
	// Intentar leer de `process.env` (útil en builds o cuando se use react-native-dotenv)
	envHost = process.env.API_HOST || null;
} catch (e) {
	// ignore
}

// Valor por defecto (mantener el comportamiento anterior si no hay env configurada)
const DEFAULT_API_HOST = 'http://172.30.0.214:5162';

export const API_HOST: string = envHost || DEFAULT_API_HOST;

// También exportamos una función por si se necesita resolución dinámica desde otras fuentes.
export function getApiHost(): string {
	return API_HOST;
}
```

### Cliente HTTP Centralizado

**Archivo**: `src/api/apiClient.ts`

La aplicación utiliza un cliente HTTP centralizado con las siguientes características:

```typescript
// Cliente HTTP central para fetch con timeout y manejo básico de errores
const DEFAULT_TIMEOUT = 15000; // 15s

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<any>
```

**Características del cliente HTTP**:
- **Timeout configurable**: 15 segundos por defecto, evita solicitudes colgadas
- **Manejo de errores**: Captura errores HTTP y de red
- **Cancelación de solicitudes**: Usa AbortController para cancelar requests
- **Construcción de URLs**: Maneja parámetros de query automáticamente
- **Parsing de JSON**: Maneja respuestas JSON y texto
- **Manejo de timeout**: Mensaje amigable cuando se excede el tiempo de espera

### Sistema de Caché

La aplicación implementa un sistema de caché para optimizar las consultas:

**Infracciones** ([src/api/infraccionesCache.ts](src/api/infraccionesCache.ts)):
```typescript
export function setInfracciones(infracciones: any[]): void
export function getInfracciones(): any[] | null
```

**Usuarios** ([src/api/userCache.ts](src/api/userCache.ts)):
- Almacena datos de usuario consultados
- Reduce llamadas redundantes a la API

### Endpoints

#### 1. Consulta de Infracciones
```
GET /api/infractions/{tipoDocumentoId}/{numeroDocumento}
```

**Parámetros**:
- `tipoDocumentoId`: 1 (CC), 2 (TI), 3 (CE)
- `numeroDocumento`: Número de documento

**Respuesta**:
```json
[
  {
    "id": 1,
    "typeInfractionName": "Exceso de velocidad",
    "observations": "Conducir a 120km/h en zona de 80km/h",
    "dateInfraction": "2025-01-15",
    "firstName": "Juan",
    "lastName": "Pérez",
    "value": 500000,
    "isPaid": false
  }
]
```

#### 2. Acuerdos de Pago
```
GET /api/payment-agreements
```

**Respuesta**:
```json
[
  {
    "id": 1,
    "personName": "Juan Pérez",
    "documentNumber": "123456789",
    "phoneNumber": "3001234567",
    "address": "Calle 123 #45-67",
    "neighborhood": "Centro",
    "typeFine": "tipo uno ",
    "infringement": "ruido a altas horas de la noche ",
    "agreementStart": "2025-01-01",
    "agreementEnd": "2025-12-31",
    "paymentMethod": "Mensual",
    "installments": 12,
    "baseAmount": 500000,
    "monthlyFee": 45000,
    "outstandingAmount": 450000,
    "isCoactive": false,
    "isPaid": false
  }
]
```

### Manejo de Errores

```javascript
const handleApiCall = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/endpoint`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error en API:', error);

    if (error.message.includes('Network')) {
      setError('Error de conexión. Verifica tu internet.');
    } else if (error.message.includes('404')) {
      setError('No se encontraron datos.');
    } else {
      setError('Error al consultar información.');
    }
  }
};
```

---

## Guía de Desarrollo

### Convenciones de Código

#### Migración a TypeScript
El proyecto ha sido migrado completamente a TypeScript para mayor seguridad de tipos y mejor experiencia de desarrollo.

#### Nomenclatura
- **Componentes**: PascalCase (ej. `MultasScreen`, `BackButton`)
- **Funciones**: camelCase (ej. `handleConsultarMultas`, `resetTimer`)
- **Constantes**: UPPER_SNAKE_CASE (ej. `API_HOST`, `SALARIO_MINIMO`)
- **Interfaces**: PascalCase con prefijo I opcional (ej. `InfraccionInput`, `ApiError`)
- **Tipos**: PascalCase (ej. `ApiFetchOptions`)
- **Archivos de componentes**: PascalCase.tsx
- **Archivos de estilos**: PascalCaseStyles.ts
- **Archivos de hooks**: useNombre.ts
- **Archivos de API**: nombreApi.ts

#### Estructura de Componente (TypeScript)
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComponentStyles';
import useCustomHook from '../hooks/useCustomHook';

// Definir tipos para las props
interface ComponentNameProps {
  navigation: any;
  route?: any;
}

const ComponentName: React.FC<ComponentNameProps> = ({ navigation, route }) => {
  // 1. Hooks con tipos
  const [state, setState] = useState<string>(initialValue);
  const { customData } = useCustomHook();

  // 2. Efectos
  useEffect(() => {
    // Efecto
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // 3. Funciones con tipos explícitos
  const handleAction = (): void => {
    // Lógica
  };

  // 4. Renderizado
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{state}</Text>
      <TouchableOpacity onPress={handleAction}>
        <Text>Acción</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComponentName;
```

#### Definición de Tipos e Interfaces
```typescript
// Interfaces para datos de entrada
interface InfraccionInput {
  typeInfractionName?: string;
  observations?: string;
  value?: number;
  dateInfraction?: string;
  [key: string]: any; // Para propiedades dinámicas
}

// Interfaces para datos procesados
interface InfraccionProcessed extends Omit<InfraccionInput, 'value'> {
  tipo: string;
  descripcion: string;
  valorTexto: string;
}

// Tipos para opciones de configuración
interface ApiFetchOptions {
  timeout?: number;
  params?: Record<string, any> | null;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

// Tipos para errores personalizados
interface ApiError extends Error {
  status?: number;
  body?: any;
}
```

### Mejores Prácticas

#### 1. Separación de Concerns
- Lógica de negocio en hooks
- Presentación en componentes
- Estilos en archivos separados

#### 2. Gestión de Estado
```javascript
// Usar useState para estado local
const [count, setCount] = useState(0);

// Usar useEffect para efectos secundarios
useEffect(() => {
  fetchData();
}, []);

// Usar useRef para valores que no causan re-render
const timerRef = useRef(null);
```

#### 3. Performance
```javascript
// Memoización de componentes
const MemoizedComponent = React.memo(Component);

// Callbacks memoizados
const handleClick = useCallback(() => {
  // Lógica
}, [dependencies]);

// Valores computados memoizados
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

#### 4. Manejo de Errores
```javascript
try {
  // Código que puede fallar
  await apiCall();
} catch (error) {
  console.error('Error:', error);
  setError('Mensaje amigable para el usuario');
} finally {
  setLoading(false);
}
```

#### 5. Estilos Responsivos
```javascript
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.5
  }
});
```

### Crear un Nuevo Screen (TypeScript)

1. **Crear archivo de componente**:
```bash
src/screens/NewScreen.tsx
```

2. **Crear archivo de estilos**:
```bash
src/styles/NewScreenStyles.ts
```

3. **Crear hook (si es necesario)**:
```bash
src/hooks/useNewScreen.ts
```

4. **Registrar en navegación**:
```typescript
// AppNavigator.tsx
<Stack.Screen name="NewScreen" component={NewScreen} />
```

5. **Implementar componente básico**:
```typescript
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles/NewScreenStyles';
import useNewScreen from '../hooks/useNewScreen';

// Definir props
interface NewScreenProps {
  navigation: any;
  route?: any;
}

const NewScreen: React.FC<NewScreenProps> = ({ navigation, route }) => {
  const { data, loading } = useNewScreen(navigation);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text>New Screen</Text>
    </View>
  );
};

export default NewScreen;
```

6. **Implementar hook personalizado**:
```typescript
// src/hooks/useNewScreen.ts
import { useState, useEffect } from 'react';

interface UseNewScreenReturn {
  data: any;
  loading: boolean;
  error: string | null;
}

const useNewScreen = (navigation: any): UseNewScreenReturn => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lógica del hook
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      // Llamada a API
      const result = await fetch('...');
      setData(result);
    } catch (err) {
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useNewScreen;
```

### Testing (Recomendado)

Aunque actualmente no hay tests implementados, se recomienda:

#### Jest para Unit Tests
```bash
npm install --save-dev jest @testing-library/react-native
```

#### Ejemplo de test
```javascript
import { render } from '@testing-library/react-native';
import BackButton from '../components/BackButton';

describe('BackButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <BackButton onPress={() => {}} />
    );
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BackButton onPress={mockOnPress} />
    );
    fireEvent.press(getByTestId('back-button'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
```

---

## Despliegue

### Build para Android

#### 1. Configuración
Editar `app.json`:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.appname",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

#### 2. Generar APK
```bash
# EAS Build (Recomendado)
npm install -g eas-cli
eas build --platform android

# O local con Expo
expo build:android
```

#### 3. Tipo de build
- **APK**: Para distribución directa
- **AAB**: Para Google Play Store

### Build para iOS

#### 1. Configuración
Editar `app.json`:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.appname",
      "buildNumber": "1.0.0",
      "supportsTablet": true
    }
  }
}
```

### Distribución de la Aplicación

** Importante:** Esta aplicación solo se distribuye para Android.

#### Opción 1: Distribución Directa mediante APK (se esta implementando todavia )

Esta es la forma más común para aplicaciones institucionales o internas.

**Ventajas:**
- No requiere cuenta de desarrollador de Google
- Control total sobre la distribución
- Instalación inmediata
- Sin comisiones de tienda

**Pasos:**
1. Generar APK firmado (ver sección anterior)
2. Distribuir el archivo APK mediante:
   - Correo electrónico
   - Código QR
3. Los usuarios deben:
   - Descargan expo go 
   - Escanear el coidgo QR o entrar al link

**Consideraciones de seguridad:**
- Firmar el APK con un certificado válido
- Distribuir solo a través de canales oficiales
- Verificar checksum del archivo
- Mantener un registro de versiones distribuidas

#### Opción 2: Google Play Console (Opcional)

Si decides publicar en Google Play Store:

**Requisitos:**
- Cuenta de desarrollador de Google ($25 único pago)
- Cumplir con políticas de Google Play
- Completar ficha de la aplicación

**Pasos:**
1. Crear cuenta de desarrollador en Google Play Console
2. Crear nueva aplicación
3. Subir AAB generado
4. Completar información de la tienda:
   - Título y descripción
   - Capturas de pantalla
   - Íconos
   - Categoría
   - Clasificación de contenido
5. Configurar precios y distribución
6. Enviar para revisión
7. Lanzar versión interna/beta/producción

**Nota:** Para aplicaciones institucionales, la distribución directa mediante APK suele ser más práctica.

#### Opción 3: Distribución Interna mediante Google Play (Enterprise)

Para organizaciones grandes:
- Requiere Google Play para Empresas
- Distribución privada
- Gestión centralizada de dispositivos

---

## Mantenimiento

### Actualizar Dependencias

#### Verificar versiones
```bash
npm outdated
```

#### Actualizar todas las dependencias
```bash
npm update
```

#### Actualizar dependencia específica
```bash
npm install package-name@latest
```

#### Actualizar Expo SDK
```bash
expo upgrade
```

### Logs y Debugging

#### Logs en desarrollo
```bash
# Ver todos los logs
expo start

# Solo logs de Android
expo start --android
```

#### Debug en Chrome
```javascript
console.log('Debug info:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

#### React Native Debugger
```bash
# Instalar
npm install -g react-native-debugger

# Usar en Android
# Presionar Cmd+M (Android) o agitar el dispositivo
# Seleccionar "Debug"
```

#### Depuración en Dispositivo Físico
```bash
# Verificar dispositivos conectados
adb devices

# Ver logs en tiempo real
adb logcat *:S ReactNative:V ReactNativeJS:V

# Limpiar logs
adb logcat -c
```

### Monitoreo de Performance

#### React DevTools
```bash
npm install -g react-devtools
react-devtools
```

#### Performance Monitoring
```javascript
import { PerformanceObserver } from 'react-native';

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure'] });
```

### Versionado

#### Actualizar versión para Android
```json
// package.json
{
  "version": "1.1.0"
}

// app.json
{
  "expo": {
    "version": "1.1.0",
    "android": {
      "versionCode": 2,
      "package": "com.yourcompany.appname"
    }
  }
}
```

**Importante para Android:**
- `version`: Versión visible para usuarios (ej: "1.1.0")
- `versionCode`: Número interno incremental (debe aumentar en cada release)
  - Primera versión: 1
  - Segunda versión: 2
  - Tercera versión: 3, etc.

#### Semantic Versioning
- **MAJOR**: Cambios incompatibles (1.0.0 → 2.0.0)
- **MINOR**: Nueva funcionalidad compatible (1.0.0 → 1.1.0)
- **PATCH**: Correcciones de bugs (1.0.0 → 1.0.1)

**Ejemplo de versionado:**
```
1.0.0 (versionCode: 1) - Lanzamiento inicial
1.0.1 (versionCode: 2) - Corrección de bugs
1.1.0 (versionCode: 3) - Nueva funcionalidad
2.0.0 (versionCode: 4) - Cambios mayores
```

---

## Troubleshooting

### Problemas Comunes

#### 1. Error de Metro Bundler
```bash
# Limpiar cache
expo start -c

# O
npx react-native start --reset-cache
```

#### 2. Error de node_modules
```bash
# Eliminar y reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

#### 3. Error de build Android
```bash
# Limpiar build de Android
cd android
./gradlew clean
cd ..
```

#### 4. Error de Gradle (Android)
```bash
# Limpiar cache de Gradle
cd android
./gradlew clean
./gradlew cleanBuildCache

# Si persiste, eliminar carpetas de build
rm -rf app/build
rm -rf build

# Regenerar wrapper de Gradle
./gradlew wrapper

cd ..
```

#### 5. Error de conexión de dispositivo Android
```bash
# Verificar dispositivos conectados
adb devices

# Reiniciar servidor ADB
adb kill-server
adb start-server

# Verificar puerto
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7286 tcp:7286  # Para la API
```

#### 6. Error de API Connection
```javascript
// Verificar configuración
console.log('API Host:', API_HOST);

// Verificar acceso
const testConnection = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/health`);
    console.log('API Status:', response.status);
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

#### 6. Error de Inactividad no funciona
```javascript
// Verificar que resetTimer se llama
const resetTimer = () => {
  console.log('Timer reset');
  // Resto del código
};

// Verificar cleanup
useEffect(() => {
  return () => {
    console.log('Cleaning timer');
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, []);
```

### Logs de Debugging

#### Habilitar logs detallados
```javascript
// En desarrollo
if (__DEV__) {
  console.log('Development mode');
  console.log('API Host:', API_HOST);
}
```

#### Capturar errores globales
```javascript
// App.js
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error('Global Error:', error, isFatal);
});
```

---

## Optimizaciones

### Performance

#### 1. Optimizar Listas
```javascript
// Usar FlatList con optimizaciones
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id.toString()}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

#### 2. Optimizar Imágenes
```javascript
// Usar Image con optimizaciones
<Image
  source={require('./image.png')}
  resizeMode="cover"
  style={styles.image}
  cache="force-cache"
/>

// Para imágenes remotas
<Image
  source={{ uri: imageUrl }}
  defaultSource={require('./placeholder.png')}
/>
```

#### 3. Reducir Re-renders
```javascript
// Memoizar componentes
const MemoizedItem = React.memo(({ item }) => (
  <View>
    <Text>{item.name}</Text>
  </View>
));

// Memoizar callbacks
const handlePress = useCallback((id) => {
  doSomething(id);
}, []);
```

### Seguridad

#### 1. Validación de Entrada
```javascript
const validateDocumento = (documento) => {
  // Solo números
  if (!/^\d+$/.test(documento)) {
    return false;
  }

  // Longitud válida
  if (documento.length < 6 || documento.length > 12) {
    return false;
  }

  return true;
};
```

#### 2. Sanitización de Datos
```javascript
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, ''); // Eliminar caracteres peligrosos
};
```

#### 3. HTTPS en Producción
```javascript
// config.js
const API_HOST = __DEV__
  ? 'http://localhost:7286'
  : 'https://api.production.com';
```

### Accesibilidad

```javascript
// Añadir labels de accesibilidad
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Consultar multas"
  accessibilityHint="Presiona para buscar tus multas"
  onPress={handleConsultar}
>
  <Text>Consultar</Text>
</TouchableOpacity>

// Añadir roles
<View accessibilityRole="button">
  <Text>Botón</Text>
</View>
```

---

## Recursos Adicionales

### Documentación Oficial
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://docs.pmnd.rs/zustand/)

### Herramientas de Desarrollo
- [React DevTools](https://github.com/facebook/react-devtools)
- [Flipper](https://fbflipper.com/)
- [Reactotron](https://github.com/infinitered/reactotron)

### Comunidad
- [React Native Community](https://github.com/react-native-community)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## Contacto Técnico

Para soporte técnico o consultas sobre el desarrollo:
- Documentar issues en el repositorio
- Incluir logs y pasos para reproducir
- Especificar versión de la app y del sistema operativo

---

## Cambios Recientes y Mejoras

### Migración a TypeScript (Última actualización)
**Fecha**: Enero 2025

El proyecto ha sido completamente migrado a TypeScript, lo que proporciona:

**Beneficios**:
- ✅ Seguridad de tipos en tiempo de compilación
- ✅ Mejor autocompletado en IDEs
- ✅ Detección temprana de errores
- ✅ Documentación implícita con tipos
- ✅ Refactoring más seguro

**Archivos migrados**:
- Todos los componentes de pantallas (`.tsx`)
- Todos los hooks personalizados (`.ts`)
- Todos los archivos de estilos (`.ts`)
- Toda la capa de API y servicios (`.ts`)
- Componentes reutilizables (`.tsx`)

### Mejoras en la Arquitectura API

**Cliente HTTP Centralizado** ([src/api/apiClient.ts](src/api/apiClient.ts)):
- Implementación de timeout (15s por defecto)
- Manejo automático de errores
- Cancelación de solicitudes con AbortController
- Parsing robusto de respuestas JSON

**Sistema de Caché**:
- Caché de infracciones consultadas ([src/api/infraccionesCache.ts](src/api/infraccionesCache.ts))
- Caché de datos de usuario ([src/api/userCache.ts](src/api/userCache.ts))
- Reduce llamadas redundantes a la API
- Mejora la experiencia de usuario

**Configuración Centralizada**:
- Configuración de API mejorada con soporte para variables de entorno
- Valor por defecto actualizado: `http://172.30.0.214:5162`
- Función `getApiHost()` para resolución dinámica

### Mejoras en los Hooks

**useDetalleInfraccion.ts**:
- Mejora en el tipado con `Omit` para evitar conflictos de tipos
- Interface `InfraccionProcessed` más robusta
- Mejor manejo de campos opcionales

**useInactivity.ts**:
- Implementación con tipos estrictos
- Mejor manejo de timers con `useRef`

### Componente BackButton
- Migrado a TypeScript
- Props tipadas correctamente
- Componente reutilizable en todas las pantallas
- Diseño consistente con sombras y estilo Material

### Mejoras en la Experiencia de Usuario
- Tiempo de inactividad configurable por pantalla
- Manejo de errores más informativo
- Indicadores de carga mejorados
- Transiciones suaves entre pantallas

### Historial de Commits Recientes
```
cf469bf - cambios
9da700e - cambio de nombre de los manuales
57ef035 - cambios de descarga
cdc485a - actualiza el manual técnico
4d4e25f - implementacion de manuales
061ab96 - mejora la configuración de la API y centraliza el manejo de solicitudes HTTP
9aa5daf - agrega componente BackButton
cbf887b - se actualizo la version del sdk
9a54286 - el color de los iconos y textos a un tono verde
fae6460 - mejora la estructura y el estilo de AcuerdoPagoScreen
```

### Próximas Mejoras Planeadas
- [ ] Implementar tests unitarios con Jest
- [ ] Agregar tests de integración
- [ ] Mejorar accesibilidad (ARIA labels)
- [ ] Optimización de imágenes y assets
- [ ] Implementar Analytics
- [ ] Modo offline completo
- [ ] Notificaciones push

---

*Manual Técnico - Versión 1.1*
*Última actualización: Enero 2025*
*Repositorio: https://github.com/DanielCaicedo26/Trabajo-de-proyecto-final-react-native*
