import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ onLoginClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-900 text-white py-6 shadow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-7">
            <h1 className="text-3xl font-bold">ESCÚ!</h1>
            <h6 className="text-lg mt-1">Un lugar seguro para lo que sientes.</h6>
          </div>

          <div className="col-span-5 flex justify-end items-center space-x-4">
            {isAuthenticated && location.pathname !== '/denuncia' && (
              <button
                onClick={() => navigate('/denuncia')}
                className="bg-red-600 text-white px-5 py-2 text-lg rounded-lg hover:bg-red-700 transition"
              >
                ¡Denuncia ya!
              </button>
            )}
            
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <span className="font-medium">{user?.username || 'Usuario'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/perfil');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mi perfil
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-white text-blue-900 px-5 py-2 text-lg rounded-lg hover:bg-gray-100 transition"
                onClick={onLoginClick}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;