from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()  

class OpenAIChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def obtener_respuesta(self, mensaje_usuario: str) -> str:
        try:
            respuesta = self.client.chat.completions.create(
                model="gpt-3.5-turbo", 
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un chatbot emocional que ayuda a estudiantes a expresar sus sentimientos de forma segura. Sé empático, corto y motivador.",
                    },
                    {"role": "user", "content": mensaje_usuario},
                ],
                temperature=0.7,
            )

            return respuesta.choices[0].message.content.strip()

        except Exception as e:
            print(f"[ERROR ChatGPT]: {e}")
            return "Hubo un error al procesar tu mensaje. Intenta más tarde."
