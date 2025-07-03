from abc import ABC, abstractmethod
from typing import List
from app.domain.models.publicacion import Publicacion


class PublicacionRepository(ABC):
    @abstractmethod
    def crear(self, publicacion: Publicacion) -> Publicacion:
        pass

    @abstractmethod
    def listar(self) -> List[Publicacion]:
        pass
