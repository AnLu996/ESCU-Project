from abc import ABC, abstractmethod
from app.domain.models.denuncia import Denuncia


class DenunciaRepository(ABC):
    @abstractmethod
    def save(self, denuncia: Denuncia) -> str:
        """Guarda una denuncia y devuelve su ID"""
        pass

    @abstractmethod
    def find_by_id(self, denuncia_id: str) -> Denuncia | None:
        """Busca una denuncia por ID"""
        pass

    @abstractmethod
    def find_by_user(self, user) -> list[Denuncia]:
        """Devuelve las denuncias de un usuario"""
        pass

    @abstractmethod
    def find_all(self) -> list[Denuncia]:
        """Devuelve las denuncias realizadas por todos los usuarios"""
        pass

    @abstractmethod
    def eliminar_por_id(self, denuncia_id: str) -> bool: 
        """Elimina una denuncia por su ID"""
        pass

