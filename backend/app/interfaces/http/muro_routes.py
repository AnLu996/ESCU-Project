from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.infrastructure.database.user_document import UserDocument
from app.infrastructure.database.publicacion_repo_impl import (
    MongoPublicacionRepository
)
from app.application.use_cases.crear_publicacion import CrearPublicacionUseCase


muro_bp = Blueprint("muro", __name__, url_prefix="/api/muro")
repositorio = MongoPublicacionRepository()


@muro_bp.route("/", methods=["POST"])
@jwt_required()
def crear_publicacion():
    data = request.get_json()
    contenido = data.get("contenido", "").strip()
    anonimo = data.get("anonimo", True)

    if not contenido:
        return jsonify({"error": "El contenido no puede estar vacío"}), 400

    user_id = get_jwt_identity()
    autor = UserDocument.objects(alias=user_id).first()
    if not autor:
        return jsonify({"error": "Usuario no encontrado"}), 404

    use_case = CrearPublicacionUseCase(MongoPublicacionRepository())
    nueva_publicacion = use_case.execute(contenido, autor, anonimo)

    return jsonify({
        "id": nueva_publicacion.id,
        "contenido": nueva_publicacion.contenido,
        "fecha_creacion": nueva_publicacion.fecha_creacion.isoformat(),
        "reacciones": nueva_publicacion.reacciones,
        "anonimo": nueva_publicacion.anonimo
    }), 201
