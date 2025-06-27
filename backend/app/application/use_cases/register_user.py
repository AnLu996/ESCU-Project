class RegisterUserUseCase:
    def __init__(self, user_repo):
        self.user_repo = user_repo

    def execute(self, alias, password):
        if self.user_repo.exists_by_alias(alias):
            return {"message": "Alias ya existe"}, 400
        
        hashed_password = hash_password(password)  # utilitario
        self.user_repo.create_user(alias, hashed_password)
        return {"message": "Registro exitoso"}, 201
