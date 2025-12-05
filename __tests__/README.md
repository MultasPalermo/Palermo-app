# Tests

Esta carpeta contiene todos los tests del proyecto, organizados por módulo.

## Estructura

```
__tests__/
├── api/              # Tests de APIs
├── utils/            # Tests de utilidades
└── validation/       # Tests de validaciones y schemas
```

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage

# Ejecutar un test específico
npm test -- <nombre-del-archivo>
```

## Escribir Tests

Los tests deben seguir el formato:

```typescript
import { functionToTest } from '../src/path/to/module';

describe('Module Name', () => {
  it('should do something', () => {
    // Test implementation
  });
});
```

## Cobertura de Tests

La configuración de cobertura está en `jest.config.js` y excluye:
- Archivos de definición de tipos (`.d.ts`)
- Carpetas de tipos (`src/types/`)
- Los propios archivos de tests
