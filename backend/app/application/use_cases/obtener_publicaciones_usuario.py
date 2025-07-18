from app.domain.repositories.publicacion_repo import PublicacionRepository
from app.domain.models.publicacion import Publicacion


class ObtenerMisPublicacionesUseCase:
    def __init__(self, publicacion_repo: PublicacionRepository):
        self.publicacion_repo = publicacion_repo

    def execute(self, usuario: str) -> list[Publicacion]:
        return self.publicacion_repo.obtener_por_usuario(usuario)
