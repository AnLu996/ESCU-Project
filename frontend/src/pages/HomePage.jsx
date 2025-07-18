import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import MiniChatBot from '../components/MiniChatBot';

function MuroPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Lista de publicaciones
const posts = [
  {
    id: 1,
    usuario: 'Juan Pérez',
    content: 'Hoy me siento triste 😞',
    fecha: '2025-07-13T14:00:00',
  },
  {
    id: 2,
    usuario: 'Ana Torres',
    content: 'Recuerda que eres fuerte 💪',
    fecha: '2025-07-14T08:30:00',
  },
  {
    id: 3,
    usuario: 'Carlos Ruiz',
    content: '¿Alguien necesita hablar?',
    fecha: '2025-07-14T10:15:00',
  },
];

const postsOrdenados = posts
  .slice()
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

function formatearFecha(fechaISO) {
  const opciones = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(fechaISO).toLocaleString('es-PE', opciones);
}


  // Reacciones disponibles
  const reaccionesDisponibles = ['👍', '❤️', '😢', '😂', '😡'];

  // Estado de reacciones por post
  const [reacciones, setReacciones] = useState({});

  useEffect(() => {
    async function verificarSesion() {
      const resultado = await new Promise((res) =>
        setTimeout(() => res({ isLoggedIn: false }), 1000)
      );
      setIsLoggedIn(resultado.isLoggedIn);
    }

    verificarSesion();
  }, []);

  // Manejar click de reacción
  const manejarReaccion = (postId, reaccion) => {
    setReacciones((prev) => ({
      ...prev,
      [postId]: reaccion,
    }));
  };

  return (
    <div className="min-h-screen bg-[#e9f6ff]">
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => setMostrarModal(true)} />

      <main className="max-w-5xl mx-auto mt-10 space-y-6 px-4">
        {postsOrdenados.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">{post.usuario}</span>
              <span>{formatearFecha(post.fecha)}</span>
            </div>

            <p className="text-gray-700 text-lg mb-2">{post.content}</p>

            <div className="flex space-x-2 mt-2">
              {reaccionesDisponibles.map((icono, index) => (
                <button
                  key={index}
                  onClick={() => manejarReaccion(post.id, icono)}
                  className={`text-xl hover:scale-125 transition-transform duration-200 ${
                    reacciones[post.id] === icono ? 'ring-2 ring-blue-400 rounded-full' : ''
                  }`}
                >
                  {icono}
                </button>
              ))}
            </div>

            {reacciones[post.id] && (
              <p className="mt-2 text-sm text-gray-500">
                Tu reacción: <span className="text-xl">{reacciones[post.id]}</span>
              </p>
            )}
          </div>
        ))}
      </main>


      {/* Modal de iniciar sesión */}
      <AuthModal
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        setIsLoggedIn={setIsLoggedIn}
      />
      <MiniChatBot isLoggedIn={isLoggedIn} />
    </div>
  );
}
export default MuroPage;
