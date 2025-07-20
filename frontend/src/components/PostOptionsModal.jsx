// components/PostOptionsModal.jsx
function PostOptionsModal({ onClose, onEditar, onEliminar }) {
  return (
    <div className="absolute top-8 right-4 bg-white border rounded-lg shadow-lg p-2 z-50">
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={onEditar}
      >
        Editar
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        onClick={onEliminar}
      >
        Eliminar
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 text-sm"
        onClick={onClose}
      >
        Cancelar
      </button>
    </div>
  );
}

export default PostOptionsModal;
