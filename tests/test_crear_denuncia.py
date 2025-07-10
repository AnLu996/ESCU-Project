from unittest.mock import Mock
from app.application.use_cases.create_denuncia import CreateDenunciaUseCase
from app.domain.models.denuncia import Denuncia


def test_execute_crea_y_guarda_denuncia():
    # Arrange: Crear un repositorio simulado (mock)
    mock_repo = Mock()

    # Crear una denuncia falsa (lo que esperamos que se devuelva)
    fake_denuncia = Denuncia(
        categoria="Robo",
        descripcion="Me robaron la mochila",
        lugar="Plaza central",
        fecha_hecho="2025-07-10",
        involucrados="Desconocido",
        evidencia="foto.jpg",
        usuario="juan123"
    )
    mock_repo.save.return_value = fake_denuncia

    # Crear la instancia del caso de uso con el repositorio falso
    use_case = CreateDenunciaUseCase(mock_repo)

    # Act: Ejecutar la lógica de negocio
    result, success = use_case.execute(
        categoria="Robo",
        descripcion="Me robaron la mochila",
        lugar="Plaza central",
        fecha_hecho="2025-07-10",
        involucrados="Desconocido",
        evidencia="foto.jpg",
        usuario="juan123"
    )

    # Assert: Verificar el resultado
    assert success is True
    assert isinstance(result, Denuncia)
    assert result.categoria == "Robo"
    assert result.usuario == "juan123"
    mock_repo.save.assert_called_once()
    print("Denuncia guardada:", vars(result))
    print("Atributos:", vars(result))
