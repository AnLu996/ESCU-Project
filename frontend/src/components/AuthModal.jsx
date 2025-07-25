import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from "../context/AuthContext";

function AuthModal({ mostrarModal, setMostrarModal }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const mostrarMensaje = (mensaje, tipo = 'success') => {
    setMensaje(mensaje);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      if (modoRegistro) {
        if (contrasena !== confirmarContrasena) {
          return setError('Las contraseñas no coinciden.');
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(contrasena)) {
          return setError('Contraseña insegura. Usa mayúsculas, minúsculas y números.');
        }

        const result = await authService.register({ 
          username: usuario, 
          password: contrasena 
        });
        
        if (result.error) {
          mostrarMensaje(result.error, 'error');
        } else {
          mostrarMensaje('Registro exitoso. Por favor inicia sesión.', 'success');
          setModoRegistro(false);
          setUsuario('');
          setContrasena('');
          setConfirmarContrasena('');
        }
      } else {
        if (!usuario || !contrasena) {
          return setError('Usuario y contraseña son requeridos');
        }

        const result = await authService.login({ 
          username: usuario, 
          password: contrasena 
        });
        
        if (result.error) {
          mostrarMensaje(result.error, 'error');
        } else {
          login(result.token, result.user);
          mostrarMensaje('Inicio de sesión exitoso', 'success');
          
          setTimeout(() => {
            setMostrarModal(false);
            navigate('/');
            window.location.reload();
          }, 1000);
        }
      }
    } catch (err) {
      mostrarMensaje('Error de conexión con el servidor', 'error');
      console.error(err);
    }
  };

  return (
    mostrarModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.65)] backdrop-blur-sm">
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => {
              setMostrarModal(false);
              setUsuario('');
              setContrasena('');
              setConfirmarContrasena('');
              setError('');
            }} 
            className="text-white text-2xl font-bold hover:text-gray-300 transition"
          >
            ×
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col md:flex-row">
          <div className="flex-1 p-10">
            <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
              {modoRegistro ? 'Regístrate' : 'Iniciar Sesión'}
            </h1>
            <h3 className="text-sm text-center text-blue-400 mb-6">
              {modoRegistro ? 'Crea una cuenta para comenzar tu viaje emocional 💫' : 'Conéctate para expresarte libremente 😊'}
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Nombre de usuario</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Tu nombre de usuario"
                  className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Contraseña</label>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              {modoRegistro && (
                <div>
                  <label className="block text-sm font-semibold text-blue-800">Confirmar Contraseña</label>
                  <input
                    type="password"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              )}
              {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={!usuario || !contrasena || (modoRegistro && !confirmarContrasena)}
              >
                {modoRegistro ? 'Registrarme' : 'Entrar'}
              </button>
            </form>
          </div>

          <div className="hidden md:flex flex-col justify-center items-center bg-blue-100/70 backdrop-blur-sm p-10 w-2/5 text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              {modoRegistro ? '¿Ya tienes una cuenta?' : '¿No estás registrado?'}
            </h2>
            <h3 className="text-sm text-blue-600 mb-4">
              {modoRegistro ? 'Vuelve a iniciar sesión 💙' : 'Estamos aquí para escucharte siempre 💙'}
            </h3>
            <button
              onClick={() => {
                setModoRegistro(!modoRegistro);
                setError('');
                setUsuario('');
                setContrasena('');
                setConfirmarContrasena('');
              }}
              className="bg-white border border-blue-500 text-blue-600 px-5 py-2 rounded hover:bg-blue-50 transition"
            >
              {modoRegistro ? 'Iniciar sesión' : 'Registrarme'}
            </button>
          </div>
        </div>

        {mensaje && (
          <div className={`fixed bottom-4 left-4 px-4 py-2 rounded shadow-md z-50 ${
            tipoMensaje === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {mensaje}
          </div>
        )}
      </div>
    )
  );
}

export default AuthModal;