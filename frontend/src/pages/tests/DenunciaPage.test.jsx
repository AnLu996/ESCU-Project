import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ReportPage from '../DenunciaPage';
import { denunciaService } from '../../services/api';

jest.mock('../../services/api', () => ({
  denunciaService: {
    crearDenuncia: jest.fn(),
  },
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Formulario de Denuncia', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el título del formulario', () => {
    renderWithRouter(<ReportPage />);
    expect(screen.getByText(/Formulario de Denuncia/i)).toBeInTheDocument();
  });

  test('no permite enviar si faltan campos requeridos', async () => {
    renderWithRouter(<ReportPage />);
    await userEvent.click(screen.getByRole('button', { name: /Enviar Denuncia/i }));
    expect(denunciaService.crearDenuncia).not.toHaveBeenCalled();
  });

  test('envía correctamente el formulario con datos válidos', async () => {
    denunciaService.crearDenuncia.mockResolvedValue({ success: true });

    renderWithRouter(<ReportPage />);
    await userEvent.type(screen.getByPlaceholderText(/acoso/i), 'Acoso');
    await userEvent.type(screen.getByPlaceholderText(/Describe lo sucedido/i), 'Algo sucedió');
    await userEvent.type(screen.getByPlaceholderText(/Pasillo B/i), 'Pasillo B');

    await userEvent.click(screen.getByRole('button', { name: /Enviar Denuncia/i }));

    expect(denunciaService.crearDenuncia).toHaveBeenCalledTimes(1);
  });
});
