import requests
from app.config.settings import settings  

class HuggingFaceChatService:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
        self.headers = {
            "Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}",
            "Content-Type": "application/json"
        }

    def obtener_respuesta(self, mensaje_usuario: str) -> str:
        try:
            payload = {
                "inputs": f"Usuario: {mensaje_usuario}\nBot:"
            }

            response = requests.post(self.api_url, headers=self.headers, json=payload)
            response.raise_for_status()
            respuesta = response.json()

            if isinstance(respuesta, list) and "generated_text" in respuesta[0]:
                return respuesta[0]["generated_text"].split("Bot:")[-1].strip()

            return "No entendí bien, ¿puedes repetirlo?"

        except Exception as e:
            print(f"[ERROR HuggingFace]: {e}")
            return "Hubo un error al procesar tu mensaje."
