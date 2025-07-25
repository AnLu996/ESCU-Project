from dataclasses import dataclass


@dataclass
class User:
    alias: str
    password_hash: str
    rol: str

    @staticmethod
    def create(alias: str, password_hash: str, rol: str) -> 'User':
        return User(alias=alias, password_hash=password_hash, rol=rol)
