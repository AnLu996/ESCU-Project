import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { denunciaService } from '../services/api';

function ReportPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoria: '',
    descripcion: '',
    fechaHora: '',
    lugar: '',
    involucrados: '',
  });

  const [archivoPrueba, setArchivoPrueba] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    setArchivoPrueba(e.target.files[0]);
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!formData.categoria) nuevosErrores.categoria = 'La categoría es obligatoria';
    if (!formData.descripcion) nuevosErrores.descripcion = 'La descripción es obligatoria';
    if (!formData.lugar) nuevosErrores.lugar = 'El lugar es obligatorio';
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const erroresValidacion = validarCampos();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      setIsSubmitting(false);
      const primerError = Object.keys(erroresValidacion)[0];
      document.querySelector(`[name="${primerError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    const datos = new FormData();
    Object.entries(formData).forEach(([key, value]) => datos.append(key, value));
    if (archivoPrueba) datos.append('pruebas', archivoPrueba);

    try {
      const result = await denunciaService.createDenuncia(datos);

      if (result.success) {
        mostrarMensaje('Denuncia registrada exitosamente', 'success');
        // Resetear formulario
        setFormData({
          categoria: '',
          descripcion: '',
          fechaHora: '',
          lugar: '',
          involucrados: '',
        });
        setArchivoPrueba(null);
        setErrores({});
        e.target.reset();
      } else {
        mostrarMensaje(result.message || 'Error al registrar la denuncia', 'error');
      }
    } catch (error) {
      mostrarMensaje('Error en la conexión con el servidor', 'error');
      console.error('Error al enviar denuncia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Formulario de Denuncia</h1>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </button>
          </div>

          {mensaje && (
            <div className={`mb-6 p-4 rounded-lg ${tipoMensaje === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-6">
              {/* Campo Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errores.categoria ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="acoso">Acoso</option>
                  <option value="discriminacion">Discriminación</option>
                  <option value="violencia">Violencia</option>
                  <option value="ciberacoso">Ciberacoso</option>
                </select>
                {errores.categoria && (
                  <p className="mt-1 text-sm text-red-600">{errores.categoria}</p>
                )}
              </div>

              {/* Campo Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errores.descripcion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describa los hechos con el mayor detalle posible..."
                  required
                />
                {errores.descripcion && (
                  <p className="mt-1 text-sm text-red-600">{errores.descripcion}</p>
                )}
              </div>

              {/* Campo Fecha y Hora */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha y Hora (opcional)
                </label>
                <input
                  type="datetime-local"
                  name="fechaHora"
                  value={formData.fechaHora}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Campo Lugar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lugar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errores.lugar ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Aula 201, Patio central"
                  required
                />
                {errores.lugar && (
                  <p className="mt-1 text-sm text-red-600">{errores.lugar}</p>
                )}
              </div>

              {/* Campo Involucrados */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Involucrados (opcional)
                </label>
                <input
                  type="text"
                  name="involucrados"
                  value={formData.involucrados}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombres o descripción de las personas involucradas"
                />
              </div>

              {/* Campo Archivo de Prueba */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo de prueba (opcional)
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Seleccionar archivo
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="sr-only"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {archivoPrueba ? archivoPrueba.name : 'Ningún archivo seleccionado'}
                  </span>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar Denuncia'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ReportPage;