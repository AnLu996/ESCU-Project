import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/api'; // Asegúrate de tener este archivo implementado

function AuthModal({ mostrarModal, setMostrarModal, setIsLoggedIn }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [alerta, setAlerta] = useState('');
  const [usuarioExiste, setUsuarioExiste] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validarUsuario = async () => {
      if (modoRegistro && usuario.trim().length > 3) {
        const existe = await authService.verificarUsuario(usuario);
        setUsuarioExiste(existe);
      }
    };
    validarUsuario();
  }, [usuario, modoRegistro]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoRegistro) {
      if (usuarioExiste) return setError('Este usuario ya existe.');
      if (contrasena !== confirmarContrasena) return setError('Las contraseñas no coinciden.');
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(contrasena)) {
        return setError('Contraseña insegura. Usa mayúsculas, minúsculas y números.');
      }

      const result = await authService.register({ usuario, password: contrasena });
      if (result.success) {
        alert('¡Bienvenido a ESCÚ!');
        setIsLoggedIn(true);
        setMostrarModal(false);
        navigate('/');
      } else {
        setError('Error al registrarse');
      }
    } else {
      const result = await authService.login({ usuario, password: contrasena });
      if (result.success) {
        setIsLoggedIn(true);
        setMostrarModal(false);
        setAlerta('¡Inicio de sesión exitoso!');
        setTimeout(() => setAlerta(''), 3000);
      } else {
        setError('Credenciales inválidas');
      }
    }
  };

  return (
    mostrarModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.65)] backdrop-blur-sm">
        <div className="absolute top-4 right-4">
          <button onClick={() => setMostrarModal(false)} className="text-white text-2xl font-bold">×</button>
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
                />
                {usuarioExiste && <p className="text-sm text-red-600 mt-1">Este usuario ya está registrado</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Contraseña</label>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                  />
                </div>
              )}
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
              }}
              className="bg-white border border-blue-500 text-blue-600 px-5 py-2 rounded hover:bg-blue-50 transition"
            >
              {modoRegistro ? 'Iniciar sesión' : 'Registrarme'}
            </button>
          </div>
        </div>

        {/* Alerta de login exitoso */}
        {alerta && (
          <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in-down">
            {alerta}
          </div>
        )}
      </div>
    )
  );
}

export default AuthModal;
