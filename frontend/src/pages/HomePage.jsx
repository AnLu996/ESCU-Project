import { useEffect, useState } from 'react';
import Header from '../components/Header';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const posts = [
    { id: 1, content: 'Hoy me siento triste 😞' },
    { id: 2, content: 'Recuerda que eres fuerte 💪' },
    { id: 3, content: '¿Alguien necesita hablar?' },
  ];

  useEffect(() => {
    async function verificarSesion() {
      const resultado = await new Promise((res) =>
        setTimeout(() => res({ isLoggedIn: false }), 1000)
      );
      setIsLoggedIn(resultado.isLoggedIn);
    }

    verificarSesion();
  }, []);

  return (
    <div className="min-h-screen bg-[#e9f6ff]">
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => setMostrarModal(true)} />

      <main className="max-w-2xl mx-auto mt-10 space-y-6 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <p className="text-gray-700 text-lg">{post.content}</p>
          </div>
        ))}
      </main>

      {/* Modal de iniciar sesión */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setMostrarModal(false);
              }}
            >
              <input
                type="text"
                placeholder="Usuario"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="text-red-500 hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
