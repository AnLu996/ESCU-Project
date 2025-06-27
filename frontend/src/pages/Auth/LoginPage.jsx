import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await API.post('/login', { email, password });
      console.log(response.data);
    } catch (err) {
      console.error('Error al iniciar sesión:', err.response?.data || err.message);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff8dc' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Inicia sesión</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" placeholder="Nombre de usuario" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Contraseña" />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">Entrar</button>
          </div>
    
          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-decoration-none">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
