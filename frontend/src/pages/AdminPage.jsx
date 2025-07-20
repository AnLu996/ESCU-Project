import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { adminService } from '../services/api'; // Suponiendo que tienes funciones como getDenuncias, getPosts, etc.

function AdminDashboard() {
  const navigate = useNavigate();
  const [denuncias, setDenuncias] = useState([]);
  const [posts, setPosts] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      const denunciasData = await adminService.getAllDenuncias();
      const postsData = await adminService.getAllPosts();
      setDenuncias(denunciasData || []);
      setPosts(postsData || []);
    };
    fetchData();
  }, []);

  
  return (
    <div className="min-h-screen bg-[#f7f9fb] relative">
      <Header />

      <main className="max-w-5xl mx-auto mt-10 px-6">
        <button
          onClick={() => navigate('/')}
          className="absolute left-20 bg-gray-200 text-blue-700 font-medium px-4 py-2 rounded hover:bg-gray-300 transition z-10"
        >
          ← Volver al inicio
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Panel de Administración
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección de Denuncias */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Denuncias Recientes</h3>
            {denuncias.length === 0 ? (
              <p className="text-gray-500">No hay denuncias registradas.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {denuncias.map((d, i) => (
                  <li key={i} className="border p-3 rounded-lg">
                    <p className="font-medium">{d.categoria}</p>
                    <p className="text-sm text-gray-600 truncate">{d.descripcion}</p>
                    <p className="text-xs text-gray-400">{d.fechaHora}</p>
                    <button className="mt-2 text-blue-500 text-sm hover:underline">
                      Ver detalles
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sección de Posts */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Posts del Muro</h3>
            {posts.length === 0 ? (
              <p className="text-gray-500">No hay publicaciones.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {posts.map((p, i) => (
                  <li key={i} className="border p-3 rounded-lg">
                    <p>{p.content}</p>
                    <button className="mt-2 text-red-500 text-sm hover:underline">
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Acciones adicionales */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Acciones rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Exportar Reportes
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Crear Anuncio
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Limpiar Posts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;