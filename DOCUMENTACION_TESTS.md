# Documentación de Tests - ESCU Project
## Sistema de Denuncias Anónimas

### Versión: 1.0
### Fecha: Julio 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Estructura de Tests](#estructura-de-tests)
3. [Tests del Frontend (React)](#tests-del-frontend-react)
4. [Tests del Backend (Python)](#tests-del-backend-python)
5. [Configuración de Testing](#configuración-de-testing)
6. [Cómo Ejecutar Tests](#cómo-ejecutar-tests)
7. [Coverage y Métricas](#coverage-y-métricas)
8. [Mejores Prácticas](#mejores-prácticas)

---

## 1. Introducción

### 1.1 Propósito de la Documentación

Esta documentación describe todos los tests implementados en el proyecto ESCU, incluyendo tests unitarios, de integración y end-to-end para garantizar la calidad y funcionalidad del sistema de denuncias anónimas.

### 1.2 Tecnologías de Testing

**Frontend:**
- **Vitest**: Framework de testing para Vite/React
- **@testing-library/react**: Utilidades para testing de componentes React
- **@testing-library/user-event**: Simulación de eventos de usuario
- **@testing-library/jest-dom**: Matchers adicionales para DOM

**Backend:**
- **Pytest**: Framework de testing para Python
- **unittest.mock**: Mocking para Python
- **Flask Test Client**: Cliente de testing para rutas HTTP

---

## 2. Estructura de Tests

### 2.1 Organización de Archivos

```
ESCU-Project/
├── frontend/
│   └── src/
│       └── pages/
│           └── tests/
│               ├── AdminPage.test.jsx
│               ├── ChatBotPage.test.jsx
│               └── DenunciaPage.test.jsx
└── tests/
    ├── test_crear_denuncia.py
    ├── test_login_user.py
    ├── test_muro_routes.py
    └── test_register_user.py
```

### 2.2 Convenciones de Naming

- **Frontend**: `ComponentName.test.jsx`
- **Backend**: `test_feature_name.py`
- **Funciones de test**: `test_descripcion_del_caso()`

---

## 3. Tests del Frontend (React)

### 3.1 AdminPage.test.jsx

**Archivo**: `frontend/src/pages/tests/AdminPage.test.jsx`
**Componente Testado**: `AdminPage.jsx`
**Framework**: Vitest + React Testing Library

#### 3.1.1 Configuración y Mocks

```jsx
// Mocks utilizados
vi.mock('../../services/api', () => ({
  adminService: {
    getDenuncias: vi.fn(),
    getPosts: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
```

#### 3.1.2 Tests Implementados

| Test Case | Descripción | Tipo |
|-----------|-------------|------|
| `renderiza correctamente el título del panel de administración` | Verifica que los elementos principales del dashboard se rendericen | Renderizado |
| `renderiza el botón de volver al inicio` | Confirma la presencia del botón de navegación | UI |
| `navega al inicio cuando se hace clic en volver` | Prueba la funcionalidad de navegación | Interacción |
| `carga y muestra las denuncias correctamente` | Verifica la carga y visualización de denuncias | API Integration |
| `carga y muestra los posts correctamente` | Verifica la carga y visualización de posts | API Integration |
| `muestra mensaje cuando no hay denuncias` | Manejo de estado vacío para denuncias | Edge Case |
| `muestra mensaje cuando no hay posts` | Manejo de estado vacío para posts | Edge Case |
| `renderiza todos los botones de ver detalles de denuncias` | Verifica la generación dinámica de botones | Dynamic Content |
| `renderiza todos los botones de eliminar posts` | Verifica botones de eliminación | Dynamic Content |
| `renderiza la sección de acciones rápidas` | Verifica elementos de la sección de acciones | UI |
| `los botones de acciones rápidas son clickeables` | Prueba interactividad de botones | Interacción |
| `maneja errores cuando la API de denuncias falla` | Manejo de errores de API | Error Handling |
| `maneja errores cuando la API de posts falla` | Manejo de errores de API | Error Handling |
| `muestra las fechas de las denuncias correctamente` | Formateo y visualización de fechas | Data Display |
| `trunca las descripciones largas de denuncias` | Manejo de contenido extenso | UI Behavior |
| `aplica estilos de scroll cuando hay muchas denuncias` | Comportamiento de scroll en listas largas | UI Behavior |
| `aplica estilos de scroll cuando hay muchos posts` | Comportamiento de scroll en listas largas | UI Behavior |

#### 3.1.3 Datos de Prueba

```jsx
const mockDenuncias = [
  {
    categoria: 'Acoso',
    descripcion: 'Un incidente en el pasillo B',
    fechaHora: '2025-07-01T14:00',
  },
  {
    categoria: 'Robo',
    descripcion: 'Se reportó robo de laptop en la biblioteca',
    fechaHora: '2025-07-02T09:30',
  },
];

const mockPosts = [
  { content: 'Hoy me siento triste 😞' },
  { content: 'Recuerda que eres fuerte 💪' },
];
```

### 3.2 ChatBotPage.test.jsx

**Archivo**: `frontend/src/pages/tests/ChatBotPage.test.jsx`
**Componente Testado**: `ChatBotPage.jsx`
**Framework**: Vitest + React Testing Library

#### 3.2.1 Configuración y Mocks

```jsx
// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})
```

#### 3.2.2 Tests Implementados

| Test Case | Descripción | Tipo |
|-----------|-------------|------|
| `renderiza correctamente el componente` | Verifica elementos básicos del chat | Renderizado |
| `carga conversación desde localStorage` | Persistencia de conversaciones | Persistencia |
| `envía un mensaje correctamente` | Funcionalidad principal de envío | Funcional |
| `no envía mensajes vacíos` | Validación de entrada | Validación |
| `envía mensaje con tecla Enter` | Interacción con teclado | Interacción |
| `guarda conversación en localStorage` | Persistencia de datos | Persistencia |
| `maneja reacciones a mensajes del bot` | Sistema de reacciones | Funcional |
| `formatea correctamente las fechas` | Formateo de timestamps | Data Display |
| `muestra y oculta modal de autenticación` | Gestión de modales | UI Behavior |
| `actualiza estado de login después de verificación` | Gestión de estado de autenticación | State Management |
| `scroll automático al final de la conversación` | UX de chat | UI Behavior |
| `carga reacciones desde localStorage` | Persistencia de reacciones | Persistencia |
| `guarda reacciones en localStorage` | Almacenamiento de reacciones | Persistencia |

#### 3.2.3 Características Únicas

- **Testing de localStorage**: Simulación completa del almacenamiento local
- **Testing de eventos de teclado**: Validación de shortcuts (Enter)
- **Testing de scroll automático**: Verificación de UX del chat
- **Testing de timeouts**: Manejo de respuestas asíncronas del bot

### 3.3 DenunciaPage.test.jsx

**Archivo**: `frontend/src/pages/tests/DenunciaPage.test.jsx`
**Componente Testado**: `DenunciaPage.jsx`
**Framework**: Jest + React Testing Library

#### 3.3.1 Configuración y Mocks

```jsx
// Mock del servicio de denuncias
jest.mock('../../services/api', () => ({
  denunciaService: {
    crearDenuncia: jest.fn(),
  },
}));
```

#### 3.3.2 Tests Implementados

| Test Case | Descripción | Tipo |
|-----------|-------------|------|
| `renderiza todos los campos y el botón de envío` | Verifica formulario completo | Renderizado |
| `muestra errores de validación si faltan campos obligatorios` | Validación de campos requeridos | Validación |
| `envío exitoso muestra mensaje de éxito y resetea el formulario` | Flujo de envío exitoso | Funcional |
| `envío fallido muestra mensaje de error personalizado` | Manejo de errores de API | Error Handling |
| `error de conexión muestra mensaje de error genérico` | Manejo de errores de red | Error Handling |

#### 3.3.3 Validaciones Testeadas

- **Campos obligatorios**: Categoría, descripción, lugar
- **Mensajes de error**: Validación client-side
- **Reset de formulario**: Limpieza después de envío exitoso
- **Manejo de errores**: Tanto de API como de red

---

## 4. Tests del Backend (Python)

### 4.1 test_crear_denuncia.py

**Archivo**: `tests/test_crear_denuncia.py`
**Módulo Testado**: `CreateDenunciaUseCase`
**Framework**: unittest.mock

#### 4.1.1 Test Principal

```python
def test_execute_crea_y_guarda_denuncia():
    # Arrange: Mock del repositorio
    mock_repo = Mock()
    fake_denuncia = Denuncia(...)
    
    # Act: Ejecutar caso de uso
    result, success = use_case.execute(...)
    
    # Assert: Verificar resultado
    assert success is True
    assert isinstance(result, Denuncia)
    mock_repo.save.assert_called_once()
```

#### 4.1.2 Aspectos Testeados

- **Creación de denuncia**: Instanciación correcta del objeto
- **Persistencia**: Llamada al repositorio para guardar
- **Retorno de valores**: Tupla (result, success)
- **Integridad de datos**: Verificación de atributos

### 4.2 test_login_user.py

**Archivo**: `tests/test_login_user.py`
**Módulo Testado**: `LoginUserUseCase`
**Framework**: pytest + unittest.mock

#### 4.2.1 Clases de Apoyo

```python
class FakeUser:
    def __init__(self, alias, password_hash):
        self.alias = alias
        self.password_hash = password_hash

class FakeUserRepository:
    def find_by_alias(self, alias):
        if alias == "admin":
            return FakeUser("admin", "admin123")
        return None

class FakePasswordService:
    @staticmethod
    def hash_password(password):
        return password  # Simulación simple
```

#### 4.2.2 Tests Implementados

| Test Case | Descripción | Tipo |
|-----------|-------------|------|
| `test_login_correcto` | Login exitoso con credenciales válidas | Funcional |
| `test_login_usuario_invalido` | Manejo de usuario inexistente | Error Handling |
| `test_login_contraseña_incorrecta` | Manejo de contraseña incorrecta | Error Handling |

### 4.3 test_register_user.py

**Archivo**: `tests/test_register_user.py`
**Módulo Testado**: `RegisterUserUseCase`
**Framework**: pytest + unittest.mock

#### 4.3.1 Tests Implementados

```python
def test_registro_exitoso():
    # Mock repository que indica usuario no existe
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = None
    
    # Patches para servicios externos
    with patch("app.domain.services.password_service.PasswordService.hash_password"),
         patch("app.domain.models.user.User.create"):
        
        result = use_case.execute("usuario123", "pass123")
        assert result is True

def test_registro_falla_usuario_existente():
    # Mock repository que indica usuario ya existe
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = User("usuario123", "hashed_pass")
    
    result = use_case.execute("usuario123", "pass123")
    assert result is False
```

### 4.4 test_muro_routes.py

**Archivo**: `tests/test_muro_routes.py`
**Módulo Testado**: `muro_routes.py` (rutas HTTP)
**Framework**: pytest + Flask Test Client

#### 4.4.1 Configuración de Flask Testing

```python
@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'test-secret'
    JWTManager(app)
    app.register_blueprint(muro_bp, url_prefix="/api/muro")
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def token(app):
    with app.test_request_context():
        return create_access_token(identity="usuario_test")
```

#### 4.4.2 Tests de Rutas HTTP

| Endpoint | Test Case | Descripción |
|----------|-----------|-------------|
| `POST /api/muro/` | `test_crear_publicacion_contenido_vacio` | Validación de contenido vacío |
| `POST /api/muro/` | `test_crear_publicacion_usuario_no_encontrado` | Manejo de usuario inexistente |

---

## 5. Configuración de Testing

### 5.1 Frontend Configuration

#### 5.1.1 Vitest Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
})
```

#### 5.1.2 Testing Setup

```javascript
// src/test/setup.js
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock global objects
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})
```

### 5.2 Backend Configuration

#### 5.2.1 Pytest Configuration

```ini
# pytest.ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = --verbose --tb=short
```

#### 5.2.2 Testing Dependencies

```toml
# pyproject.toml
[project.optional-dependencies]
test = [
    "pytest>=7.4.0,<8.0.0",
    "pytest-flask>=1.2.0,<2.0.0",
    "pytest-cov>=4.1.0,<5.0.0"
]
```

---

## 6. Cómo Ejecutar Tests

### 6.1 Frontend Tests

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias (si no están instaladas)
npm install

# Ejecutar todos los tests
npm run test

# Ejecutar tests específicos
npm run test -- ChatBotPage.test.jsx

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

### 6.2 Backend Tests

```bash
# Activar entorno virtual
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# Ejecutar todos los tests
pytest

# Ejecutar tests específicos
pytest tests/test_login_user.py

# Ejecutar tests con coverage
pytest --cov=backend/app tests/

# Ejecutar tests verbosos
pytest -v

# Ejecutar tests con reporte detallado
pytest --tb=long
```

### 6.3 Scripts de Package.json (Frontend)

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

---

## 7. Coverage y Métricas

### 7.1 Coverage Esperado

| Módulo | Coverage Objetivo | Estado Actual |
|--------|------------------|---------------|
| Frontend Components | 80%+ | En desarrollo |
| Backend Use Cases | 90%+ | En desarrollo |
| API Routes | 85%+ | En desarrollo |
| Domain Models | 95%+ | En desarrollo |

### 7.2 Métricas de Testing

```bash
# Frontend Coverage Report
npm run test:coverage

# Backend Coverage Report
pytest --cov=backend/app --cov-report=html tests/
```

### 7.3 Análisis de Coverage

- **Líneas cubiertas**: Porcentaje de líneas ejecutadas
- **Branches cubiertos**: Porcentaje de ramas condicionales
- **Funciones cubiertas**: Porcentaje de funciones testadas
- **Statements cubiertos**: Porcentaje de statements ejecutados

---

## 8. Mejores Prácticas

### 8.1 Principios de Testing

#### 8.1.1 AAA Pattern (Arrange, Act, Assert)

```javascript
test('debería crear usuario correctamente', () => {
  // Arrange
  const userData = { name: 'Test', email: 'test@example.com' }
  const mockService = vi.fn().mockResolvedValue({ success: true })
  
  // Act
  const result = createUser(userData)
  
  // Assert
  expect(result).toBe(true)
  expect(mockService).toHaveBeenCalledWith(userData)
})
```

#### 8.1.2 Testing Pyramid

1. **Unit Tests (70%)**: Funciones y componentes individuales
2. **Integration Tests (20%)**: Interacción entre módulos
3. **E2E Tests (10%)**: Flujos completos de usuario

### 8.2 Naming Conventions

#### 8.2.1 Descriptive Test Names

```javascript
// ❌ Malo
test('login test', () => {})

// ✅ Bueno  
test('debería autenticar usuario con credenciales válidas', () => {})
test('debería rechazar login con contraseña incorrecta', () => {})
test('debería mostrar error cuando usuario no existe', () => {})
```

#### 8.2.2 Grouping Related Tests

```javascript
describe('AuthenticationService', () => {
  describe('cuando las credenciales son válidas', () => {
    test('debería retornar token de acceso', () => {})
    test('debería actualizar último login', () => {})
  })
  
  describe('cuando las credenciales son inválidas', () => {
    test('debería retornar error de autenticación', () => {})
    test('debería registrar intento fallido', () => {})
  })
})
```

### 8.3 Mocking Best Practices

#### 8.3.1 Mock External Dependencies

```javascript
// Mock servicios externos
vi.mock('../../services/api', () => ({
  userService: {
    authenticate: vi.fn(),
    getUserProfile: vi.fn(),
  }
}))

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
  }
})
```

#### 8.3.2 Clean Up Mocks

```javascript
describe('Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })
})
```

### 8.4 Async Testing

#### 8.4.1 Testing Promises

```javascript
test('debería cargar datos asíncronamente', async () => {
  const mockData = [{ id: 1, name: 'Test' }]
  apiService.getData.mockResolvedValue(mockData)
  
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

#### 8.4.2 Testing Error States

```javascript
test('debería mostrar error cuando la API falla', async () => {
  apiService.getData.mockRejectedValue(new Error('API Error'))
  
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Error al cargar datos')).toBeInTheDocument()
  })
})
```

---

## 9. Casos de Test por Funcionalidad

### 9.1 Autenticación

| Escenario | Frontend Test | Backend Test |
|-----------|---------------|--------------|
| Login exitoso | ✅ Formulario de login | ✅ LoginUserUseCase |
| Credenciales inválidas | ✅ Mensajes de error | ✅ InvalidPasswordError |
| Usuario no existe | ✅ Manejo de 404 | ✅ InvalidUsernameError |
| Registro exitoso | 🔄 En desarrollo | ✅ RegisterUserUseCase |
| Usuario ya existe | 🔄 En desarrollo | ✅ Validación duplicados |

### 9.2 Denuncias

| Escenario | Frontend Test | Backend Test |
|-----------|---------------|--------------|
| Crear denuncia | ✅ DenunciaPage | ✅ CreateDenunciaUseCase |
| Validación campos | ✅ Formulario | 🔄 En desarrollo |
| Subir evidencias | 🔄 En desarrollo | 🔄 En desarrollo |
| Seguimiento | 🔄 En desarrollo | 🔄 En desarrollo |

### 9.3 Chat/Muro

| Escenario | Frontend Test | Backend Test |
|-----------|---------------|--------------|
| Enviar mensaje | ✅ ChatBotPage | ✅ Muro routes |
| Persistencia local | ✅ localStorage | N/A |
| Reacciones | ✅ Sistema reacciones | 🔄 En desarrollo |
| Posts anónimos | 🔄 En desarrollo | ✅ Validación |

### 9.4 Administración

| Escenario | Frontend Test | Backend Test |
|-----------|---------------|--------------|
| Ver denuncias | ✅ AdminPage | 🔄 En desarrollo |
| Gestionar posts | ✅ AdminPage | 🔄 En desarrollo |
| Exportar reportes | ✅ UI interaction | 🔄 En desarrollo |
| Crear anuncios | ✅ UI interaction | 🔄 En desarrollo |

---

## 10. Plan de Mejoras

### 10.1 Tests Pendientes

#### 10.1.1 Frontend
- [ ] Tests de componentes de navegación
- [ ] Tests de formularios de registro  
- [ ] Tests de subida de archivos
- [ ] Tests E2E con Playwright/Cypress
- [ ] Tests de accesibilidad

#### 10.1.2 Backend
- [ ] Tests de middlewares de autenticación
- [ ] Tests de validación de archivos
- [ ] Tests de integración con MongoDB
- [ ] Tests de performance
- [ ] Tests de seguridad

### 10.2 Herramientas Adicionales

- **Storybook**: Para testing visual de componentes
- **MSW**: Mock Service Worker para APIs
- **Playwright**: Tests E2E
- **Jest-axe**: Tests de accesibilidad
- **Artillery**: Tests de carga

### 10.3 CI/CD Integration

```yaml
# .github/workflows/tests.yml
name: Tests
on: [push, pull_request]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - run: cd frontend && npm ci
      - run: cd frontend && npm test

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
      - run: pip install -e .
      - run: pytest --cov=backend/app tests/
```

---

## 📞 Contacto y Soporte

- **Equipo de QA**: qa@escu-project.com
- **Documentación**: [Wiki del proyecto](https://github.com/AnLu996/ESCU-Project/wiki)
- **Issues**: [GitHub Issues](https://github.com/AnLu996/ESCU-Project/issues)

---

**Última actualización:** Julio 2025  
**Versión del documento:** 1.0  
**Equipo ESCU Project** - Garantizando la calidad del software
