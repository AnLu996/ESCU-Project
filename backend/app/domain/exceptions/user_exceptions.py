class AliasYaExiste(Exception):
    pass
class InvalidUsernameError(Exception):
    def __init__(self, message="Alias no válido"):
        super().__init__(message)

class InvalidPasswordError(Exception):
    def __init__(self, message="Contraseña no válida"):
        super().__init__(message)