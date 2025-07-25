from app.infrastructure.database.user_document import UserDocument
from app.domain.services.password_service import PasswordService


def create_admin_user():
    alias = "admin"
    password = "admin123"

    if UserDocument.objects(alias=alias).first() is not None:
        return

    password_hash = PasswordService.hash_password(password)
    UserDocument(
        alias=alias,
        password_hash=password_hash,
        rol='admin'
    ).save()

    print("Usuario administrador creado exitosamente.")
