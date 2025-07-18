# tests/test_muro_routes.py
import pytest
from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token
from unittest.mock import patch, MagicMock
from datetime import datetime

# Importa el blueprint
from backend.app.interfaces.http.muro_routes import muro_bp

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
    # Genera el token dentro del contexto de la app para que JWT funcione
    with app.test_request_context():
        return create_access_token(identity="usuario_test")

# POST /api/muro/ (crear_publicacion)

def test_crear_publicacion_contenido_vacio(client, token):
    resp = client.post(
        "/api/muro/",
        json={"contenido": "", "anonimo": False},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 400
    assert resp.json["error"] == "El contenido no puede estar vacío"

@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
def test_crear_publicacion_usuario_no_encontrado(mock_user_objects, client, token):
    mock_user_objects.return_value.first.return_value = None
    resp = client.post(
        "/api/muro/",
        json={"contenido": "¡Hola!", "anonimo": False},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 404
    assert resp.json["error"] == "Usuario no encontrado"

@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
@patch("backend.app.interfaces.http.muro_routes.CrearPublicacionUseCase")
@patch("backend.app.interfaces.http.muro_routes.MongoReaccionRepository")
def test_crear_publicacion_exito(
    mock_reaccion_repo_cls,
    mock_usecase_cls,
    mock_user_objects,
    client,
    token
):
    # Simular usuario válido
    usuario = MagicMock(id="user-id")
    mock_user_objects.return_value.first.return_value = usuario

    # Simular caso de uso
    publicacion = MagicMock()
    publicacion.id = "pub-123"
    publicacion.contenido = "Contenido de prueba"
    publicacion.fecha_creacion = datetime(2025, 7, 18, 15, 30)
    publicacion.anonimo = True

    uc = MagicMock()
    uc.execute.return_value = publicacion
    mock_usecase_cls.return_value = uc

    # Simular repositorio de reacciones
    repo_reac = MagicMock()
    repo_reac.contar_por_tipo.return_value = {"me_gusta": 2, "abrazo": 1, "fuerza": 0}
    mock_reaccion_repo_cls.return_value = repo_reac

    resp = client.post(
        "/api/muro/",
        json={"contenido": "Contenido de prueba", "anonimo": True},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 201
    assert resp.json == {
        "id": "pub-123",
        "contenido": "Contenido de prueba",
        "fecha_creacion": "2025-07-18T15:30:00",
        "reacciones": {"me_gusta": 2, "abrazo": 1, "fuerza": 0},
        "anonimo": True
    }

#
# GET /api/muro/ (obtener_publicaciones)
#

@patch("backend.app.interfaces.http.muro_routes.ObtenerPublicacionesUseCase")
@patch("backend.app.interfaces.http.muro_routes.MongoReaccionRepository")
def test_obtener_publicaciones(mock_reaccion_repo_cls, mock_usecase_cls, client):
    # Simular publicaciones
    pub1 = MagicMock()
    pub1.id = "p1"
    pub1.contenido = "A"
    pub1.fecha_creacion = datetime(2025,7,17,10,0)
    pub1.fecha_actualizacion = datetime(2025,7,17,12,0)
    pub1.usuario = "usuario1"
    pub1.anonimo = False

    pub2 = MagicMock()
    pub2.id = "p2"
    pub2.contenido = "B"
    pub2.fecha_creacion = datetime(2025,7,16,9,0)
    pub2.fecha_actualizacion = datetime(2025,7,16,11,0)
    pub2.usuario = "usuario2"
    pub2.anonimo = True

    uc = MagicMock()
    uc.execute.return_value = [pub1, pub2]
    mock_usecase_cls.return_value = uc

    # Simular conteo de reacciones
    repo_reac = MagicMock()
    repo_reac.contar_por_tipo.side_effect = [
        {"me_gusta": 1, "abrazo": 0, "fuerza": 0},
        {"me_gusta": 0, "abrazo": 3, "fuerza": 0}
    ]
    mock_reaccion_repo_cls.return_value = repo_reac

    resp = client.get("/api/muro/")
    assert resp.status_code == 200
    assert resp.json == [
        {
            "id": "p1",
            "contenido": "A",
            "fecha_creacion": "2025-07-17T10:00:00",
            "fecha_actualizacion": "2025-07-17T12:00:00",
            "reacciones": {"me_gusta": 1, "abrazo": 0, "fuerza": 0},
            "usuario": "usuario1",
            "anonimo": False
        },
        {
            "id": "p2",
            "contenido": "B",
            "fecha_creacion": "2025-07-16T09:00:00",
            "fecha_actualizacion": "2025-07-16T11:00:00",
            "reacciones": {"me_gusta": 0, "abrazo": 3, "fuerza": 0},
            "usuario": "usuario2",
            "anonimo": True
        }
    ]

#
# PATCH /api/muro/<id> (editar_publicacion)
#

@patch("backend.app.interfaces.http.muro_routes.EditarPublicacionUseCase")
def test_editar_publicacion_sin_contenido(mock_usecase_cls, client, token):
    resp = client.patch(
        "/api/muro/any-id",
        json={"contenido": ""},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 400
    assert resp.json["error"] == "El contenido no puede estar vacío"

@patch("backend.app.interfaces.http.muro_routes.EditarPublicacionUseCase")
def test_editar_publicacion_sin_permiso(mock_usecase_cls, client, token):
    uc = MagicMock()
    uc.execute.return_value = False
    mock_usecase_cls.return_value = uc

    resp = client.patch(
        "/api/muro/any-id",
        json={"contenido": "Nuevo"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 403
    assert resp.json["error"] == "No tienes permisos para editar esta publicación"

@patch("backend.app.interfaces.http.muro_routes.EditarPublicacionUseCase")
def test_editar_publicacion_exito(mock_usecase_cls, client, token):
    uc = MagicMock()
    uc.execute.return_value = True
    mock_usecase_cls.return_value = uc

    resp = client.patch(
        "/api/muro/any-id",
        json={"contenido": "Nuevo"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    assert resp.json["mensaje"] == "Publicación editada correctamente"


# DELETE /api/muro/<id> (eliminar_publicacion)

@patch("backend.app.interfaces.http.muro_routes.EliminarPublicacionUseCase")
def test_eliminar_publicacion_sin_permiso(mock_usecase_cls, client, token):
    uc = MagicMock()
    uc.execute.return_value = False
    mock_usecase_cls.return_value = uc

    resp = client.delete(
        "/api/muro/any-id",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 403
    assert resp.json["error"] == "No tienes permisos para eliminar esta publicación"

@patch("backend.app.interfaces.http.muro_routes.EliminarPublicacionUseCase")
def test_eliminar_publicacion_exito(mock_usecase_cls, client, token):
    uc = MagicMock()
    uc.execute.return_value = True
    mock_usecase_cls.return_value = uc

    resp = client.delete(
        "/api/muro/any-id",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    assert resp.json["mensaje"] == "Publicación eliminada correctamente"

# POST /api/muro/<id>/reaccionar (reaccionar_publicacion) 

def test_reaccionar_sin_usuario(client, token):
    with patch("backend.app.interfaces.http.muro_routes.UserDocument.objects") as mock_user:
        mock_user.return_value.first.return_value = None

        resp = client.post(
            "/api/muro/any-id/reaccionar",
            json={"reaccion": "me_gusta"},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 404
        assert resp.json["error"] == "Usuario no encontrado"

@patch("backend.app.interfaces.http.muro_routes.ReaccionarPublicacionUseCase")
@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
def test_reaccionar_ya_hecha(mock_user, mock_usecase_cls, client, token):
    mock_user.return_value.first.return_value = MagicMock(id="u1")
    uc = MagicMock()
    uc.execute.return_value = False
    mock_usecase_cls.return_value = uc

    resp = client.post(
        "/api/muro/any-id/reaccionar",
        json={"reaccion": "abrazo"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 403
    assert resp.json["error"] == "Ya has reaccionado a esta publicación"
