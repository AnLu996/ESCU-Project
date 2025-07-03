import pytest
from backend.app.application.use_cases.login_user import LoginUserUseCase
from backend.app.domain.models.user import User
from unittest.mock import Mock, patch


def test_login_exitoso():
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = User(alias="usuario123", password_hash="abc123")

    with patch("app.domain.services.password_service.PasswordService.hash_password", return_value="abc123"):
        use_case = LoginUserUseCase(mock_repo)
        result = use_case.execute("usuario123", "contrasena123")

    assert result is True


def test_login_fallido_usuario_no_existe():
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = None

    use_case = LoginUserUseCase(mock_repo)
    result = use_case.execute("desconocido", "pass")

    assert result is False


def test_login_fallido_password_incorrecta():
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = User(alias="usuario123", password_hash="abc123")

    with patch("app.domain.services.password_service.PasswordService.hash_password", return_value="otrahash"):
        use_case = LoginUserUseCase(mock_repo)
        result = use_case.execute("usuario123", "pass_incorrecta")

    assert result is False
