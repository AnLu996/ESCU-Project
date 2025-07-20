import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

function ChatBotPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState(() => {
    // Cargar conversación desde localStorage
    const almacenado = localStorage.getItem('chat_conversacion');
    return almacenado ? JSON.parse(almacenado) : [];
  });
  const [reacciones, setReacciones] = useState(() => {
    const almacenado = localStorage.getItem('chat_reacciones');
    return almacenado ? JSON.parse(almacenado) : {};
  });
  const chatRef = useRef(null);

  const reaccionesDisponibles = ['👍', '❤️', '😂', '😢', '😡'];

  useEffect(() => {
    async function verificarSesion() {
      const resultado = await new Promise((res) =>
        setTimeout(() => res({ isLoggedIn: true }), 500)
      );
      setIsLoggedIn(resultado.isLoggedIn);
    }

    verificarSesion();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversacion]);

  // Guardar conversación y reacciones cada vez que cambian
  useEffect(() => {
    localStorage.setItem('chat_conversacion', JSON.stringify(conversacion));
  }, [conversacion]);

  useEffect(() => {
    localStorage.setItem('chat_reacciones', JSON.stringify(reacciones));
  }, [reacciones]);

  const enviarMensaje = () => {
    if (mensaje.trim() === '') return;

    const nuevoMensajeUsuario = {
      id: Date.now(),
      remitente: 'usuario',
      texto: mensaje,
      fecha: new Date().toISOString(),
    };

    setConversacion((prev) => [...prev, nuevoMensajeUsuario]);
    setMensaje('');

    setTimeout(() => {
      const respuestaBot = {
        id: Date.now() + 1,
        remitente: 'bot',
        texto: 'Gracias por tu mensaje. ¿Cómo te sientes hoy?',
        fecha: new Date().toISOString(),
      };
      setConversacion((prev) => [...prev, respuestaBot]);
    }, 1000);
  };

    useEffect(() => {
    const conversacionesGuardadas = localStorage.getItem('conversacion');
    if (conversacionesGuardadas) {
        setConversacion(JSON.parse(conversacionesGuardadas));
    }
    }, []);


  const manejarReaccion = (mensajeId, reaccion) => {
    setReacciones((prev) => ({
      ...prev,
      [mensajeId]: reaccion,
    }));
  };

  const formatearFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#e9f6ff] flex flex-col">
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => setMostrarModal(true)} />

      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl flex flex-col h-[600px]">
          {/* Chat window */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversacion.length === 0 && (
              <div className="text-center text-gray-400 mt-40 text-sm">
                Aún no hay mensajes. ¡Empieza la conversación!
              </div>
            )}
            {conversacion.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.remitente === 'usuario' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow ${
                    msg.remitente === 'usuario'
                      ? 'bg-blue-100 text-right'
                      : 'bg-gray-100 text-left'
                  }`}
                >
                  <p>{msg.texto}</p>
                </div>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {msg.remitente === 'usuario' ? 'Tú' : 'MentalBot'} •{' '}
                  {formatearFecha(msg.fecha)}
                </span>

                {msg.remitente === 'bot' && (
                  <div className="flex space-x-1 mt-1">
                    {reaccionesDisponibles.map((icono, index) => (
                      <button
                        key={index}
                        onClick={() => manejarReaccion(msg.id, icono)}
                        className={`text-[18px] hover:scale-110 transition-transform duration-150 ${
                          reacciones[msg.id] === icono
                            ? 'ring-1 ring-blue-400 rounded-full'
                            : ''
                        }`}
                      >
                        {icono}
                      </button>
                    ))}
                  </div>
                )}

                {reacciones[msg.id] && msg.remitente === 'bot' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tu reacción:{' '}
                    <span className="text-base">{reacciones[msg.id]}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t px-4 py-3 flex items-center space-x-2">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={enviarMensaje}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>

      <AuthModal
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default ChatBotPage;
