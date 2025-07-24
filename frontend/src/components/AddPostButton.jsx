import React from "react";

function AddPostButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-700 transition z-50"
      aria-label="Agregar publicación"
      title="Agregar publicación"
    >
      <span className="text-2xl font-bold">+</span>
    </button>
  );
}
export default AddPostButton;