import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function PostOptionsModal({ onClose, onEditar, onEliminar }) {
  const modalRef = useRef(null);
  const { token } = useAuth();

  // Focus inicial para accesibilidad
  useEffect(() => {
    modalRef.current?.focus();
    // Cerrar con Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Evitar doble click
  const handleEditar = (e) => {
    e.preventDefault();
    onEditar?.();
    onClose?.();
  };
  const handleEliminar = (e) => {
    e.preventDefault();
    onEliminar?.();
    onClose?.();
  };

  // Solo mostrar modal si hay sesión
  if (!token) return null;

  return (
    <div
      className="absolute top-8 right-4 bg-white border rounded-lg shadow-lg p-2 z-50"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={modalRef}
    >
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
        onClick={handleEditar}
        aria-label="Editar publicación"
      >
        Editar
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 focus:bg-red-100 focus:outline-none"
        onClick={handleEliminar}
        aria-label="Eliminar publicación"
      >
        Eliminar
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 text-sm focus:bg-gray-200 focus:outline-none"
        onClick={onClose}
        aria-label="Cancelar"
      >
        Cancelar
      </button>
    </div>
  );
}

PostOptionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default PostOptionsModal;