import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { denunciaService, muroService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [activeTab, setActiveTab] = useState('publicaciones');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener publicaciones del usuario
        const postsResponse = await muroService.getMisPublicaciones();
        if (postsResponse.success && Array.isArray(postsResponse.data)) {
          setPublicaciones(postsResponse.data);
        } else {
          setPublicaciones([]);
        }

        // Obtener denuncias del usuario
        const denunciasResponse = await denunciaService.getDenunciasByUser();
        console.log('Datos de denuncias recibidos:', denunciasResponse); // Para depuración
        
        if (denunciasResponse.success && Array.isArray(denunciasResponse.data)) {
          // Aseguramos que las fechas sean válidas antes de guardarlas
          const denunciasConFechasValidas = denunciasResponse.data.map(denuncia => ({
            ...denuncia,
            fechaValida: denuncia.fechaHora || denuncia.fecha || denuncia.createdAt
          }));
          setDenuncias(denunciasConFechasValidas);
        } else {
          setDenuncias([]);
        }

      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Función para formatear fecha de manera segura
  const formatDate = (isoString) => {
    if (!isoString) return 'Fecha no disponible';
    
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      
      return date.toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', '');
    } catch {
      return 'Fecha inválida';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso no autorizado</h2>
            <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tu perfil</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
              onClick={() => navigate('/')}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{user?.username || 'Usuario'}</h1>
                <p className="text-gray-600 mb-4">{user?.email || ''}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-600">Publicaciones</p>
                    <p className="text-lg font-semibold text-blue-600">{publicaciones.length}</p>
                  </div>
                  
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-600">Denuncias</p>
                    <p className="text-lg font-semibold text-blue-600">{denuncias.length}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Pestañas de contenido */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('publicaciones')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'publicaciones' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Mis Publicaciones
              </button>
              <button
                onClick={() => setActiveTab('denuncias')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'denuncias' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Mis Denuncias
              </button>
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'publicaciones' ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mis Publicaciones</h2>
                {publicaciones.length === 0 ? (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-gray-600">No has realizado ninguna publicación</p>
                    <button 
                      onClick={() => navigate('/')}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Ir al muro
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publicaciones.map((publicacion) => (
                      <div key={publicacion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-800">{publicacion.contenido}</p>
                          <span className="text-sm text-gray-500">
                            {formatDate(publicacion.fecha_creacion)}
                          </span>
                        </div>
                        {publicacion.anonimo && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-2">
                            Publicación anónima
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mis Denuncias</h2>
                {denuncias.length === 0 ? (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-gray-600">No has realizado ninguna denuncia</p>
                    <button 
                      onClick={() => navigate('/denuncia')}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Realizar denuncia
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {denuncias.map((denuncia) => (
                          <tr key={denuncia.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {denuncia.categoria 
                                ? denuncia.categoria.charAt(0).toUpperCase() + denuncia.categoria.slice(1).toLowerCase()
                                : 'Sin categoría'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(denuncia.fecha_hecho)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                denuncia.estado === 'resuelta' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {denuncia.estado || 'En revisión'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;