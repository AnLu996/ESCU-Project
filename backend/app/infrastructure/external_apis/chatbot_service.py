from typing import Dict, List
import random

class SimulatedChatbot:
    def __init__(self):
        self.respuestas: Dict[str, List[str]] = {
            "triste": [
                "Lamento que te sientas así. ¿Te gustaría contarme qué lo causó?",
                "Estoy contigo en estos momentos difíciles. ¿Quieres desahogarte?",
                "A veces hablar ayuda. Estoy aquí para escucharte.",
                "La tristeza es una emoción válida. No estás sola/o.",
                "¿Quieres que hablemos sobre lo que te entristece?"
            ],
            "ansioso": [
                "La ansiedad puede ser muy difícil. Estoy aquí para escucharte.",
                "Respira profundo, estoy contigo. ¿Qué te preocupa?",
                "No estás solo/a, todos sentimos ansiedad en algún momento.",
                "¿Qué situación te está generando esta ansiedad?",
                "Podemos hablar de lo que te está angustiando, si lo deseas."
            ],
            "feliz": [
                "¡Me alegra mucho! ¿Qué ocurrió para que estés así?",
                "¡Eso es genial! ¿Quieres compartir tu alegría conmigo?",
                "¡Qué bonito escuchar eso! Cuéntame más.",
                "La felicidad se contagia. ¡Gracias por compartirla!",
                "¿Qué fue lo más emocionante de tu día?"
            ],
            "estresado": [
                "El estrés puede agotarte. ¿Qué ha estado pasando?",
                "Tomar una pausa a veces ayuda. ¿Quieres que hablemos de ello?",
                "Puedes contarme lo que te está sobrecargando.",
                "Es válido sentirse así. Estoy aquí para ti.",
                "¿Qué ha sido lo más difícil últimamente?"
            ],
            "solo": [
                "Lamento que te sientas solo/a. Aquí estoy contigo.",
                "Aunque no lo parezca, siempre hay alguien dispuesto a escuchar.",
                "Puedes contarme cómo te sientes, estoy aquí para apoyarte.",
                "Estoy aquí. ¿Quieres hablar de lo que sientes?",
                "La soledad duele, pero no estás solo/a en este momento."
            ],
            "hola": [
                "Hola :) ¿Cómo te sientes hoy?",
                "¡Hola! Estoy aquí para escucharte.",
                "¡Hola! ¿Qué tal va tu día?",
                "Hola, estoy listo para acompañarte."
            ],
            "adiós": [
                "Cuídate mucho. Estoy aquí si me necesitas.",
                "Fue un gusto hablar contigo. Hasta pronto.",
                "Recuerda que siempre puedes volver a escribirme.",
                "Espero que tengas un día tranquilo. ¡Nos vemos!"
            ],
            "miedo": [
                "Sentir miedo es natural. ¿Quieres contarme qué te asusta?",
                "Estoy aquí contigo, no estás solo/a.",
                "A veces hablar sobre lo que nos da miedo ayuda.",
                "¿Hay algo que puedas hacer para sentirte más seguro/a ahora?"
            ],
            "agradecido": [
                "¡Qué bonito que te sientas así! ¿Quieres contarme por qué?",
                "La gratitud transforma. Me alegra escuchar eso.",
                "Gracias por compartir algo tan positivo.",
                "Es un buen momento para sonreír :)"
            ]
        }

        self.default_responses = [
            "Te escucho. Cuéntame más si quieres.",
            "Estoy aquí para ti. ¿Qué más quieres compartir?"
        ]

        self.conversation_history: List[Dict[str, str]] = []  # historial de conversación
        self.estado_emocional: str = ""  # última emoción detectada

    def obtener_respuesta(self, user_message: str) -> str:
        self.conversation_history.append({"role": "user", "content": user_message})

        mensaje_lower = user_message.lower()
        emocion_detectada = None

        for keyword in self.respuestas:
            if keyword in mensaje_lower:
                emocion_detectada = keyword
                self.estado_emocional = keyword 
                response = random.choice(self.respuestas[keyword])
                break

        if not emocion_detectada and self.estado_emocional:
            # No se detectó nueva emoción, pero hay una previa
            response = f"Seguimos hablando de cómo te sientes {self.estado_emocional}. ¿Algo más que quieras contar?"
        elif not emocion_detectada:
            # No se detectó ninguna emoción
            response = random.choice(self.default_responses)

        self.conversation_history.append({"role": "bot", "content": response})
        return response