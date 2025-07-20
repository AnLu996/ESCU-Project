import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import MiniChatBot from '../components/MiniChatBot';
import { muroService } from '../services/api';
import PostOptionsModal from '../components/PostOptionsModal';

function MuroPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [reacciones, setReacciones] = useState({});
  const [modalPostId, setModalPostId] = useState(null);
  const [editandoPostId, setEditandoPostId] = useState(null);
  const [contenidoEditado, setContenidoEditado] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    cargarPublicaciones();
  }, []);

  async function cargarPublicaciones() {
    const data = await muroService.getPublicaciones();
    setPosts(data);
  }

  const manejarReaccion = async (postId, reaccion) => {
    await muroService.reaccionar(postId, reaccion);
    setReacciones((prev) => ({ ...prev, [postId]: reaccion }));
  };

  const formatearFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEditar = (postId, contenido) => {
    setEditandoPostId(postId);
    setContenidoEditado(contenido);
    setModalPostId(null);
  };

  const handleGuardar = async () => {
    await muroService.editarPublicacion(editandoPostId, contenidoEditado);
    setEditandoPostId(null);
    cargarPublicaciones();
  };

  const handleEliminar = async (postId) => {
    await muroService.eliminarPublicacion(postId);
    setModalPostId(null);
    cargarPublicaciones();
  };

  const reaccionesDisponibles = ['👍', '❤️', '😢', '😂', '😡'];

  return (
    <div className="min-h-screen bg-[#e9f6ff]">
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => setMostrarModal(true)} />

      <main className="max-w-5xl mx-auto mt-10 space-y-6 px-4">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            El muro de publicaciones está vacío. ¡Sé el primero en compartir algo! 📝
          </div>
        ) : (
          posts
            .slice()
            .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
            .map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition relative"
              >
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-700">
                    {post.anonimo ? 'Anónimo' : post.usuario}
                  </span>
                  <span>{formatearFecha(post.fecha_creacion)}</span>
                </div>

                {editandoPostId === post.id ? (
                  <textarea
                    className="w-full border p-2 rounded"
                    value={contenidoEditado}
                    onChange={(e) => setContenidoEditado(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 text-lg mb-2">{post.contenido}</p>
                )}

                {isLoggedIn && (
                  <div className="absolute top-2 right-3">
                    <button
                      onClick={() => setModalPostId(post.id)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ⋮
                    </button>
                  </div>
                )}

                {isLoggedIn && (
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
                )}

                {reacciones[post.id] && (
                  <p className="mt-2 text-sm text-gray-500">
                    Tu reacción: <span className="text-xl">{reacciones[post.id]}</span>
                  </p>
                )}

                {/* Modal por post */}
                {modalPostId === post.id && (
                  <PostOptionsModal
                    onClose={() => setModalPostId(null)}
                    onEditar={() => handleEditar(post.id, post.contenido)}
                    onEliminar={() => handleEliminar(post.id)}
                  />
                )}

                {/* Botones de editar */}
                {editandoPostId === post.id && (
                  <div className="flex justify-end mt-3">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                      onClick={handleGuardar}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      onClick={() => setEditandoPostId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            ))
        )}
      </main>

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
