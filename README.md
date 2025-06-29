# ESCU Project - Sistema de Denuncias Anónimas

## Descripción del Proyecto

ESCU Project es una plataforma web diseñada para facilitar la presentación de **denuncias anónimas** y ofrecer **apoyo emocional** a las personas que han experimentado situaciones difíciles o traumáticas. El sistema está construido con una arquitectura moderna que garantiza la privacidad y confidencialidad de los usuarios.

### Objetivos Principales

1. **Denuncias Anónimas**: Permitir a los usuarios reportar incidentes de manera completamente anónima, sin necesidad de revelar su identidad personal.

2. **Apoyo Emocional**: Proporcionar recursos y herramientas para el bienestar emocional de las personas que han vivido experiencias traumáticas.

3. **Seguridad y Privacidad**: Garantizar la protección de datos y la confidencialidad de toda la información compartida.

4. **Accesibilidad**: Crear una plataforma fácil de usar que esté disponible para todos los usuarios.

### Características del Sistema

- **Autenticación segura** de usuarios
- **Arquitectura hexagonal** (Clean Architecture) para mantenibilidad
- **Base de datos MongoDB** con MongoEngine ODM
- **API REST** con Flask
- **Docker Compose** para desarrollo y despliegue
- **Interfaz web moderna** y responsiva
- **Sistema de denuncias anónimas**
- **Recursos de apoyo emocional**
- **Encriptación de datos sensibles**

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Python** (versión 3.8 o superior)
- **pip** (gestor de paquetes de Python)
- **Docker** y **Docker Compose** (opcional, para desarrollo con contenedores)

### Verificar instalaciones

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Python
python --version

# Verificar pip
pip --version
```

## 🚀 Instalación y Configuración

### 1. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# MongoDB
MONGO_ROOT_USER=tu_usuario_mongo
MONGO_ROOT_PASS=tu_contraseña_mongo
MONGO_DB=nombre_de_tu_base
MONGO_URI=mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASS}@localhost:27017/${MONGO_DB}?authSource=admin

# Mongo Express
ME_USER=admin
ME_PASS=adminpass

# Flask
SECRET_KEY=una-clave-super-secreta
JWT_SECRET_KEY=una-clave-jwt-super-secreta
FLASK_ENV=development
FLASK_DEBUG=True
```

### 2. Configuración del Backend

#### Crear y activar entorno virtual

Es **altamente recomendado** crear un entorno virtual para aislar las dependencias del proyecto:

```bash
# Desde la raíz del proyecto
# Crear entorno virtual
python -m venv venv

# Activar el entorno virtual
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate
```

**Nota**: Una vez activado el entorno virtual, verás `(venv)` al inicio de tu línea de comandos.

#### Instalar dependencias del backend

```bash
# Con el entorno virtual activado (desde la raíz del proyecto)
pip install -e .
```

#### Ejecutar el backend

```bash
# Desde la raíz del proyecto (con entorno virtual activado)
python backend/app.py
```

El backend estará disponible en: `http://localhost:5000`

**Para desactivar el entorno virtual cuando termines:**
```bash
deactivate
```

### 3. Configuración del Frontend

#### Instalar dependencias del frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias de Node.js
npm install
```

#### Ejecutar el frontend en modo desarrollo

```bash
# Desde el directorio frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

#### Construir el frontend para producción

```bash
# Desde el directorio frontend
npm run build
```

## 🔄 Ejecución Completa del Proyecto

### Opción 1: Desarrollo Local (Recomendado para desarrollo)

1. **Crear y activar entorno virtual:**
   ```bash
   # Desde la raíz del proyecto
   python -m venv venv
   
   # Activar entorno virtual
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Instalar dependencias
   pip install -e .
   ```

2. **Iniciar MongoDB con Docker:**
   ```bash
   # Desde la raíz del proyecto
   docker-compose up -d
   ```

3. **Ejecutar el backend:**
   ```bash
   # Terminal 1 - Desde la raíz del proyecto (con entorno virtual activado)
   python backend/app.py
   ```

4. **Ejecutar el frontend:**
   ```bash
   # Terminal 2 - Desde el directorio frontend
   cd frontend
   npm run dev
   ```

### Opción 2: Todo con Docker (Recomendado para producción)

```bash
# Desde la raíz del proyecto
docker-compose up -d
```

## 🌐 Acceso a los Servicios

Una vez ejecutado el proyecto:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081

