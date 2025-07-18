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


@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
def test_editar_publicacion_end_to_end(mock_user_objects, monkeypatch, app, client, token):
    # Stub usuario autenticado
    usuario = MagicMock(id="u1", alias="usuario_test")
    mock_user_objects.return_value.first.return_value = usuario

    # Stub repositorios en memoria
    storage = []
    class InMemoryPubRepo:
        def __init__(self): pass
        def save(self, contenido, autor, anonimo):
            pub = MagicMock(
                id=str(len(storage) + 1),
                contenido=contenido,
                fecha_creacion=datetime.now(),
                fecha_actualizacion=datetime.now(),
                usuario=autor.alias,
                anonimo=anonimo
            )
            storage.append(pub)
            return pub
        def update(self, pub_id, nuevo_contenido, alias):
            # asumimos solo uno
            storage[0].contenido = nuevo_contenido
            return True
        def find_all(self):
            return list(storage)
    class InMemoryReacRepo:
        def __init__(self): pass
        def contar_por_tipo(self, publicacion_id):
            return {}

    import backend.app.interfaces.http.muro_routes as muro_module

    monkeypatch.setattr(muro_module, "MongoPublicacionRepository", lambda *args, **kw: InMemoryPubRepo())
    monkeypatch.setattr(muro_module, "MongoReaccionRepository", lambda *args, **kw: InMemoryReacRepo())
    monkeypatch.setattr(
        muro_module,
        "CrearPublicacionUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self, c, a, n: InMemoryPubRepo().save(c, a, n)})()
    )
    monkeypatch.setattr(
        muro_module,
        "EditarPublicacionUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self, pid, c, alias: InMemoryPubRepo().update(pid, c, alias)})()
    )
    monkeypatch.setattr(
        muro_module,
        "ObtenerPublicacionesUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self: InMemoryPubRepo().find_all()})()
    )

    # Publicar
    resp1 = client.post(
        "/api/muro/",
        json={"contenido": "Original", "anonimo": False},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp1.status_code == 201
    pub_id = resp1.json["id"]

    # Editar
    resp2 = client.patch(
        f"/api/muro/{pub_id}",
        json={"contenido": "Modificado"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp2.status_code == 200

    # Leer y comprobar
    resp3 = client.get("/api/muro/")
    assert resp3.status_code == 200
    contenidos = [p["contenido"] for p in resp3.json]
    assert "Modificado" in contenidos

@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
def test_publicar_y_listar_end_to_end(mock_user_objects, monkeypatch, app, client, token):
    # Stub usuario
    usuario = MagicMock(id="u1", alias="usuario_test")
    mock_user_objects.return_value.first.return_value = usuario

    # Repositorios en memoria
    storage = []
    class InMemoryPubRepo:
        def save(self, contenido, autor, anonimo):
            pub = MagicMock(
                id=str(len(storage) + 1),
                contenido=contenido,
                fecha_creacion=datetime.now(),
                fecha_actualizacion=datetime.now(),
                usuario=autor.alias,
                anonimo=anonimo
            )
            storage.append(pub)
            return pub
        def find_all(self):
            return list(storage)
    class InMemoryReacRepo:
        def contar_por_tipo(self, publicacion_id):
            return {}

    import backend.app.interfaces.http.muro_routes as muro_module
    monkeypatch.setattr(muro_module, "MongoPublicacionRepository",
                        lambda *args, **kw: InMemoryPubRepo())
    monkeypatch.setattr(muro_module, "MongoReaccionRepository",
                        lambda *args, **kw: InMemoryReacRepo())
    monkeypatch.setattr(
        muro_module,
        "CrearPublicacionUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self, c, a, n: InMemoryPubRepo().save(c, a, n)})()
    )
    monkeypatch.setattr(
        muro_module,
        "ObtenerPublicacionesUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self: InMemoryPubRepo().find_all()})()
    )

    # Publicar
    resp1 = client.post(
        "/api/muro/",
        json={"contenido": "¡Hola mundo!", "anonimo": False},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp1.status_code == 201
    pub_id = resp1.json["id"]

    # Listar muro
    resp2 = client.get("/api/muro/")
    assert resp2.status_code == 200
    assert any(p["id"] == pub_id and p["contenido"] == "¡Hola mundo!" for p in resp2.json)


@patch("backend.app.interfaces.http.muro_routes.UserDocument.objects")
def test_eliminar_y_listar_end_to_end(mock_user_objects, monkeypatch, app, client, token):
    # Stub de usuario autenticado
    usuario = MagicMock(id="u1", alias="usuario_test")
    mock_user_objects.return_value.first.return_value = usuario

    # Repositorios en memoria
    storage = []
    class InMemoryPubRepo:
        def save(self, contenido, autor, anonimo):
            pub = MagicMock(
                id=str(len(storage) + 1),
                contenido=contenido,
                fecha_creacion=datetime.now(),
                fecha_actualizacion=datetime.now(),
                usuario=autor.alias,
                anonimo=anonimo
            )
            storage.append(pub)
            return pub
        def delete(self, pub_id, alias):
            storage.clear()
            return True
        def find_all(self):
            return list(storage)
    class InMemoryReacRepo:
        def contar_por_tipo(self, publicacion_id):
            return {}

    import backend.app.interfaces.http.muro_routes as muro_module
    monkeypatch.setattr(muro_module, "MongoPublicacionRepository",
                        lambda *args, **kw: InMemoryPubRepo())
    monkeypatch.setattr(muro_module, "MongoReaccionRepository",
                        lambda *args, **kw: InMemoryReacRepo())
    monkeypatch.setattr(
        muro_module,
        "CrearPublicacionUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self, c, a, n: InMemoryPubRepo().save(c, a, n)})()
    )
    monkeypatch.setattr(
        muro_module,
        "EliminarPublicacionUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self, pid, alias: InMemoryPubRepo().delete(pid, alias)})()
    )
    monkeypatch.setattr(
        muro_module,
        "ObtenerPublicacionesUseCase",
        lambda *args, **kw: type("UC", (), {"execute": lambda self: InMemoryPubRepo().find_all()})()
    )

    # Creo la publicación
    resp1 = client.post(
        "/api/muro/",
        json={"contenido": "Para borrar", "anonimo": False},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp1.status_code == 201
    pub_id = resp1.json["id"]

    # La elimino
    resp2 = client.delete(
        f"/api/muro/{pub_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp2.status_code == 200

    # Hago GET y compruebo que ya no está
    resp3 = client.get("/api/muro/")
    assert resp3.status_code == 200
    assert pub_id not in [p["id"] for p in resp3.json]