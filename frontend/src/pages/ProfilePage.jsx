import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { denunciaService } from '../services/api';
import { adminService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [username, setUsername] = useState('Usuario');
  const [publicaciones, setPublicaciones] = useState(0);
  const [historialPublicaciones, setHistorialPublicaciones] = useState([]);
  const [historialDenuncias, setHistorialDenuncias] = useState([]);

  useEffect(() => {
    // Si no hay sesión, redirige al inicio
    if (!token) {
      navigate('/');
      return;
    }

    const fetchDatos = async () => {
      // Usa alias del usuario si lo tienes en el contexto
      setUsername(user?.alias || user?.username || 'Usuario');

      // Obtener publicaciones del usuario
      const posts = await adminService.getMisPosts?.();
      if (posts && posts.length >= 0) {
        setHistorialPublicaciones(
          posts.map((p) => ({
            id: p.id,
            content: p.contenido,
          }))
        );
        setPublicaciones(posts.length);
      }

      // Obtener denuncias del usuario
      const denunciasRes = await denunciaService.getDenunciasByUser();
      if (denunciasRes.success) {
        setHistorialDenuncias(
          denunciasRes.data.map((d) => ({
            id: d.id,
            motivo: d.categoria || 'Sin categoría',
            fecha: new Date(d.fechaHora || d.fecha || '').toLocaleDateString('es-PE'),
          }))
        );
      }
    };

    fetchDatos();
  }, [token, user, navigate]);

  const handleLogout = () => {
    logout(); // Usa el contexto para cerrar sesión y limpiar el token
    navigate('/');
  };

  // Si no hay token, muestra mensaje de login requerido
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e9f6ff]">
        <Header />
        <div className="max-w-md mx-auto text-center mt-20">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Debes iniciar sesión para ver tu perfil</h2>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/')}
          >
            Ir a inicio
          </button>
        </div>
      </div>
    );
  }

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
            {historialPublicaciones.length === 0 ? (
              <p className="text-gray-500">No tienes publicaciones registradas.</p>
            ) : (
              historialPublicaciones.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-300 rounded h-8 flex items-center px-4 text-gray-600"
                >
                  {post.content}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Historial de Denuncias */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Historial de Denuncias</h2>
          <div className="space-y-3">
            {historialDenuncias.length === 0 ? (
              <p className="text-gray-500">No has realizado ninguna denuncia.</p>
            ) : (
              historialDenuncias.map((denuncia) => (
                <div
                  key={denuncia.id}
                  className="bg-gray-300 rounded h-8 flex items-center px-4 text-gray-600"
                >
                  <span className="font-bold">{denuncia.motivo}</span>
                  <span className="ml-4 text-sm">{denuncia.fecha}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;