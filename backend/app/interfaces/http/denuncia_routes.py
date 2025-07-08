from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.application.use_cases.create_denuncia import CreateDenunciaUseCase
from app.infrastructure.database.denuncia_repo_impl import (
    MongoDenunciaRepository
)
from app.infrastructure.database.user_document import UserDocument
from datetime import datetime

denuncia_bp = Blueprint('denuncias', __name__, url_prefix='/api/denuncias')


@denuncia_bp.route('/', methods=['POST'])
@jwt_required()
def create_denuncia():
    data = request.get_json()
    required_fields = ['categoria', 'descripcion', 'lugar', 'fecha_hecho']

    # Validar campos requeridos
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan campos requeridos"}), 400

    # Obtener usuario actual del token JWT
    current_user_alias = get_jwt_identity()
    user = UserDocument.objects(alias=current_user_alias).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Convertir fecha_hecho
    try:
        fecha_hecho = datetime.fromisoformat(data['fecha_hecho'])
    except ValueError:
        return jsonify({"error":
                        "Formato de fecha_hecho inválido. Usa ISO 8601."}), 400

    # Ejecutar caso de uso
    use_case = CreateDenunciaUseCase(MongoDenunciaRepository())
    result, success = use_case.execute(
        categoria=data['categoria'],
        descripcion=data['descripcion'],
        lugar=data['lugar'],
        fecha_hecho=fecha_hecho,
        involucrados=data.get('involucrados', []),
        evidencia=data.get('evidencia', []),
        usuario=user
    )

    if not success:
        return jsonify({'error': result}), 400

    return jsonify({'message': "Denuncia creada exitosamente",
                    "denuncia_id": result}), 201


@denuncia_bp.route('/mis-denuncias', methods=['GET'])
@jwt_required()
def mis_denuncias():
    current_user_alias = get_jwt_identity()
    user = UserDocument.objects(alias=current_user_alias).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    repo = MongoDenunciaRepository()
    denuncias = repo.find_by_user(user)
    return jsonify(denuncias), 200
