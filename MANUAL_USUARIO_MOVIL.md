# Manual de Usuario - Aplicación de Consulta de Infracciones Ciudadanas y Código de Convivencia

## Índice
1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación](#instalación)
4. [Inicio de la Aplicación](#inicio-de-la-aplicación)
5. [Funcionalidades Principales](#funcionalidades-principales)
6. [Guía de Uso Paso a Paso](#guía-de-uso-paso-a-paso)
7. [Preguntas Frecuentes](#preguntas-frecuentes)
8. [Solución de Problemas](#solución-de-problemas)
9. [Contacto y Soporte](#contacto-y-soporte)

---

## Introducción

Bienvenido a la aplicación de Consulta de Infracciones Ciudadanas y Código Nacional de Policía y Convivencia. Esta aplicación móvil te permite:

- **Consultar infracciones y multas ciudadanas** asociadas a tu documento de identidad (infracciones al Código de Policía y Convivencia)
- **Revisar el Código Nacional de Policía y Convivencia** colombiano
- **Consultar acuerdos de pago** activos para multas ciudadanas
- **Calcular valores de multas** según SMDLV (Salario Mínimo Legal Diario Vigente)

**⚠️ Importante:** Esta aplicación está diseñada para consultar **infracciones al Código Nacional de Policía y Convivencia** (multas ciudadanas por comportamientos que afectan la convivencia), **NO para multas de tránsito**.

**Tipos de infracciones que puedes consultar:**
- Amenazas a personas
- Agresiones físicas
- Discriminación
- Uso indebido de pólvora
- Comportamientos que afectan la tranquilidad pública
- Violaciones a derechos de menores
- Violencia contra la mujer
- Otros comportamientos contrarios a la convivencia

La aplicación te facilita el acceso a información sobre tus obligaciones como ciudadano en materia de convivencia de manera rápida y segura.

---

## Requisitos del Sistema

### Dispositivos Compatibles
- **Android**: Versión 8.0 (Oreo) o superior

**⚠️ Nota Importante:** Esta aplicación está disponible **únicamente para dispositivos Android**. No hay versión para iOS (iPhone/iPad) 

### Requisitos Adicionales
- Conexión a Internet (WiFi o datos móviles)
- Espacio de almacenamiento: Todavia no establecido
- Permisos de instalación desde fuentes desconocidas

---

## Instalación

### Instalación con Expo Go (Android)

#### Paso 1: Instalar Expo Go
1. Abre la **Google Play Store** en tu dispositivo Android.
2. Busca **Expo Go** e instálala.

#### Paso 2: Obtener el enlace del proyecto
1. Solicita el enlace QR o el link de tu proyecto Expo al desarrollador o institución.

#### Paso 3: Abrir la aplicación en Expo Go
1. Abre la app **Expo Go** en tu dispositivo.
2. Escanea el código QR proporcionado o ingresa el enlace del proyecto.
3. Espera a que cargue la aplicación.

**Nota:** No es necesario instalar un APK ni habilitar fuentes desconocidas. Solo necesitas Expo Go y conexión a Internet.

---

---

## Inicio de la Aplicación

### Pantalla de Bienvenida
Al abrir la aplicación por primera vez, verás la pantalla de bienvenida con el logo de la aplicación y el botón "Iniciar".

**Funcionalidad de Inactividad:**
- La aplicación tiene un temporizador de inactividad de **5 minutos**
- Si no interactúas con la app durante este tiempo, automáticamente volverás a la pantalla de bienvenida
- Este mecanismo protege tu privacidad en caso de que dejes la aplicación abierta

---

## Funcionalidades Principales

### 1. Consulta de Infracciones Ciudadanas

#### Descripción
Permite consultar todas las infracciones al Código Nacional de Policía y Convivencia y multas ciudadanas asociadas a tu documento de identidad.

#### Pasos para usar:
1. En la pantalla principal, completa los siguientes campos:
   - **Tipo de Documento**: Selecciona entre:
     - Cédula de Ciudadanía (CC)
     - Tarjeta de Identidad (TI)
     - Cédula de Extranjería (CE)
   - **Número de Documento**: Ingresa tu número de identificación

2. **Acepta los Términos y Condiciones**:
   - Marca la casilla de verificación
   - Puedes leer los términos completos tocando el enlace

3. Presiona el botón **"Consultar Multas"**

4. **Pantalla de Resultados**:
   - Verás un resumen con el número total de infracciones ciudadanas
   - Lista de todas las infracciones al Código de Convivencia encontradas
   - Cada infracción muestra:
     - Tipo de infracción (ej: amenazas, agresión física, discriminación)
     - Descripción breve del comportamiento contrario a la convivencia
     - Nombre asociado

#### Funcionalidades Adicionales:
- **Búsqueda**: Usa la barra de búsqueda superior para filtrar infracciones por nombre, tipo o descripción
- **Selección**: Toca el ícono de checkbox para seleccionar/deseleccionar infracciones
- **Ver Detalles**: Toca una infracción para expandir y ver más información
- **Ver más**: Presiona "Ver más" para acceder al detalle completo de la infracción

---

### 2. Detalle de Infracción

Al seleccionar una infracción y presionar "Ver más", accederás a información detallada:

- **Información de la Infracción**:
  - Tipo de infracción
  - Descripción completa
  - Fecha y hora

- **Información de la Multa**:
  - Datos adicionales según el tipo de infracción
  - Estado del proceso

- **Monto y Fechas**:
  - Monto a pagar (si aplica)
  - Fecha máxima de pago

- **Consulta SMDLV**: Toca el enlace "Consulta SMDLV" para calcular el valor de la multa

---

### 3. Consulta SMDLV (Salario Mínimo Legal Diario Vigente)

#### ¿Qué es SMDLV?
El SMDLV es la unidad de medida para calcular las multas en Colombia. Se calcula dividiendo el salario mínimo mensual entre 30 días.

#### Cómo usar:
1. Desde el detalle de una infracción, toca "Consulta SMDLV"
2. Verás las opciones de multas disponibles
3. Selecciona el tipo de multa para ver:
   - Número de SMDLV
   - Salario mínimo vigente
   - Cálculo del SMDLV
   - Valor de un SMDLV
   - Cálculo del valor total de la multa
   - **Valor Total a Pagar**

---

### 4. Código Nacional de Policía y Convivencia

#### Descripción
Consulta las leyes del Código Nacional de Policía y Convivencia colombiano que regulan los comportamientos ciudadanos.

#### Leyes incluidas:
- **LEY 1801 DE 2016**: Código Nacional de Policía y Convivencia (amenazas, agresiones, etc.)
- **LEY 2318 DE 2023**: Diversidad sexual y de género
- **LEY 2197 DE 2022**: Violencia contra servidores públicos
- **LEY 2054 DE 2022**: Control de artículos pirotécnicos
- **LEY 1804 DE 2016**: Protección integral a la primera infancia
- **LEY 1257 DE 2008**: Protección contra violencia hacia la mujer
- **LEY 1098 DE 2006**: Código de Infancia y Adolescencia
- **LEY 599 DE 2000**: Código Penal Colombiano

#### Pasos para usar:
1. Desde la pantalla de resultados de multas, toca el ícono de **"Código de Convivencia"** en la barra inferior
2. Usa la barra de búsqueda para encontrar leyes específicas (ej: "amenazar", "pólvora", "violencia")
3. Verás una lista de leyes con:
   - Título de la ley (ej. LEY 1801 DE 2016)
   - Descripción breve del comportamiento regulado

4. **Ver Detalle de una Ley**:
   - Toca cualquier ley para ver información completa:
     - Descripción detallada del comportamiento contrario a la convivencia
     - Texto completo de la ley
     - Multas asociadas en SMDLV
     - Artículos relacionados del código

---

### 5. Acuerdos de Pago

#### Descripción
Revisa los acuerdos de pago activos asociados a tus infracciones ciudadanas al Código de Convivencia.

#### Pasos para usar:
1. Desde la pantalla de resultados de multas, toca el ícono de **"Acuerdo de Pago"** en la barra inferior
2. Verás una lista de acuerdos con indicadores visuales:
   - **Verde**: Acuerdo pagado
   - **Azul/Gris**: Acuerdo pendiente

3. **Búsqueda**: Usa la barra de búsqueda para filtrar por nombre, documento, tipo o descripción

4. **Expandir Acuerdo**: Toca cualquier acuerdo para ver detalles:

   **Información Personal:**
   - Nombre completo
   - Número de documento
   - Teléfono
   - Dirección

   **Detalles de la Infracción Ciudadana:**
   - Tipo de infracción al Código de Convivencia
   - Descripción del comportamiento contrario a la convivencia

   **Detalles del Acuerdo:**
   - Vigencia del acuerdo
   - Método de pago
   - Número de cuotas

   **Información Financiera:**
   - Monto base
   - Cuota mensual
   - Saldo pendiente
   - Estado del proceso coactivo

5. **Limpiar búsqueda**: Presiona el botón "Limpiar" para reiniciar la búsqueda

---

### 6. Navegación de la Aplicación

#### Barra de Navegación Inferior
La aplicación cuenta con una barra de navegación en la parte inferior con tres opciones:

1. **Infracción** (ícono de lista): Vuelve a la pantalla de resultados de multas
2. **Código de Convivencia** (ícono de libro): Accede al código de convivencia
3. **Acuerdo de Pago** (ícono de tarjeta): Consulta acuerdos de pago

#### Botón de Retroceso
- Todas las pantallas internas tienen un botón de retroceso (←) en la esquina superior izquierda
- Tócalo para volver a la pantalla anterior

---

## Guía de Uso Paso a Paso

### Caso de Uso 1: Consultar mis Multas

1. Abre la aplicación y presiona "Iniciar"
2. Selecciona tu tipo de documento
3. Ingresa tu número de documento
4. Acepta los términos y condiciones
5. Presiona "Consultar Multas"
6. Espera a que cargue la información
7. Revisa la lista de infracciones
8. Toca cualquier infracción para ver más detalles
9. Presiona "Ver más" para información completa

### Caso de Uso 2: Calcular el Valor de una Multa

1. Desde el detalle de una infracción
2. Toca "Consulta SMDLV"
3. Selecciona el tipo de multa correspondiente
4. Revisa el cálculo detallado
5. Verás el valor total a pagar

### Caso de Uso 3: Consultar una Ley Específica

1. Ve a la pantalla de resultados de multas
2. Toca "Código de Convivencia" en la barra inferior
3. Usa la barra de búsqueda
4. Escribe palabras clave (ej. "amenazar", "pólvora", "violencia")
5. Toca la ley que desees consultar
6. Lee el contenido completo

### Caso de Uso 4: Revisar un Acuerdo de Pago

1. Ve a la pantalla de resultados de multas
2. Toca "Acuerdo de Pago" en la barra inferior
3. Espera a que carguen los acuerdos
4. Toca el acuerdo que deseas revisar
5. Revisa toda la información financiera y de contacto
6. Anota la cuota mensual y saldo pendiente

---

## Preguntas Frecuentes

### ¿Por qué la aplicación vuelve al inicio?
La aplicación tiene un temporizador de inactividad de 5 minutos. Si no interactúas con la app durante este tiempo, automáticamente regresarás a la pantalla de bienvenida por seguridad.

### ¿La aplicación guarda mi información?
No, la aplicación no almacena ninguna información personal en el dispositivo. Todas las consultas se realizan en tiempo real al servidor.

### ¿Qué hago si no aparecen mis multas?
- Verifica que tu número de documento esté correcto
- Asegúrate de tener conexión a Internet
- Si el problema persiste, contacta con soporte

### ¿Puedo pagar las multas desde la aplicación?
No, actualmente la aplicación solo permite consultar información. Para realizar pagos, debes dirigirte a las entidades correspondientes.

### ¿Qué significa SMDLV?
SMDLV significa Salario Mínimo Legal Diario Vigente. Es la unidad de medida usada en Colombia para calcular el valor de las multas. Se calcula dividiendo el salario mínimo mensual entre 30.

### ¿Los términos y condiciones son obligatorios?
Sí, debes aceptar los términos y condiciones antes de consultar multas. Esto es necesario para el uso de la aplicación y el tratamiento de datos.

---

## Solución de Problemas

### La aplicación no carga
1. Verifica tu conexión a Internet
2. Cierra completamente la aplicación
3. Vuelve a abrirla
4. Si persiste, reinicia tu dispositivo

### No puedo ver el detalle de una infracción
1. Asegúrate de haber tocado la infracción para expandirla
2. Presiona el botón "Ver más"
3. Si no carga, verifica tu conexión a Internet

### El botón "Consultar Multas" está deshabilitado
Esto sucede cuando:
- No has seleccionado el tipo de documento
- No has ingresado el número de documento
- No has aceptado los términos y condiciones

Solución: Completa todos los campos requeridos

### La búsqueda no funciona
1. Verifica que hayas escrito correctamente
2. Presiona el botón "Limpiar" para reiniciar
3. Intenta con diferentes palabras clave

### Errores comunes

**Error: "No se encontraron multas"**
- Posiblemente no tienes multas registradas
- Verifica que el documento sea correcto
- Presiona "Reintentar"

**Error de conexión**
- Verifica tu conexión WiFi o datos móviles
- Intenta cambiar de red
- Si usas datos móviles, verifica que tengas saldo

**La aplicación se cierra inesperadamente**
- Asegúrate de tener la versión más reciente
- Libera espacio en tu dispositivo
- Reinstala la aplicación si persiste

---

## Contacto y Soporte

### Reportar Problemas
Si encuentras algún problema con la aplicación:

1. Anota el error específico que estás experimentando
2. Toma capturas de pantalla si es posible
3. Contacta al equipo de soporte con esta información

### Sugerencias y Comentarios
Valoramos tu opinión para mejorar la aplicación. Envíanos tus sugerencias y comentarios.

---

## Glosario de Términos

- **SMDLV**: Salario Mínimo Legal Diario Vigente
- **CC**: Cédula de Ciudadanía
- **TI**: Tarjeta de Identidad
- **CE**: Cédula de Extranjería
- **Infracción**: Violación a las normas del Código de Convivencia
- **Proceso Coactivo**: Proceso administrativo para cobrar deudas
- **Acuerdo de Pago**: Convenio para pagar una multa en cuotas

---

## Actualizaciones

**Versión Actual**: 1.0.0

Para verificar actualizaciones:
- Android: Revisa el sitio de descarga oficial
- iOS: Verifica en TestFlight o App Store

---

## Seguridad y Privacidad

- La aplicación no almacena información personal en tu dispositivo
- Todas las consultas son seguras y encriptadas
- El temporizador de inactividad protege tu información
- No compartimos tu información con terceros sin tu consentimiento

---

*Última actualización: 2025*
*Manual de Usuario - Versión 1.0*
