from app.infrastructure.external_apis.chatbot_service import SimulatedChatbot
#from app.infrastructure.external_apis.openai_service import OpenAIChatService

class ChatbotResponseUseCase:
    def __init__(self):
        self.chat_service = SimulatedChatbot()

    def execute(self, mensaje_usuario: str) -> str:
        return self.chat_service.obtener_respuesta(mensaje_usuario)
