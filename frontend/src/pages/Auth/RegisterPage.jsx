import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const result = await authService.register({ email, password });
    if (result.success) {
      alert('Registro exitoso');
      navigate('/login');
    } else {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff8dc' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Crea tu cuenta</h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">Registrarse</button>
          </div>

          <p className="mt-3 text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-decoration-none">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
