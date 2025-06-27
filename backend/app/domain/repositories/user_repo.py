class UserRepository:
    def exists_by_alias(self, alias):
        raise NotImplementedError

    def create_user(self, alias, password):
        raise NotImplementedError
