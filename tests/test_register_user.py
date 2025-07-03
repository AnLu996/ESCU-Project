import pytest
from backend.app.application.use_cases.register_user import RegisterUserUseCase
from backend.app.domain.models.user import User
from unittest.mock import Mock, patch


def test_registro_exitoso():
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = None  # Usuario no existe

    with patch("app.domain.services.password_service.PasswordService.hash_password", return_value="hashed_pass"), \
         patch("app.domain.models.user.User.create", return_value=User("usuario123", "hashed_pass")):
        
        use_case = RegisterUserUseCase(mock_repo)
        result = use_case.execute("usuario123", "pass123")

    assert result is True
    mock_repo.save.assert_called_once()


def test_registro_falla_usuario_existente():
    mock_repo = Mock()
    mock_repo.find_by_alias.return_value = User("usuario123", "hashed_pass")

    use_case = RegisterUserUseCase(mock_repo)
    result = use_case.execute("usuario123", "pass123")

    assert result is False
    mock_repo.save.assert_not_called()
