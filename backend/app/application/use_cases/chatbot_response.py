from app.infrastructure.external_apis.huggingface_service import HuggingFaceChatService

class ChatbotResponseUseCase:
    def __init__(self):
        self.chat_service = HuggingFaceChatService()

    def execute(self, mensaje_usuario: str) -> str:
        return self.chat_service.obtener_respuesta(mensaje_usuario)
