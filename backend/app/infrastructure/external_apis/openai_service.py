from openai import OpenAI, APIError, APIConnectionError
from app.config.settings import settings  

class OpenAIChatService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    def obtener_respuesta(self, mensaje_usuario: str) -> str:
        try:
            respuesta = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "Eres un chatbot emocional que ayuda a estudiantes "
                            "a expresar sus sentimientos de forma segura. Sé empático, corto y motivador."
                        ),
                    },
                    {"role": "user", "content": mensaje_usuario},
                ],
                temperature=0.7,
            )
            return respuesta.choices[0].message.content.strip()

        except APIConnectionError as e:
            print(f"[ERROR] Fallo de conexión: {e}")
            return "No pude conectarme al servidor. Revisa tu internet."
        except APIError as e:
            print(f"[ERROR] API de OpenAI: {e}")
            return "Hubo un error en el servicio. Intenta más tarde."
        except Exception as e:
            print(f"[ERROR inesperado]: {e}")
            return "Algo salió mal. Por favor, repórtalo."
