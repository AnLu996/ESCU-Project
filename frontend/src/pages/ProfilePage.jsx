import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
//import { authService } from '../services/authService';

function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Username');
  const [publicaciones, setPublicaciones] = useState(40); // Simulado
  const [historialPublicaciones, setHistorialPublicaciones] = useState([
    { id: 1, content: 'Hoy me siento triste 😞' },
    { id: 2, content: 'Recuerda que eres fuerte 💪' },
  ]);
  const [historialDenuncias, setHistorialDenuncias] = useState([
    { id: 1, motivo: 'Acoso', fecha: '2025-07-17' },
    { id: 2, motivo: 'Lenguaje ofensivo', fecha: '2025-07-15' },
  ]);

  useEffect(() => {
    // Aquí normalmente cargarías el usuario y sus publicaciones/denuncias desde la API
    // setUsername(apiUser.username)
    // setPublicaciones(apiUser.publicaciones)
    // setHistorialPublicaciones(apiUser.historialPublicaciones)
    // setHistorialDenuncias(apiUser.historialDenuncias)
  }, []);

  const handleLogout = () => {
    //authService.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#e9f6ff]">
      <Header />

      <div className="max-w-3xl mx-auto mt-6 px-4">
        {/* Perfil */}
        <div className="bg-gray-200 rounded-xl flex items-center justify-between px-8 py-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center">
              <span role="img" aria-label="user" className="text-4xl text-white">👤</span>
            </div>
            <span className="text-2xl font-semibold">{username}</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg">{publicaciones} publicaciones</span>
            <button
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Historial de Publicaciones */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Historial de Publicaciones</h2>
          <div className="space-y-3">
            {historialPublicaciones.map((post) => (
              <div
                key={post.id}
                className="bg-gray-300 rounded h-8 flex items-center px-4 text-gray-600"
              >
                {post.content}
              </div>
            ))}
          </div>
        </div>

        {/* Historial de Denuncias */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Historial de Denuncias</h2>
          <div className="space-y-3">
            {historialDenuncias.map((denuncia) => (
              <div
                key={denuncia.id}
                className="bg-gray-300 rounded h-8 flex items-center px-4 text-gray-600"
              >
                <span className="font-bold">{denuncia.motivo}</span>
                <span className="ml-4 text-sm">{denuncia.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;