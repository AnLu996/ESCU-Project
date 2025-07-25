import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

function CreatePostModal({ onClose, onCreate }) {
  const [contenido, setContenido] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const { token } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contenido.trim()) {
      onCreate({ contenido, anonimo });
      setContenido("");
      onClose();
    }
  };

  if (!token) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Crear publicación</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded p-2 mb-4 resize-none"
            rows={5}
            placeholder="¿En qué estás pensando?"
            value={contenido}
            onChange={e => setContenido(e.target.value)}
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={anonimo}
              onChange={e => setAnonimo(e.target.checked)}
              id="anonimo"
            />
            <label htmlFor="anonimo" className="ml-2 text-sm">Publicar como anónimo</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
}

CreatePostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreatePostModal;