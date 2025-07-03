from app.domain.models.publicacion import Publicacion
from app.infrastructure.database.publicacion_document import (
    Publicacion as PublicacionDocument
)
from app.domain.repositories.publicacion_repo import PublicacionRepository


class MongoPublicacionRepository(PublicacionRepository):
    def crear(self, publicacion: Publicacion) -> Publicacion:
        publicacion_document = PublicacionDocument(
            contenido=publicacion.contenido,
            fecha_creacion=publicacion.fecha_creacion,
            fecha_actualizacion=publicacion.fecha_actualizacion,
            reacciones=publicacion.reacciones,
            usuario=publicacion.usuario,
            anonimo=publicacion.anonimo
        )
        publicacion_document.save()
        publicacion.id = str(publicacion_document.id)
        return publicacion

    def listar(self):
        return Publicacion.objects.order_by("-fecha_creacion")
