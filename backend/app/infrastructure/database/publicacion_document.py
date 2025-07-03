from datetime import datetime
from mongoengine import (
    Document, StringField, DateTimeField, DictField, ReferenceField,
    BooleanField
)
from app.infrastructure.database.user_document import UserDocument


class Publicacion(Document):
    contenido = StringField(required=True, max_length=1000)
    fecha_creacion = DateTimeField(default=datetime.now)
    fecha_actualizacion = DateTimeField(default=datetime.now)
    reacciones = DictField(default=lambda: {
        "me_gusta": 0, "abrazo": 0, "fuerza": 0
    })
    usuario = ReferenceField(UserDocument, required=True)
    anonimo = BooleanField(default=True)

    meta = {
        "collection": "publicaciones",
        "indexes": ["-fecha_creacion"]
    }
