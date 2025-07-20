import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniChatBot() {
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState(() => {
    const guardada = localStorage.getItem('chatConversacion');
    return guardada ? JSON.parse(guardada) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    localStorage.setItem('chatConversacion', JSON.stringify(conversacion));
  }, [conversacion]);

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
        texto: 'Hola 👋 ¿Cómo te sientes hoy?',
        fecha: new Date().toISOString(),
      };
      setConversacion((prev) => [...prev, respuestaBot]);
    }, 800);
  };

  const irAlChatCompleto = () => {
    navigate('/chatbot');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 transition z-50"
        aria-label="Abrir chat"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-50 flex flex-col h-[400px] overflow-hidden">
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold text-sm">MentalBot</span>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">&times;</button>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {conversacion.length === 0 && (
              <div className="text-center text-gray-400 mt-10">¡Hola! ¿En qué puedo ayudarte?</div>
            )}
            {conversacion.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.remitente === 'usuario' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-xl shadow text-sm ${
                    msg.remitente === 'usuario' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  {msg.texto}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t px-3 py-2 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                placeholder="Mensaje..."
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-xl text-sm focus:outline-none"
              />
              <button
                onClick={enviarMensaje}
                className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded-xl hover:bg-blue-600 transition"
              >
                ➤
              </button>
            </div>

            <button
              onClick={irAlChatCompleto}
              className="text-blue-500 text-sm underline hover:text-blue-700 self-center"
            >
              Expandir chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MiniChatBot;
