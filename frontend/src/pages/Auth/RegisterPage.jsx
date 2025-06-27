import React from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff8dc' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Crea tu cuenta</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" placeholder="Nombre de usuario" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Contraseña" />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma tu contraseña" />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">Registrarse</button>
          </div>

          <p className="mt-3 text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/sign-in" className="text-decoration-none">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
