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

## Requisitos del Sistema

### Software Requerido

- **Python 3.8** o superior
- **Docker** y **Docker Compose**
- **Git** (para clonar el repositorio)
- **pip** (gestor de paquetes de Python)

### Versiones Recomendadas

- Python: 3.8 - 3.12
- Docker: 20.10 o superior
- Docker Compose: 2.0 o superior

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd ESCU-Project
```

### 2. Crear Entorno Virtual

Es recomendable crear un entorno virtual para aislar las dependencias del proyecto:

```bash
python -m venv .venv
```

**Activar el entorno virtual:**

**Windows:**
```bash
.venv\Scripts\activate
```

**Linux/macOS:**
```bash
source .venv/bin/activate
```

### 3. Instalar Dependencias

Instalar todas las dependencias del proyecto:

```bash
pip install -e .
```

Para desarrollo (incluye herramientas de testing y linting):
```bash
pip install -e ".[dev]"
```

### 4. Configurar Base de Datos

El proyecto utiliza MongoDB como base de datos. Iniciar los servicios con Docker:

```bash
docker-compose up -d
```

Esto iniciará:
- **MongoDB** en el puerto 27017
- **Mongo Express** (interfaz web de administración) en el puerto 8081

### 5. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# MongoDB Configuration
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DB=denuncias_db
MONGODB_USERNAME=admin
MONGODB_PASSWORD=password123
MONGODB_AUTH_SOURCE=admin

# Docker Configuration
MONGO_EXPRESS_PORT=8081
MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=password123

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=tu-clave-secreta-aqui
JWT_SECRET_KEY=tu-jwt-secret-key-aqui

# API Configuration
API_HOST=0.0.0.0
API_PORT=5000
CORS_ORIGINS=*
```

**Nota importante**: 
- El archivo `.env` ya está incluido en `.gitignore` para proteger información sensible
- Cambia las claves secretas en producción
- Las credenciales de MongoDB coinciden con las configuradas en `docker-compose.yml`
- Docker Compose usará automáticamente estas variables de entorno

### 6. Ejecutar la Aplicación

```bash
python backend/app.py
```

La aplicación estará disponible en `http://localhost:5000`

## Estructura del Proyecto

```
ESCU-Project/
├── backend/                 # Backend Flask
│   ├── app/
│   │   ├── application/     # Casos de uso (lógica de negocio)
│   │   │   ├── login_user.py
│   │   │   └── register_user.py
│   │   ├── domain/         # Modelos y reglas de negocio
│   │   │   ├── models/     # Entidades del dominio
│   │   │   ├── repositories/ # Interfaces de repositorios
│   │   │   └── services/   # Servicios del dominio
│   │   ├── infrastructure/ # Implementaciones externas
│   │   │   ├── database/   # Implementación de base de datos
│   │   │   └── external_apis/ # APIs externas
│   │   └── interfaces/     # Controladores y rutas HTTP
│   │       └── http/       # Rutas de la API
│   ├── config.py           # Configuración de base de datos
│   └── app.py             # Punto de entrada de la aplicación
├── frontend/               # Frontend (React)
│   └── src/
├── tests/                  # Tests de integración
├── mongo-init/             # Scripts de inicialización de MongoDB
├── docker-compose.yml      # Configuración de Docker
├── pyproject.toml         # Configuración del proyecto Python
└── README.md              # Este archivo
```

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