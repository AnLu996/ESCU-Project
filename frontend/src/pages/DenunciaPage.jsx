import { useState } from 'react';
import Header from '../components/Header';

function ReportPage() {
  const [formData, setFormData] = useState({
    categoria: '',
    descripcion: '',
    fechaHora: '',
    lugar: '',
    involucrados: '',
  });

  const [archivoPrueba, setArchivoPrueba] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setArchivoPrueba(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = new FormData();
    datos.append('categoria', formData.categoria);
    datos.append('descripcion', formData.descripcion);
    datos.append('fechaHora', formData.fechaHora);
    datos.append('lugar', formData.lugar);
    datos.append('involucrados', formData.involucrados);
    if (archivoPrueba) {
      datos.append('pruebas', archivoPrueba);
    }

    try {
      // Aquí va tu lógica para enviar los datos al backend:
      // await fetch('/api/denuncias', { method: 'POST', body: datos });

      console.log('Formulario enviado con archivo:', archivoPrueba);
      alert('Denuncia registrada exitosamente');

      // Limpiar
      setFormData({
        categoria: '',
        descripcion: '',
        fechaHora: '',
        lugar: '',
        involucrados: '',
      });
      setArchivoPrueba(null);
      e.target.reset(); // Resetea el formulario también
    } catch (error) {
      console.error('Error al enviar la denuncia:', error);
      alert('Error al registrar la denuncia');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <main className="max-w-xl mx-auto mt-10 px-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Formulario de Denuncia
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-medium mb-1">Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Ej. Acoso, Robo, Violencia"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Describe lo sucedido..."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Fecha y Hora (opcional)</label>
            <input
              type="datetime-local"
              name="fechaHora"
              value={formData.fechaHora}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Lugar</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Ej. Pasillo B, Biblioteca"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Involucrados (opcional)</label>
            <input
              type="text"
              name="involucrados"
              value={formData.involucrados}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nombres, cargos, etc."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Pruebas (opcional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              accept="image/*,.pdf,.doc,.docx"
            />
            {archivoPrueba && (
              <p className="text-sm text-gray-600 mt-1">Archivo seleccionado: {archivoPrueba.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar Denuncia
          </button>
        </form>
      </main>
    </div>
  );
}

export default ReportPage;
