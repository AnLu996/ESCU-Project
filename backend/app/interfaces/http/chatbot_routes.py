from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.application.use_cases.chatbot_response import ChatbotResponseUseCase

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

@chatbot_bp.route('', methods=['POST'])
@jwt_required()
def responder_chat():
    data = request.get_json()
    mensaje = data.get("mensaje")
    if not mensaje:
        return jsonify({"error": "Mensaje requerido"}), 400

    use_case = ChatbotResponseUseCase()
    respuesta = use_case.execute(mensaje)

    return jsonify({"respuesta": respuesta}), 200
