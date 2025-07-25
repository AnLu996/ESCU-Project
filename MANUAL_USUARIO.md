# Manual de Usuario - ESCU Project
## Sistema de Denuncias Anónimas

### Versión: 1.0
### Fecha: Julio 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Registro e Inicio de Sesión](#registro-e-inicio-de-sesión)
4. [Panel de Usuario](#panel-de-usuario)
5. [Crear una Denuncia](#crear-una-denuncia)
6. [Seguimiento de Denuncias](#seguimiento-de-denuncias)
7. [Recursos de Apoyo](#recursos-de-apoyo)
8. [Configuración de Perfil](#configuración-de-perfil)
9. [Funciones de Administrador](#funciones-de-administrador)
10. [Seguridad y Privacidad](#seguridad-y-privacidad)
11. [Preguntas Frecuentes](#preguntas-frecuentes)
12. [Contacto y Soporte](#contacto-y-soporte)

---

## 1. Introducción

### 1.1 ¿Qué es ESCU Project?

ESCU Project es una plataforma web segura y confidencial diseñada para permitir la presentación de **denuncias anónimas** sobre incidentes de acoso, discriminación, violencia o cualquier situación que requiera atención. El sistema también proporciona **recursos de apoyo emocional** para ayudar a las personas que han vivido experiencias difíciles.

### 1.2 Características Principales

✅ **Denuncias completamente anónimas**
✅ **Seguimiento seguro con códigos únicos**
✅ **Recursos de apoyo emocional**
✅ **Interfaz fácil de usar**
✅ **Encriptación de datos sensibles**
✅ **Acceso 24/7 desde cualquier dispositivo**

### 1.3 ¿Quién puede usar el sistema?

- **Usuarios generales**: Cualquier persona que desee reportar un incidente
- **Víctimas**: Personas que han experimentado situaciones difíciles
- **Testigos**: Personas que han observado incidentes
- **Administradores**: Personal autorizado para gestionar denuncias

---

## 2. Acceso al Sistema

### 2.1 Requisitos del Sistema

**Dispositivos compatibles:**
- Computadoras (Windows, macOS, Linux)
- Tablets (iPad, Android)
- Teléfonos móviles (iOS, Android)

**Navegadores recomendados:**
- Google Chrome (versión 90+)
- Mozilla Firefox (versión 88+)
- Safari (versión 14+)
- Microsoft Edge (versión 90+)

### 2.2 Cómo acceder

1. **Abrir el navegador web**
2. **Navegar a la dirección:** `http://localhost:5173` (desarrollo) o la URL proporcionada por tu organización
3. **La página principal se cargará automáticamente**

### 2.3 Navegación sin conexión

⚠️ **Nota importante:** El sistema requiere conexión a internet para funcionar correctamente y garantizar la seguridad de las denuncias.

---

## 3. Registro e Inicio de Sesión

### 3.1 Registro de Nueva Cuenta

#### Paso 1: Acceder al formulario de registro
1. En la página principal, hacer clic en **"Registrarse"**
2. Se abrirá el formulario de registro

#### Paso 2: Completar información
![Formulario de Registro]
- **Alias/Nombre de usuario**: Un nombre único para identificarte (no usar tu nombre real)
- **Correo electrónico**: Un email válido para recuperar tu cuenta
- **Contraseña**: Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números
- **Confirmar contraseña**: Repetir la contraseña

#### Paso 3: Aceptar términos
- ✅ Leer y aceptar los **Términos de Uso**
- ✅ Leer y aceptar la **Política de Privacidad**

#### Paso 4: Completar registro
- Hacer clic en **"Crear Cuenta"**
- Se enviará un mensaje de confirmación

### 3.2 Inicio de Sesión

#### Para usuarios existentes:
1. En la página principal, hacer clic en **"Iniciar Sesión"**
2. Introducir:
   - **Email** o **Alias**
   - **Contraseña**
3. Hacer clic en **"Entrar"**

#### ¿Olvidaste tu contraseña?
1. Hacer clic en **"¿Olvidaste tu contraseña?"**
2. Introducir tu email
3. Revisar tu correo para el enlace de recuperación
4. Seguir las instrucciones del email

---

## 4. Panel de Usuario

### 4.1 Descripción del Panel Principal

Una vez iniciada la sesión, verás el **Panel de Usuario** con las siguientes secciones:

```
┌─────────────────────────────────────────────────────────┐
│                    PANEL PRINCIPAL                      │
├─────────────────────────────────────────────────────────┤
│  📝 Nueva Denuncia    │  📊 Mis Denuncias              │
│  Crear una nueva      │  Ver denuncias                 │
│  denuncia anónima     │  presentadas                   │
├─────────────────────────────────────────────────────────┤
│  💡 Recursos         │  ⚙️ Configuración              │
│  Apoyo emocional     │  Ajustes de                    │
│  y ayuda             │  cuenta                        │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Navegación

**Menú superior:**
- **Inicio**: Regresa al panel principal
- **Nueva Denuncia**: Acceso rápido para crear denuncia
- **Mis Denuncias**: Lista de denuncias presentadas
- **Recursos**: Centro de apoyo y recursos
- **Perfil**: Configuración de cuenta
- **Cerrar Sesión**: Salir del sistema

**Menú lateral (si está disponible):**
- Accesos rápidos a funciones frecuentes
- Notificaciones importantes
- Enlaces de ayuda

---

## 5. Crear una Denuncia

### 5.1 Acceso al Formulario

1. **Desde el panel:** Hacer clic en **"Nueva Denuncia"**
2. **Desde el menú:** Seleccionar **"Nueva Denuncia"** en la barra superior

### 5.2 Completar el Formulario de Denuncia

#### Paso 1: Información Básica
![Formulario Básico]

**Campos obligatorios:**
- **Tipo de Incidente** (seleccionar uno):
  - 🔴 Acoso sexual
  - 🟠 Acoso laboral
  - 🟡 Discriminación
  - 🟢 Violencia física
  - 🔵 Violencia psicológica
  - 🟣 Abuso de poder
  - ⚪ Otro (especificar)

- **Descripción del Incidente**:
  - Describir lo ocurrido de manera detallada
  - Incluir fechas, horas, lugares si es posible
  - Mencionar personas involucradas (sin nombres reales si es necesario)

#### Paso 2: Detalles del Incidente
- **Fecha del Incidente**: Seleccionar la fecha aproximada
- **Hora aproximada**: Si la recuerdas
- **Ubicación**: 
  - Descripción del lugar
  - Dirección (opcional)
  - Coordenadas (automáticas si permites la ubicación)

#### Paso 3: Evidencias (Opcional)
⚠️ **Importante**: Solo subir evidencias si no comprometen tu anonimato

**Tipos de archivo permitidos:**
- 📷 Imágenes: PNG, JPG, JPEG, GIF
- 📹 Videos: MP4, AVI (máximo 50MB)
- 📄 Documentos: PDF (máximo 10MB)

**Para subir evidencias:**
1. Hacer clic en **"Seleccionar Archivos"**
2. Elegir los archivos desde tu dispositivo
3. Esperar a que se suban completamente
4. Verificar que aparezcan en la lista

#### Paso 4: Configuración de Privacidad
- **Nivel de Anonimato**:
  - ✅ **Completamente anónimo** (recomendado)
  - ⚠️ **Semi-anónimo** (solo administradores pueden ver datos básicos)
  
- **Notificaciones**:
  - ✅ Recibir actualizaciones por email
  - ✅ Notificaciones en el sistema

#### Paso 5: Envío de la Denuncia
1. **Revisar toda la información**
2. **Leer la declaración de veracidad**
3. **Hacer clic en "Enviar Denuncia"**

### 5.3 Confirmación de Envío

Una vez enviada la denuncia:

```
┌─────────────────────────────────────────────────────────┐
│                ✅ DENUNCIA ENVIADA                      │
├─────────────────────────────────────────────────────────┤
│  Tu denuncia ha sido recibida correctamente.           │
│                                                         │
│  📋 Código de seguimiento: DENU-2025-001234           │
│                                                         │
│  ⚠️ IMPORTANTE: Guarda este código para poder          │
│     hacer seguimiento de tu denuncia.                  │
│                                                         │
│  📧 Te enviaremos actualizaciones a tu email          │
│     (si activaste las notificaciones)                  │
└─────────────────────────────────────────────────────────┘
```

**¿Qué hacer después?**
- ✅ **Guardar el código** de seguimiento en un lugar seguro
- ✅ **Tomar una captura** de pantalla del código
- ✅ **Anotar el código** en un papel si es necesario

---

## 6. Seguimiento de Denuncias

### 6.1 Ver Mis Denuncias

1. **Acceder**: Hacer clic en **"Mis Denuncias"** en el menú
2. **Ver lista**: Se mostrará una tabla con todas tus denuncias

#### Información mostrada:
```
┌─────────────────────────────────────────────────────────┐
│                    MIS DENUNCIAS                        │
├─────────────────────────────────────────────────────────┤
│ Código        │ Tipo        │ Estado      │ Fecha       │
├─────────────────────────────────────────────────────────┤
│ DENU-001234   │ Acoso       │ En proceso  │ 15/01/2025  │
│ DENU-001235   │ Discrimin.  │ Pendiente   │ 10/01/2025  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Estados de las Denuncias

- 🟡 **Pendiente**: La denuncia fue recibida y está en cola de revisión
- 🔵 **En Proceso**: Un administrador está revisando la denuncia
- 🟢 **Resuelta**: La denuncia fue procesada y se tomaron acciones
- 🔴 **Cerrada**: La denuncia fue cerrada (con o sin acción)
- ⚪ **Requiere información**: Se necesita más información del denunciante

### 6.3 Ver Detalles de una Denuncia

1. **Hacer clic** en el código de la denuncia
2. **Ver información detallada**:
   - Estado actual
   - Fecha de creación
   - Última actualización
   - Comentarios del administrador (si los hay)
   - Acciones tomadas

### 6.4 Seguimiento con Código

Si no tienes cuenta o prefieres el seguimiento anónimo:

1. **Ir a** "Seguimiento de Denuncia" (en la página principal)
2. **Introducir** tu código de seguimiento
3. **Ver el estado** actual de tu denuncia

---

## 7. Recursos de Apoyo

### 7.1 Centro de Recursos

El sistema incluye una sección completa de **Recursos de Apoyo** con:

#### 7.1.1 Artículos Informativos
- 📖 **Cómo lidiar con el trauma**
- 📖 **Derechos de las víctimas**
- 📖 **Técnicas de relajación**
- 📖 **Cuándo buscar ayuda profesional**

#### 7.1.2 Contactos de Emergencia
```
┌─────────────────────────────────────────────────────────┐
│                CONTACTOS DE EMERGENCIA                  │
├─────────────────────────────────────────────────────────┤
│  🚨 Emergencias Generales: 911                         │
│  📞 Línea de Crisis 24h: 1-800-XXX-XXXX               │
│  💬 Chat de Apoyo: www.apoyo-crisis.org               │
│  🏥 Servicios Médicos: 1-800-XXX-XXXX                 │
└─────────────────────────────────────────────────────────┘
```

#### 7.1.3 Herramientas de Autoayuda
- 🧘 **Ejercicios de respiración**
- 🎵 **Meditaciones guiadas**
- 📝 **Diario emocional**
- 🎯 **Técnicas de grounding**

### 7.2 Cómo Acceder a los Recursos

1. **Desde el menú principal**: Hacer clic en **"Recursos"**
2. **Navegar por categorías**:
   - Apoyo Inmediato
   - Información Educativa
   - Herramientas de Autoayuda
   - Servicios Profesionales

### 7.3 Recursos Externos

El sistema también proporciona enlaces a:
- 🏛️ **Organizaciones de apoyo**
- 👥 **Grupos de soporte**
- 🏥 **Servicios de salud mental**
- ⚖️ **Asesoría legal gratuita**

---

## 8. Configuración de Perfil

### 8.1 Acceder a Configuración

1. **Hacer clic** en tu nombre de usuario (esquina superior derecha)
2. **Seleccionar** "Configuración" o "Perfil"

### 8.2 Opciones de Configuración

#### 8.2.1 Información Personal
- **Alias**: Cambiar tu nombre de usuario
- **Email**: Actualizar correo electrónico
- **Contraseña**: Cambiar contraseña actual

#### 8.2.2 Preferencias de Notificaciones
```
┌─────────────────────────────────────────────────────────┐
│              CONFIGURACIÓN DE NOTIFICACIONES            │
├─────────────────────────────────────────────────────────┤
│  ✅ Email cuando cambie el estado de mi denuncia       │
│  ✅ Recordatorios de seguimiento                       │
│  ✅ Nuevos recursos de apoyo disponibles               │
│  ❌ Boletín informativo mensual                        │
└─────────────────────────────────────────────────────────┘
```

#### 8.2.3 Configuración de Privacidad
- **Nivel de anonimato por defecto**
- **Retención de datos**
- **Compartir estadísticas anónimas**

#### 8.2.4 Configuración de Seguridad
- **Autenticación de dos factores** (2FA)
- **Sesiones activas**
- **Historial de accesos**

### 8.3 Eliminar Cuenta

⚠️ **Importante**: La eliminación de cuenta es permanente

1. **Ir a** Configuración → Eliminar Cuenta
2. **Leer** las consecuencias de eliminar la cuenta
3. **Confirmar** escribiendo "ELIMINAR" en el campo
4. **Hacer clic** en "Eliminar Cuenta Permanentemente"

---

## 9. Funciones de Administrador

### 9.1 Acceso de Administrador

Si tienes permisos de administrador, verás opciones adicionales:

#### Panel de Administración
```
┌─────────────────────────────────────────────────────────┐
│                 PANEL DE ADMINISTRADOR                  │
├─────────────────────────────────────────────────────────┤
│  📊 Dashboard     │  👥 Usuarios      │  ⚙️ Sistema     │
│  Estadísticas     │  Gestionar        │  Configuración  │
│                   │  usuarios         │  general        │
├─────────────────────────────────────────────────────────┤
│  📋 Denuncias     │  📚 Recursos      │  📈 Reportes    │
│  Gestionar        │  Gestionar        │  Estadísticas   │
│  denuncias        │  contenido        │  detalladas     │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Gestión de Denuncias

#### 9.2.1 Lista de Denuncias
- **Ver todas** las denuncias del sistema
- **Filtrar** por estado, tipo, fecha
- **Buscar** por código o palabras clave

#### 9.2.2 Procesar Denuncias
1. **Abrir** la denuncia específica
2. **Revisar** toda la información
3. **Cambiar estado** según corresponda
4. **Agregar comentarios** internos
5. **Asignar** a otro administrador si es necesario

#### 9.2.3 Estados Administrativos
- **Asignada**: Denuncia asignada a un administrador específico
- **Investigando**: En proceso de investigación
- **Esperando información**: Se requiere más datos
- **Derivada**: Enviada a otra instancia
- **Archivada**: Finalizada y archivada

### 9.3 Gestión de Usuarios

- **Ver lista** de usuarios registrados
- **Activar/Desactivar** cuentas
- **Restablecer** contraseñas
- **Ver estadísticas** de uso

### 9.4 Configuración del Sistema

- **Tipos de incidentes** disponibles
- **Configuración** de notificaciones
- **Gestión** de recursos de apoyo
- **Configuración** de seguridad

---

## 10. Seguridad y Privacidad

### 10.1 ¿Cómo protegemos tu anonimato?

#### 10.1.1 Tecnologías de Seguridad
- 🔒 **Encriptación SSL/TLS** para todas las comunicaciones
- 🔐 **Hash seguro** de contraseñas
- 🕵️ **Anonimización** de direcciones IP
- 🛡️ **Firewalls** y protección contra ataques

#### 10.1.2 Políticas de Datos
- ❌ **No almacenamos** información personal identificable innecesaria
- ⏰ **Eliminación automática** de datos temporales
- 📋 **Auditorías regulares** de seguridad
- 🔍 **Acceso limitado** solo a personal autorizado

### 10.2 Mejores Prácticas para Usuarios

#### 10.2.1 Creación de Cuenta Segura
- ✅ Usar un **alias único** (no tu nombre real)
- ✅ Crear una **contraseña fuerte**
- ✅ Usar un **email secundario** si es posible
- ✅ **No compartir** credenciales

#### 10.2.2 Al Crear Denuncias
- ✅ **Evitar detalles** que te identifiquen
- ✅ **No incluir nombres** reales de personas
- ✅ **Usar descripciones generales** de ubicaciones
- ✅ **Revisar evidencias** antes de subirlas

#### 10.2.3 Navegación Segura
- ✅ **Cerrar sesión** al terminar
- ✅ **No usar computadoras públicas** para casos sensibles
- ✅ **Verificar la URL** antes de introducir datos
- ✅ **Usar navegación privada/incógnito**

### 10.3 ¿Qué hacer si sospechas una brecha de seguridad?

1. **Cambiar inmediatamente** tu contraseña
2. **Contactar** al equipo de soporte
3. **No usar** el sistema hasta recibir confirmación
4. **Documentar** cualquier actividad sospechosa

---

## 11. Preguntas Frecuentes

### 11.1 Sobre Denuncias

**P: ¿Puedo hacer una denuncia sin registrarme?**
R: Actualmente requieres una cuenta para garantizar que puedas hacer seguimiento de tu denuncia. Sin embargo, puedes usar un alias y email secundario para mantener tu anonimato.

**P: ¿Pueden rastrear mi denuncia hasta mí?**
R: El sistema está diseñado para proteger tu anonimato. Solo tu tienes acceso a tus denuncias a través de tu cuenta segura.

**P: ¿Qué pasa si me arrepiento de hacer una denuncia?**
R: Puedes contactar a los administradores a través del sistema para solicitar la eliminación de tu denuncia.

**P: ¿Cuánto tiempo toma procesar una denuncia?**
R: Depende de la complejidad del caso. En general, recibirás una primera respuesta en 24-48 horas.

### 11.2 Sobre Seguridad

**P: ¿Es realmente anónimo el sistema?**
R: Sí, implementamos múltiples capas de seguridad para proteger tu identidad. Sin embargo, en casos legales extremos, podríamos estar obligados por ley a proporcionar información.

**P: ¿Pueden los administradores ver quién hizo qué denuncia?**
R: Los administradores pueden ver el contenido de las denuncias, pero no pueden vincularlo directamente contigo sin tu código de seguimiento.

**P: ¿Qué pasa con mis datos si elimino mi cuenta?**
R: Las denuncias permanecen en el sistema por razones legales, pero se desvinculan completamente de tu cuenta eliminada.

### 11.3 Sobre Funcionalidad

**P: ¿Puedo editar una denuncia después de enviarla?**
R: No puedes editar una denuncia directamente, pero puedes agregar información adicional contactando a los administradores.

**P: ¿Puedo hacer múltiples denuncias?**
R: Sí, no hay límite en el número de denuncias que puedes hacer.

**P: ¿El sistema funciona en móviles?**
R: Sí, el sistema es completamente responsive y funciona en todos los dispositivos móviles.

### 11.4 Sobre Soporte

**P: ¿Cómo puedo contactar soporte sin comprometer mi anonimato?**
R: Puedes usar el sistema de mensajes interno o crear una cuenta temporal solo para contactar soporte.

**P: ¿Hay soporte 24/7?**
R: El sistema está disponible 24/7, pero el soporte humano tiene horarios específicos que se muestran en la sección de contacto.

---

## 12. Contacto y Soporte

### 12.1 Canales de Soporte

#### 12.1.1 Dentro del Sistema
- 💬 **Chat interno**: Disponible en la esquina inferior derecha
- 📧 **Mensajes**: Sistema de mensajería interno
- 📝 **Formulario de contacto**: En la sección "Ayuda"

#### 12.1.2 Contacto Externo
```
┌─────────────────────────────────────────────────────────┐
│                    INFORMACIÓN DE CONTACTO              │
├─────────────────────────────────────────────────────────┤
│  📧 Email: soporte@escu-project.com                    │
│  📞 Teléfono: +1-800-XXX-XXXX                         │
│  🕐 Horarios: Lunes a Viernes, 9:00 AM - 6:00 PM     │
│  🌐 Web: www.escu-project.com/ayuda                   │
└─────────────────────────────────────────────────────────┘
```

### 12.2 Tipos de Soporte Disponible

#### 12.2.1 Soporte Técnico
- Problemas para acceder al sistema
- Errores al enviar denuncias
- Problemas con la recuperación de contraseña
- Issues con la subida de archivos

#### 12.2.2 Soporte de Uso
- Ayuda para completar formularios
- Explicación de funcionalidades
- Guía para seguimiento de denuncias
- Asistencia con configuración de cuenta

#### 12.2.3 Soporte de Crisis
⚠️ **Emergencias**: Si estás en peligro inmediato, llama al 911

- 📞 **Línea de crisis 24h**: 1-800-XXX-XXXX
- 💬 **Chat de crisis**: Disponible en recursos de apoyo
- 🏥 **Servicios de emergencia**: Contactos en la sección de recursos

### 12.3 Tiempo de Respuesta

- 🟢 **Chat interno**: Inmediato (en horario laboral)
- 🟡 **Email**: 24-48 horas
- 🟠 **Formularios**: 48-72 horas
- 🔴 **Emergencias**: Inmediato

### 12.4 Preparar tu Consulta

Para recibir ayuda más eficiente:

1. **Describe el problema** claramente
2. **Incluye pasos** que llevaron al problema
3. **Menciona tu navegador** y dispositivo
4. **Adjunta capturas** de pantalla si es relevante
5. **Proporciona tu código** de denuncia si es necesario

---

## 📋 Anexos

### A. Glosario de Términos

- **Alias**: Nombre de usuario que no revela tu identidad real
- **Código de seguimiento**: Identificador único para rastrear tu denuncia
- **Denuncia anónima**: Reporte que no puede ser vinculado a tu identidad
- **2FA**: Autenticación de dos factores para mayor seguridad
- **SSL/TLS**: Protocolos de encriptación para comunicaciones seguras

### B. Atajos de Teclado

- `Ctrl + N`: Nueva denuncia
- `Ctrl + S`: Guardar borrador
- `Ctrl + Enter`: Enviar formulario
- `Esc`: Cerrar ventanas modales
- `F1`: Ayuda contextual

### C. Códigos de Estado

- `200`: Operación exitosa
- `400`: Error en los datos enviados
- `401`: No autorizado
- `404`: Página no encontrada
- `500`: Error del servidor

---

## 📞 Contacto de Emergencia

**Si estás en peligro inmediato:**
- 🚨 **Llamar al 911**
- 🏃‍♀️ **Dirigirte a un lugar seguro**
- 👥 **Contactar a personas de confianza**

**Para crisis emocionales:**
- 📞 **Línea Nacional de Prevención del Suicidio**: 988
- 💬 **Crisis Text Line**: Envía HOME al 741741

---

**Última actualización:** Julio 2025  
**Versión del documento:** 1.0  
**Equipo ESCU Project** - Comprometidos con tu seguridad y bienestar
