from app.domain.repositories.denuncia_repo import DenunciaRepository


class EliminarDenunciaUseCase:
    def __init__(self, denuncia_repo: DenunciaRepository):
        self.denuncia_repo = denuncia_repo

    def execute(self, denuncia_id: str) -> bool:
        return self.denuncia_repo.eliminar_por_id(denuncia_id)
