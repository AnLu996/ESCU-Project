from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.application.use_cases.chatbot_response import ChatbotResponseUseCase

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

@chatbot_bp.route('', methods=['POST'])
@jwt_required()
def responder_chat():
    if not request.is_json:
        return jsonify({"error": "Content-Type debe ser application/json"}), 400

    data = request.get_json()
    mensaje = data.get("mensaje")
    if not mensaje:
        return jsonify({"error": "Campo 'mensaje' es requerido"}), 400

    try:
        use_case = ChatbotResponseUseCase()
        respuesta = use_case.execute(mensaje)
        return jsonify({"respuesta": respuesta}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
