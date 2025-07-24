import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminDashboard from '../AdminPage';
import { adminService } from '../../services/api';

// Mock del servicio de administración
vi.mock('../../services/api', () => ({
  adminService: {
    getDenuncias: vi.fn(),
    getPosts: vi.fn(),
  },
}));

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper para renderizar con Router
function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('AdminDashboard', () => {
  const mockDenuncias = [
    {
      categoria: 'Acoso',
      descripcion: 'Un incidente en el pasillo B',
      fechaHora: '2025-07-01T14:00',
    },
    {
      categoria: 'Robo',
      descripcion: 'Se reportó robo de laptop en la biblioteca',
      fechaHora: '2025-07-02T09:30',
    },
  ];

  const mockPosts = [
    { content: 'Hoy me siento triste 😞' },
    { content: 'Recuerda que eres fuerte 💪' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    adminService.getDenuncias.mockResolvedValue(mockDenuncias);
    adminService.getPosts.mockResolvedValue(mockPosts);
  });

  test('renderiza correctamente el título del panel de administración', async () => {
    renderWithRouter(<AdminDashboard />);
    
    expect(screen.getByText('Panel de Administración')).toBeInTheDocument();
    expect(screen.getByText('Denuncias Recientes')).toBeInTheDocument();
    expect(screen.getByText('Posts del Muro')).toBeInTheDocument();
  });

  test('renderiza el botón de volver al inicio', () => {
    renderWithRouter(<AdminDashboard />);
    
    const backButton = screen.getByText('← Volver al inicio');
    expect(backButton).toBeInTheDocument();
  });

  test('navega al inicio cuando se hace clic en volver', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminDashboard />);
    
    const backButton = screen.getByText('← Volver al inicio');
    await user.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('carga y muestra las denuncias correctamente', async () => {
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(adminService.getDenuncias).toHaveBeenCalled();
    });

    expect(screen.getByText('Acoso')).toBeInTheDocument();
    expect(screen.getByText('Un incidente en el pasillo B')).toBeInTheDocument();
    expect(screen.getByText('Robo')).toBeInTheDocument();
    expect(screen.getByText('Se reportó robo de laptop en la biblioteca')).toBeInTheDocument();
  });

  test('carga y muestra los posts correctamente', async () => {
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(adminService.getPosts).toHaveBeenCalled();
    });

    expect(screen.getByText('Hoy me siento triste 😞')).toBeInTheDocument();
    expect(screen.getByText('Recuerda que eres fuerte 💪')).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay denuncias', async () => {
    adminService.getDenuncias.mockResolvedValue([]);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay denuncias registradas.')).toBeInTheDocument();
    });
  });

  test('muestra mensaje cuando no hay posts', async () => {
    adminService.getPosts.mockResolvedValue([]);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay publicaciones.')).toBeInTheDocument();
    });
  });

  test('renderiza todos los botones de ver detalles de denuncias', async () => {
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      const verDetallesButtons = screen.getAllByText('Ver detalles');
      expect(verDetallesButtons).toHaveLength(mockDenuncias.length);
    });
  });

  test('renderiza todos los botones de eliminar posts', async () => {
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      const eliminarButtons = screen.getAllByText('Eliminar');
      expect(eliminarButtons).toHaveLength(mockPosts.length);
    });
  });

  test('renderiza la sección de acciones rápidas', () => {
    renderWithRouter(<AdminDashboard />);
    
    expect(screen.getByText('Acciones rápidas')).toBeInTheDocument();
    expect(screen.getByText('Exportar Reportes')).toBeInTheDocument();
    expect(screen.getByText('Crear Anuncio')).toBeInTheDocument();
    expect(screen.getByText('Limpiar Posts')).toBeInTheDocument();
  });

  test('los botones de acciones rápidas son clickeables', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminDashboard />);
    
    const exportarButton = screen.getByText('Exportar Reportes');
    const crearAnuncioButton = screen.getByText('Crear Anuncio');
    const limpiarPostsButton = screen.getByText('Limpiar Posts');
    
    // Verificar que los botones son clickeables (no generan errores)
    await user.click(exportarButton);
    await user.click(crearAnuncioButton);
    await user.click(limpiarPostsButton);
    
    expect(exportarButton).toBeInTheDocument();
    expect(crearAnuncioButton).toBeInTheDocument();
    expect(limpiarPostsButton).toBeInTheDocument();
  });

  test('maneja errores cuando la API de denuncias falla', async () => {
    adminService.getDenuncias.mockResolvedValue(null);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay denuncias registradas.')).toBeInTheDocument();
    });
  });

  test('maneja errores cuando la API de posts falla', async () => {
    adminService.getPosts.mockResolvedValue(null);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay publicaciones.')).toBeInTheDocument();
    });
  });

  test('muestra las fechas de las denuncias correctamente', async () => {
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('2025-07-01T14:00')).toBeInTheDocument();
      expect(screen.getByText('2025-07-02T09:30')).toBeInTheDocument();
    });
  });

  test('trunca las descripciones largas de denuncias', async () => {
    const denunciaLarga = [
      {
        categoria: 'Acoso',
        descripcion: 'Esta es una descripción muy larga que debería ser truncada para no ocupar demasiado espacio en la interfaz de usuario',
        fechaHora: '2025-07-01T14:00',
      },
    ];
    
    adminService.getDenuncias.mockResolvedValue(denunciaLarga);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      const descripcionElement = screen.getByText(/Esta es una descripción muy larga/);
      expect(descripcionElement).toHaveClass('truncate');
    });
  });

  test('aplica estilos de scroll cuando hay muchas denuncias', async () => {
    const muchasDenuncias = Array.from({ length: 10 }, (_, i) => ({
      categoria: `Categoria ${i}`,
      descripcion: `Descripción ${i}`,
      fechaHora: `2025-07-0${i % 9 + 1}T14:00`,
    }));
    
    adminService.getDenuncias.mockResolvedValue(muchasDenuncias);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      const listContainer = screen.getByText('Categoria 0').closest('ul');
      expect(listContainer).toHaveClass('overflow-y-auto');
    });
  });

  test('aplica estilos de scroll cuando hay muchos posts', async () => {
    const muchosPosts = Array.from({ length: 10 }, (_, i) => ({
      content: `Post contenido ${i}`,
    }));
    
    adminService.getPosts.mockResolvedValue(muchosPosts);
    
    renderWithRouter(<AdminDashboard />);
    
    await waitFor(() => {
      const listContainer = screen.getByText('Post contenido 0').closest('ul');
      expect(listContainer).toHaveClass('overflow-y-auto');
    });
  });
});
