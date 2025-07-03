from datetime import datetime
from app.domain.models.publicacion import Publicacion
from app.domain.repositories.publicacion_repo import PublicacionRepository


class CrearPublicacionUseCase:
    def __init__(self, repositorio: PublicacionRepository):
        self.repositorio = repositorio

    def execute(
        self, contenido: str, usuario, anonimo: bool = True
    ) -> Publicacion:
        nueva_publicacion = Publicacion(
            contenido=contenido,
            usuario=usuario,
            anonimo=anonimo,
            fecha_creacion=datetime.now(),
            fecha_actualizacion=datetime.now(),
            reacciones={
                "me_gusta": 0,
                "abrazo": 0,
                "fuerza": 0
            }
        )
        return self.repositorio.crear(nueva_publicacion)
