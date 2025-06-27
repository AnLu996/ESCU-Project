from flask import Blueprint, request, jsonify
from app.application.use_cases.register_user import RegisterUserUseCase
from app.infrastructure.database.user_repo_impl import MongoUserRepository


auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    alias = data.get('alias')
    password = data.get('password')

    if not alias or not password:
        return jsonify({'error': 'Alias y contraseña son requeridos'}), 400

    use_case = RegisterUserUseCase(MongoUserRepository())
    success = use_case.execute(alias, password)

    if not success:
        return jsonify({'error': 'El alias ya está en uso'}), 400

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201