## 📁 Estructura del Proyecto

```
ESCU-Project/
├── backend/               # Backend (Flask)
│   ├── app/
│   │   ├── application/   # Casos de uso
│   │   ├── config/        # Configuración
│   │   ├── domain/        # Modelos y lógica de negocio
│   │   ├── infrastructure/ # Implementaciones
│   │   └── interfaces/     # Controladores y rutas HTTP
│   │       └── http/       # Rutas de la API
│   └── app.py             # Punto de entrada de la aplicación
├── frontend/               # Frontend (React)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── services/       # Servicios de API
│   │   └── routes/         # Configuración de rutas
│   └── package.json        # Dependencias del frontend
├── docker-compose.yml      # Configuración de Docker
└── .env                    # Variables de entorno
```

## 🔧 Scripts Útiles

### Frontend
```bash
cd frontend

# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

### Backend
```bash
# Desde la raíz del proyecto (con entorno virtual activado)

# Ejecutar en modo desarrollo
python backend/app.py

# Ejecutar tests
pytest
```

## 🔒 Configuración de Seguridad

⚠️ **Importante**: 
- Nunca subas el archivo `.env` al repositorio
- Usa claves secretas fuertes en producción
- Cambia las contraseñas por defecto en producción
- Configura CORS apropiadamente para producción

## 🐛 Solución de Problemas

### Error de conexión entre frontend y backend
- Verifica que el backend esté ejecutándose en el puerto 5000
- Confirma que las URLs en `frontend/src/services/api.js` sean correctas
- Revisa la configuración de CORS en el backend

### Error de conexión a MongoDB
- Verifica que MongoDB esté ejecutándose
- Confirma las credenciales en el archivo `.env`
- Revisa que el puerto 27017 esté disponible

### Error de dependencias del frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error de dependencias del backend
```bash
cd backend
pip install -r requirements.txt
# o
pip install -e ..
```

## 📝 Notas de Desarrollo

- El frontend usa **Vite** como bundler para desarrollo rápido
- El backend usa **Flask** con arquitectura hexagonal
- La comunicación entre frontend y backend es a través de **REST API**
- **MongoDB** se usa como base de datos principal
- **Mongo Express** proporciona una interfaz web para administrar MongoDB

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

## Funcionalidades del Sistema

### Sistema de Denuncias Anónimas

El sistema permite a los usuarios:

1. **Crear denuncias anónimas** sin revelar su identidad personal
2. **Categorizar incidentes** por tipo (acoso, discriminación, violencia, etc.)
3. **Adjuntar evidencia** de manera segura
4. **Seguimiento de casos** con códigos únicos
5. **Notificaciones** sobre el estado de sus denuncias

### Apoyo Emocional

La plataforma ofrece:

1. **Recursos educativos** sobre salud mental
2. **Contactos de emergencia** y líneas de ayuda
3. **Herramientas de autoayuda** y ejercicios de relajación
4. **Información sobre servicios** de apoyo psicológico
5. **Comunidad de apoyo** (opcional y anónima)

## Seguridad y Privacidad

### Medidas de Seguridad Implementadas

- **Encriptación de contraseñas** con hash SHA-256
- **Autenticación segura** de usuarios
- **Protección de datos sensibles**
- **Logs de auditoría** para actividades importantes
- **Validación de entrada** de datos

### Privacidad de Datos

- **Denuncias completamente anónimas**
- **Sin almacenamiento de información personal**
- **Códigos únicos** para seguimiento sin identificación
- **Eliminación automática** de datos temporales

## Despliegue

### Desarrollo Local

```bash
# Iniciar servicios
docker-compose up -d

# Ejecutar aplicación
python backend/app.py
```

### Producción

Para despliegue en producción, se recomienda:

1. Configurar variables de entorno de producción
2. Usar un servidor WSGI como Gunicorn
3. Configurar un proxy reverso (Nginx)
4. Implementar SSL/TLS
5. Configurar backups automáticos de la base de datos

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir un Pull Request

### Guías de Contribución

- Seguir las convenciones de código establecidas
- Agregar tests para nuevas funcionalidades
- Documentar cambios importantes
- Mantener la privacidad y seguridad como prioridad

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades:

- Crear un issue en el repositorio
- Contactar al equipo de desarrollo
- Revisar la documentación técnica

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Agradecimientos

Agradecemos a todos los contribuyentes y a la comunidad que hace posible este proyecto de apoyo y denuncia anónima. 