# Manual Técnico - ESCU Project
## Sistema de Denuncias Anónimas

### Versión: 1.0
### Fecha: Julio 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Estructura del Código](#estructura-del-código)
6. [Base de Datos](#base-de-datos)
7. [API Endpoints](#api-endpoints)
8. [Configuración de Desarrollo](#configuración-de-desarrollo)
9. [Despliegue](#despliegue)
10. [Mantenimiento](#mantenimiento)
11. [Solución de Problemas](#solución-de-problemas)

---

## 1. Introducción

### 1.1 Descripción del Sistema
ESCU Project es una aplicación web para la gestión de denuncias anónimas con arquitectura hexagonal (Clean Architecture). El sistema permite a los usuarios reportar incidentes de manera completamente anónima y ofrece recursos de apoyo emocional.

### 1.2 Tecnologías Utilizadas

**Backend:**
- Python 3.8+
- Flask 2.3.0+ (Framework web)
- MongoEngine 0.27.0+ (ODM para MongoDB)
- Flask-JWT-Extended 4.7.0+ (Autenticación JWT)
- Flask-CORS 4.0.0+ (Manejo de CORS)
- python-dotenv 1.0.0+ (Variables de entorno)

**Frontend:**
- Node.js 18+
- React 18.2.0
- Vite (Build tool)
- Axios 1.10.0 (Cliente HTTP)
- React Router DOM 7.6.2 (Enrutamiento)
- Bootstrap 5.3.7 (UI Framework)
- Tailwind CSS (Estilos)

**Base de Datos:**
- MongoDB 7.0+
- Mongo Express (Administración web)

**DevOps:**
- Docker & Docker Compose
- Git (Control de versiones)

---

## 2. Arquitectura del Sistema

### 2.1 Arquitectura Hexagonal (Clean Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                     INTERFACES LAYER                        │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   HTTP Routes   │  │   CLI Commands  │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                  APPLICATION LAYER                          │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   Use Cases     │  │    Services     │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                    DOMAIN LAYER                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │    Entities     │  │  Repositories   │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                INFRASTRUCTURE LAYER                         │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   Database      │  │  External APIs  │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Comunicación Frontend-Backend

```
Frontend (React)  <--HTTP/REST--> Backend (Flask)  <--MongoEngine--> MongoDB
     |                                  |
     v                                  v
[Axios Cliente]                   [Flask Routes]
     |                                  |
     v                                  v
[Componentes React]              [Controladores]
     |                                  |
     v                                  v
[Estados/Context]                [Casos de Uso]
                                       |
                                       v
                                 [Repositorios]
                                       |
                                       v
                                  [Entidades]
```

---

## 3. Requisitos del Sistema

### 3.1 Requisitos de Software

**Para Desarrollo:**
- Sistema Operativo: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- Python 3.8 o superior
- Node.js 18.0 o superior
- npm 8.0 o superior
- Git 2.30+
- MongoDB 5.0+ (local) o Docker
- Editor de código (VS Code recomendado)

**Para Producción:**
- Servidor Linux (Ubuntu 20.04+ recomendado)
- Python 3.8+
- Node.js 18+
- MongoDB 5.0+
- Nginx (Proxy reverso)
- SSL/TLS Certificado
- Firewall configurado

### 3.2 Requisitos de Hardware

**Desarrollo:**
- RAM: 8GB mínimo, 16GB recomendado
- Almacenamiento: 10GB libres
- Procesador: Dual-core 2.5GHz+

**Producción (estimado para 1000 usuarios concurrentes):**
- RAM: 16GB mínimo
- Almacenamiento: 100GB SSD
- Procesador: Quad-core 3.0GHz+
- Ancho de banda: 100Mbps

---

## 4. Instalación y Configuración

### 4.1 Configuración del Entorno de Desarrollo

#### 4.1.1 Clonación del Repositorio
```bash
git clone https://github.com/AnLu996/ESCU-Project.git
cd ESCU-Project
git checkout dev
```

#### 4.1.2 Configuración de Variables de Entorno
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

**Contenido del archivo .env:**
```env
# MongoDB
MONGO_ROOT_USER=admin
MONGO_ROOT_PASS=password123
MONGO_DB=denuncias_db
MONGO_URI=mongodb://localhost:27017/denuncias_db

# Mongo-Express
ME_USER=admin
ME_PASS=password123

# App
SECRET_KEY=epccescuelaprofesionaldecianciadelacomputacion
JWT_SECRET_KEY=jwtclaveparaautenticacionsegura2025
FLASK_ENV=development
FLASK_DEBUG=True
```

#### 4.1.3 Configuración del Backend
```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -e .
```

#### 4.1.4 Configuración del Frontend
```bash
cd frontend
npm install
```

#### 4.1.5 Configuración de Base de Datos

**Opción A: Con Docker (Recomendado)**
```bash
docker-compose up -d
```

**Opción B: MongoDB Local**
```bash
# Iniciar servicio MongoDB
# Windows:
sc start MongoDB
# macOS:
brew services start mongodb-community
# Linux:
sudo systemctl start mongod
```

### 4.2 Ejecución del Sistema

#### 4.2.1 Iniciar Backend
```bash
# Desde la raíz del proyecto (con entorno virtual activado)
python backend/app.py
```
**URL:** http://localhost:5000

#### 4.2.2 Iniciar Frontend
```bash
# Desde el directorio frontend
cd frontend
npm run dev
```
**URL:** http://localhost:5173

---

## 5. Estructura del Código

### 5.1 Estructura del Proyecto
```
ESCU-Project/
├── backend/                    # Backend (Flask)
│   ├── app/
│   │   ├── application/        # Casos de uso y servicios de aplicación
│   │   │   ├── services/       # Servicios de aplicación
│   │   │   └── use_cases/      # Casos de uso
│   │   ├── config/             # Configuración de la aplicación
│   │   │   ├── database.py     # Configuración de MongoDB
│   │   │   └── settings.py     # Configuración general
│   │   ├── domain/             # Lógica de negocio
│   │   │   ├── entities/       # Entidades del dominio
│   │   │   ├── repositories/   # Interfaces de repositorios
│   │   │   └── services/       # Servicios del dominio
│   │   ├── infrastructure/     # Implementaciones de infraestructura
│   │   │   ├── database/       # Implementación de repositorios
│   │   │   ├── security/       # Seguridad y encriptación
│   │   │   └── scripts/        # Scripts de inicialización
│   │   ├── interfaces/         # Interfaces de entrada
│   │   │   └── http/           # Rutas HTTP y controladores
│   │   │       ├── controllers/ # Controladores
│   │   │       └── routes/      # Definición de rutas
│   │   └── main.py             # Factory de la aplicación Flask
│   ├── app.py                  # Punto de entrada
│   └── test/                   # Tests del backend
├── frontend/                   # Frontend (React)
│   ├── public/                 # Archivos públicos
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── common/         # Componentes comunes
│   │   │   ├── forms/          # Formularios
│   │   │   └── layout/         # Layout y navegación
│   │   ├── pages/              # Páginas de la aplicación
│   │   │   ├── auth/           # Páginas de autenticación
│   │   │   ├── denuncias/      # Páginas de denuncias
│   │   │   └── dashboard/      # Panel de control
│   │   ├── services/           # Servicios de API
│   │   ├── utils/              # Utilidades
│   │   ├── hooks/              # Custom hooks
│   │   ├── context/            # Context providers
│   │   ├── routes/             # Configuración de rutas
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Punto de entrada
│   ├── package.json            # Dependencias del frontend
│   ├── vite.config.js          # Configuración de Vite
│   └── tailwind.config.js      # Configuración de Tailwind
├── tests/                      # Tests de integración
├── docker-compose.yml          # Configuración de Docker
├── pyproject.toml              # Configuración de Python
├── .env                        # Variables de entorno
├── .gitignore                  # Archivos ignorados por Git
└── README.md                   # Documentación principal
```

### 5.2 Descripción de Capas

#### 5.2.1 Capa de Dominio (Domain Layer)
```python
# backend/app/domain/entities/usuario.py
class Usuario:
    def __init__(self, alias: str, email: str, password_hash: str):
        self.alias = alias
        self.email = email
        self.password_hash = password_hash
        self.created_at = datetime.utcnow()
```

#### 5.2.2 Capa de Aplicación (Application Layer)
```python
# backend/app/application/use_cases/crear_denuncia.py
class CrearDenunciaUseCase:
    def __init__(self, denuncia_repo: DenunciaRepository):
        self.denuncia_repo = denuncia_repo
    
    def execute(self, data: dict) -> str:
        # Lógica de negocio para crear denuncia
        pass
```

#### 5.2.3 Capa de Infraestructura (Infrastructure Layer)
```python
# backend/app/infrastructure/database/denuncia_repository_impl.py
class DenunciaRepositoryImpl(DenunciaRepository):
    def save(self, denuncia: Denuncia) -> str:
        # Implementación específica de MongoDB
        pass
```

#### 5.2.4 Capa de Interfaces (Interface Layer)
```python
# backend/app/interfaces/http/controllers/denuncia_controller.py
class DenunciaController:
    def crear_denuncia(self):
        # Manejo de requests HTTP
        pass
```

### 5.3 Patrones de Diseño Utilizados

1. **Repository Pattern**: Abstracción de acceso a datos
2. **Use Case Pattern**: Encapsulación de lógica de negocio
3. **Factory Pattern**: Creación de instancias de la aplicación
4. **Dependency Injection**: Inyección de dependencias
5. **DTO Pattern**: Transferencia de datos entre capas

---

## 6. Base de Datos

### 6.1 Modelo de Datos

#### 6.1.1 Colección: usuarios
```javascript
{
  "_id": ObjectId,
  "alias": String,           // Alias único del usuario
  "email": String,           // Email único
  "password_hash": String,   // Hash de la contraseña
  "role": String,            // "user" | "admin"
  "created_at": Date,
  "updated_at": Date,
  "is_active": Boolean
}
```

#### 6.1.2 Colección: denuncias
```javascript
{
  "_id": ObjectId,
  "codigo_seguimiento": String,    // Código único para seguimiento
  "tipo_incidente": String,        // Categoría del incidente
  "descripcion": String,           // Descripción detallada
  "fecha_incidente": Date,         // Fecha del incidente
  "ubicacion": {
    "descripcion": String,
    "coordenadas": {
      "lat": Number,
      "lng": Number
    }
  },
  "evidencias": [{
    "tipo": String,               // "imagen" | "video" | "audio" | "documento"
    "filename": String,
    "path": String,
    "size": Number,
    "uploaded_at": Date
  }],
  "estado": String,               // "pendiente" | "en_proceso" | "resuelto" | "cerrado"
  "prioridad": String,            // "baja" | "media" | "alta" | "critica"
  "tags": [String],
  "metadata": {
    "ip_anonimizada": String,
    "user_agent": String,
    "session_id": String
  },
  "created_at": Date,
  "updated_at": Date
}
```

#### 6.1.3 Colección: recursos_apoyo
```javascript
{
  "_id": ObjectId,
  "titulo": String,
  "descripcion": String,
  "tipo": String,                 // "articulo" | "video" | "contacto" | "herramienta"
  "contenido": String,
  "url_externa": String,
  "tags": [String],
  "categoria": String,
  "is_active": Boolean,
  "created_at": Date,
  "updated_at": Date
}
```

### 6.2 Índices de Base de Datos

```javascript
// Índices recomendados para optimización
db.usuarios.createIndex({ "alias": 1 }, { unique: true })
db.usuarios.createIndex({ "email": 1 }, { unique: true })
db.denuncias.createIndex({ "codigo_seguimiento": 1 }, { unique: true })
db.denuncias.createIndex({ "created_at": -1 })
db.denuncias.createIndex({ "estado": 1 })
db.denuncias.createIndex({ "tipo_incidente": 1 })
```

### 6.3 Configuración de MongoDB

```python
# backend/app/config/database.py
MONGODB_SETTINGS = {
    'host': settings.MONGO_URI,
    'connect': False,
    'maxPoolSize': 50,
    'socketTimeoutMS': 20000,
    'connectTimeoutMS': 20000,
    'serverSelectionTimeoutMS': 20000
}
```

---

## 7. API Endpoints

### 7.1 Autenticación

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| POST | `/api/auth/register` | Registrar usuario | `alias`, `email`, `password` |
| POST | `/api/auth/login` | Iniciar sesión | `email`, `password` |
| POST | `/api/auth/logout` | Cerrar sesión | Header: `Authorization` |
| GET | `/api/auth/me` | Obtener usuario actual | Header: `Authorization` |

### 7.2 Denuncias

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| POST | `/api/denuncias` | Crear denuncia | `tipo_incidente`, `descripcion`, etc. |
| GET | `/api/denuncias/{codigo}` | Obtener denuncia por código | `codigo_seguimiento` |
| PUT | `/api/denuncias/{codigo}` | Actualizar denuncia | `codigo_seguimiento` + datos |
| GET | `/api/denuncias` | Listar denuncias (admin) | Query params de filtrado |

### 7.3 Recursos de Apoyo

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/recursos` | Listar recursos | Query params opcionales |
| GET | `/api/recursos/{id}` | Obtener recurso específico | `id` del recurso |

### 7.4 Ejemplos de Requests

#### 7.4.1 Crear Denuncia
```http
POST /api/denuncias
Content-Type: application/json

{
  "tipo_incidente": "acoso_laboral",
  "descripcion": "Descripción del incidente...",
  "fecha_incidente": "2025-01-15T14:30:00Z",
  "ubicacion": {
    "descripcion": "Oficina principal, piso 3"
  },
  "prioridad": "alta"
}
```

#### 7.4.2 Response de Crear Denuncia
```json
{
  "success": true,
  "data": {
    "codigo_seguimiento": "DENU-2025-001234",
    "mensaje": "Denuncia creada exitosamente"
  }
}
```

---

## 8. Configuración de Desarrollo

### 8.1 Variables de Entorno

```env
# Desarrollo
FLASK_ENV=development
FLASK_DEBUG=True
MONGO_URI=mongodb://localhost:27017/denuncias_db_dev

# Testing
FLASK_ENV=testing
MONGO_URI=mongodb://localhost:27017/denuncias_db_test

# Producción
FLASK_ENV=production
FLASK_DEBUG=False
MONGO_URI=mongodb://user:pass@prod-server:27017/denuncias_db
```

### 8.2 Configuración de Logging

```python
# backend/app/config/logging.py
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/app.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'default'
        }
    }
}
```

### 8.3 Testing

#### 8.3.1 Ejecutar Tests
```bash
# Tests del backend
pytest backend/test/

# Tests específicos
pytest backend/test/test_denuncias.py

# Tests con cobertura
pytest --cov=backend/app tests/
```

#### 8.3.2 Estructura de Tests
```python
# tests/test_crear_denuncia.py
def test_crear_denuncia_exitosa():
    """Test para verificar creación exitosa de denuncia"""
    data = {
        "tipo_incidente": "acoso",
        "descripcion": "Test denuncia"
    }
    response = client.post('/api/denuncias', json=data)
    assert response.status_code == 201
```

---

## 9. Despliegue

### 9.1 Despliegue con Docker

#### 9.1.1 Dockerfile - Backend
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY backend/ .
RUN pip install -e .

EXPOSE 5000
CMD ["python", "app.py"]
```

#### 9.1.2 Dockerfile - Frontend
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

### 9.2 Configuración de Nginx

```nginx
server {
    listen 80;
    server_name localhost;

    # Frontend
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 9.3 Scripts de Despliegue

```bash
#!/bin/bash
# deploy.sh

echo "Iniciando despliegue..."

# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up -d

# Verificar salud de servicios
docker-compose ps

echo "Despliegue completado!"
```

---

## 10. Mantenimiento

### 10.1 Monitoreo

#### 10.1.1 Health Checks
```python
# backend/app/interfaces/http/routes/health.py
@bp.route('/health')
def health_check():
    return {
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    }
```

#### 10.1.2 Métricas de Base de Datos
```javascript
// Consultas de monitoreo
db.runCommand({dbStats: 1})
db.denuncias.stats()
db.usuarios.countDocuments()
```

### 10.2 Backups

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Backup de MongoDB
mongodump --host localhost:27017 --db denuncias_db --out $BACKUP_DIR/mongo_$DATE

# Comprimir backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/mongo_$DATE

# Limpiar backups antiguos (conservar últimos 7 días)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

### 10.3 Actualización de Dependencias

```bash
# Backend
pip list --outdated
pip install --upgrade package_name

# Frontend
npm audit
npm update
```

---

## 11. Solución de Problemas

### 11.1 Problemas Comunes

#### 11.1.1 Error de Conexión a MongoDB
**Síntoma:** `pymongo.errors.ServerSelectionTimeoutError`

**Solución:**
```bash
# Verificar estado del servicio
sc query MongoDB  # Windows
systemctl status mongod  # Linux

# Reiniciar servicio
sc start MongoDB  # Windows
sudo systemctl start mongod  # Linux
```

#### 11.1.2 Error de CORS en Frontend
**Síntoma:** `Access to XMLHttpRequest blocked by CORS policy`

**Solución:**
```python
# backend/app/main.py
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:5173'])
    return app
```

#### 11.1.3 Error de Dependencias Python
**Síntoma:** `ModuleNotFoundError`

**Solución:**
```bash
# Reinstalar dependencias
pip install -e .

# Verificar entorno virtual
which python  # Debe mostrar path del venv
```

### 11.2 Logs de Debugging

```python
# Habilitar logging detallado
import logging
logging.basicConfig(level=logging.DEBUG)

# Ver logs de MongoDB
logging.getLogger('pymongo').setLevel(logging.DEBUG)
```

### 11.3 Performance Issues

```python
# Profiling de requests
from flask import g
import time

@app.before_request
def before_request():
    g.start_time = time.time()

@app.after_request
def after_request(response):
    diff = time.time() - g.start_time
    if diff > 1.0:  # Log requests > 1 segundo
        app.logger.warning(f'Slow request: {request.path} - {diff:.2f}s')
    return response
```

---

## 📞 Contacto y Soporte

- **Equipo de Desarrollo:** ESCU Team
- **Email:** soporte@escu-project.com
- **Repositorio:** https://github.com/AnLu996/ESCU-Project
- **Documentación:** Wiki del proyecto

---

**Última actualización:** Julio 2025
**Versión del documento:** 1.0
