from app.domain.repositories.denuncia_repo import DenunciaRepository
from app.domain.models.denuncia import Denuncia


class ObtenerDenunciasUseCase:
    def __init__(self, denuncia_repo: DenunciaRepository):
        self.denuncia_repo = denuncia_repo

    def execute(self) -> list[Denuncia]:
        return self.denuncia_repo.find_all()
