# Aplicación Móvil - Sistema de Multas y Convivencia

Aplicación móvil para la gestión de multas, infracciones y código de convivencia.

## 📁 Estructura del Proyecto

```
Palermo-app/
├── __mocks__/              # Mocks para testing
├── __tests__/              # Tests organizados por módulo
│   ├── api/               # Tests de APIs
│   ├── utils/             # Tests de utilidades
│   └── validation/        # Tests de validaciones
├── assets/                 # Recursos estáticos (imágenes, fuentes)
├── docs/                   # Documentación del proyecto
│   ├── MANUAL_USUARIO_MOVIL.md
│   ├── MANUAL_TECNICO_MOVIL.md
│   ├── REFACTORING_SUMMARY.md
│   └── DOCUMENT_TYPE_API_REFACTORING.md
├── src/                    # Código fuente
│   ├── api/               # Servicios de API
│   ├── components/        # Componentes reutilizables
│   ├── constants/         # Constantes de la aplicación
│   ├── hooks/             # Custom React Hooks
│   ├── img/               # Imágenes
│   ├── interfaces/        # Definiciones de interfaces TypeScript
│   ├── screens/           # Pantallas de la aplicación
│   ├── styles/            # Estilos organizados por pantalla
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilidades y helpers
│   └── validation/        # Esquemas de validación con Zod
├── app.json                # Configuración de Expo
├── jest.config.js          # Configuración de Jest
├── jest.setup.js           # Setup de Jest
├── package.json            # Dependencias
├── swagger.json            # Documentación de API
└── tsconfig.json           # Configuración de TypeScript
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js >= 14
- npm o yarn
- Expo CLI

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Ejecutar en iOS
npm run ios

# Ejecutar en Android
npm run android
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con cobertura
npm test -- --coverage
```

## 📚 Documentación

Toda la documentación del proyecto está disponible en la carpeta [`docs/`](./docs/):

- [Manual de Usuario](./docs/MANUAL_USUARIO_MOVIL.md)
- [Manual Técnico](./docs/MANUAL_TECNICO_MOVIL.md)
- [Resumen de Refactorizaciones](./docs/REFACTORING_SUMMARY.md)

## 🏗️ Arquitectura

### Organización del Código

- **API Layer** (`src/api/`): Gestión de llamadas al backend
- **Presentación** (`src/screens/`, `src/components/`): UI y componentes
- **Lógica de Negocio** (`src/hooks/`): Custom hooks con lógica reutilizable
- **Utilidades** (`src/utils/`): Funciones helper y utilidades
- **Validación** (`src/validation/`): Esquemas de validación con Zod
- **Estilos** (`src/styles/`): Estilos separados por pantalla

### Convenciones de Código

- TypeScript para type safety
- Hooks personalizados para lógica reutilizable
- Separación de estilos en archivos dedicados
- Validación de datos con Zod
- Tests unitarios con Jest

## 🔧 Tecnologías

- **React Native** con Expo
- **TypeScript** para tipado estático
- **React Navigation** para navegación
- **Zod** para validación de schemas
- **Jest** para testing
- **MercadoPago SDK** para pagos

## 📝 Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm test           # Ejecuta los tests
npm run ios        # Ejecuta en simulador iOS
npm run android    # Ejecuta en emulador Android
npm run web        # Ejecuta en navegador web
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Sigue las convenciones de código establecidas
2. Escribe tests para nuevas funcionalidades
3. Actualiza la documentación según sea necesario
4. Usa commits descriptivos

## 📄 Licencia

[Especificar licencia del proyecto]
