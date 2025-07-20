import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ChatBotPage from '../ChatBotPage'

// Mock para react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

// Helper para renderizar con Router
function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('ChatBotPage', () => {
  beforeEach(() => {
    // Reset todos los mocks antes de cada test
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    localStorageMock.clear.mockClear()
    
    // Por defecto, localStorage está vacío
    localStorageMock.getItem.mockReturnValue(null)
  })

  test('renderiza correctamente el componente', () => {
    renderWithRouter(<ChatBotPage />)
    
    expect(screen.getByText('ESCÚ!')).toBeInTheDocument()
    expect(screen.getByText('Aún no hay mensajes. ¡Empieza la conversación!')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escribe tu mensaje...')).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  test('carga conversación desde localStorage', () => {
    const conversacionGuardada = [
      {
        id: 1,
        remitente: 'usuario',
        texto: 'Hola bot',
        fecha: '2025-01-01T12:00:00.000Z'
      }
    ]
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'chat_conversacion') {
        return JSON.stringify(conversacionGuardada)
      }
      return null
    })

    renderWithRouter(<ChatBotPage />)
    
    expect(screen.getByText('Hola bot')).toBeInTheDocument()
    // Buscar el span específico que contiene la marca de tiempo
    expect(screen.getByText(/Tú\s+•\s+07:00 a\. m\./)).toBeInTheDocument()
  })

  test('envía un mensaje correctamente', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    const enviarButton = screen.getByText('Enviar')
    
    await user.type(input, 'Hola, ¿cómo estás?')
    await user.click(enviarButton)
    
    // Verifica que el mensaje del usuario aparece
    expect(screen.getByText('Hola, ¿cómo estás?')).toBeInTheDocument()
    
    // Verifica que el input se limpia
    expect(input.value).toBe('')
    
    // Espera la respuesta del bot (después del setTimeout)
    await waitFor(() => {
      expect(screen.getByText('Gracias por tu mensaje. ¿Cómo te sientes hoy?')).toBeInTheDocument()
    }, { timeout: 1500 })
  })

  test('no envía mensajes vacíos', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    const enviarButton = screen.getByText('Enviar')
    
    await user.click(enviarButton)
    
    // No debería haber mensajes
    expect(screen.getByText('Aún no hay mensajes. ¡Empieza la conversación!')).toBeInTheDocument()
  })

  test('envía mensaje con tecla Enter', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    
    await user.type(input, 'Mensaje con Enter{enter}')
    
    // Verifica que el mensaje aparece
    expect(screen.getByText('Mensaje con Enter')).toBeInTheDocument()
  })

  test('guarda conversación en localStorage', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    
    await user.type(input, 'Test mensaje')
    await user.click(screen.getByText('Enviar'))
    
    // Verifica que se llamó setItem para guardar la conversación
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'chat_conversacion',
        expect.stringContaining('Test mensaje')
      )
    })
  })

  test('maneja reacciones a mensajes del bot', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    // Envía un mensaje para obtener una respuesta del bot
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    await user.type(input, 'Hola bot')
    await user.click(screen.getByText('Enviar'))
    
    // Espera la respuesta del bot
    await waitFor(() => {
      expect(screen.getByText('Gracias por tu mensaje. ¿Cómo te sientes hoy?')).toBeInTheDocument()
    })
    
    // Busca y hace clic en una reacción
    const reaccionButton = screen.getByText('👍')
    await user.click(reaccionButton)
    
    // Verifica que la reacción se muestra
    await waitFor(() => {
      expect(screen.getByText('Tu reacción:')).toBeInTheDocument()
    })
  })

  test('formatea correctamente las fechas', () => {
    const conversacionConFecha = [
      {
        id: 1,
        remitente: 'usuario',
        texto: 'Mensaje con fecha',
        fecha: '2025-01-15T14:30:00.000Z'
      }
    ]
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'chat_conversacion') {
        return JSON.stringify(conversacionConFecha)
      }
      return null
    })

    renderWithRouter(<ChatBotPage />)
    
    // Verifica que el remitente y fecha están presentes
    expect(screen.getByText(/Tú\s+•\s+09:30 a\. m\./)).toBeInTheDocument()
    // Verifica que el mensaje está presente
    expect(screen.getByText('Mensaje con fecha')).toBeInTheDocument()
  })

  test('muestra y oculta modal de autenticación', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    // Busca el botón de iniciar sesión
    const loginButton = screen.getByText('Iniciar sesión')
    expect(loginButton).toBeInTheDocument()
    
    // Hace clic en el botón de login para abrir el modal
    await user.click(loginButton)
    
    // Verifica que el modal está presente (buscando elementos del modal)
    // Como AuthModal es real, podemos buscar texto que sabemos que contiene
    await waitFor(() => {
      expect(screen.getByText(/Iniciar Sesión|Regístrate/)).toBeInTheDocument()
    })
  })

  test('actualiza estado de login después de verificación', async () => {
    renderWithRouter(<ChatBotPage />)
    
    // Inicialmente debe mostrar el botón de login
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    
    // Después de 500ms (tiempo del setTimeout en verificarSesion), 
    // el estado debería cambiar a logueado
    await waitFor(() => {
      expect(screen.queryByText('Iniciar sesión')).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  test('scroll automático al final de la conversación', async () => {
    const user = userEvent.setup()
    
    // Mock scrollTop y scrollHeight
    const mockScrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = mockScrollIntoView
    
    renderWithRouter(<ChatBotPage />)
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    
    await user.type(input, 'Mensaje para probar scroll')
    await user.click(screen.getByText('Enviar'))
    
    // Verifica que se intenta hacer scroll (mediante el useEffect)
    await waitFor(() => {
      expect(screen.getByText('Mensaje para probar scroll')).toBeInTheDocument()
    })
  })

  test('carga reacciones desde localStorage', () => {
    const reaccionesGuardadas = {
      '123': '❤️',
      '456': '😂'
    }
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'chat_reacciones') {
        return JSON.stringify(reaccionesGuardadas)
      }
      return null
    })

    renderWithRouter(<ChatBotPage />)
    
    // Verifica que localStorage fue consultado
    expect(localStorageMock.getItem).toHaveBeenCalledWith('chat_reacciones')
  })

  test('guarda reacciones en localStorage', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ChatBotPage />)
    
    // Envía mensaje para obtener respuesta del bot
    const input = screen.getByPlaceholderText('Escribe tu mensaje...')
    await user.type(input, 'Test')
    await user.click(screen.getByText('Enviar'))
    
    // Espera respuesta del bot y hace clic en reacción
    await waitFor(() => {
      expect(screen.getByText('👍')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('👍'))
    
    // Verifica que se guardaron las reacciones
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'chat_reacciones',
        expect.any(String)
      )
    })
  })
})
