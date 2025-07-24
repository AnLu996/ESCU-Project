import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor para añadir token automáticamente
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Autenticación
// ─────────────────────────────────────────────
export const authService = {

  login: async (credentials) => {
    try {
      const res = await API.post('/auth/login', credentials);
      const data = res.data;
      if (res.status === 200 && data.token) {
        localStorage.setItem('token', data.token);
        return { success: true, data };
      }
      return { success: false, data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error de autenticación'
      };
    }
  },

  register: async (credentials) => {
    try {
      const res = await API.post('/auth/register', credentials);
      return {
        success: true,
        data: res.data
      };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error al registrar usuario'
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => localStorage.getItem('token')
};

// ─────────────────────────────────────────────
// Denuncias
// ─────────────────────────────────────────────
export const denunciaService = {
  createDenuncia: async (formData) => {
    try {
      const res = await API.post('/denuncias/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error al enviar denuncia'
      };
    }
  },

  getDenunciasByUser: async () => {
    try {
      const res = await API.get('/denuncias/mis-denuncias');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error al obtener denuncias'
      };
    }
  }
};

// ─────────────────────────────────────────────
// Muro / Publicaciones
// ─────────────────────────────────────────────
export const muroService = {
  createPublicacion: async (contenido, anonimo = false) => {
      if (!contenido || contenido.trim() === "") {
        return {
          success: false,
          data: "El contenido no puede estar vacío"
        };
      }
      try {
        const res = await API.post('/muro/', { contenido: contenido.trim(), anonimo });
        // El backend devuelve la publicación completa: id, contenido, fecha_creacion, reacciones, anonimo
        return { success: true, data: res.data };
      } catch (err) {
        return {
          success: false,
          data: err.response?.data?.error || 'Error al crear publicación'
        };
      }
    },

  getPublicaciones: async () => {
    try {
      const res = await API.get('/muro/');
      return res.data;
    } catch (err) {
      console.error('Error al obtener publicaciones:', err);
      return [];
    }
  },

  getMisPublicaciones: async () => {
    try {
      const res = await API.get('/muro/mis-publicaciones');
      return res.data;
    } catch (err) {
      console.error('Error al obtener mis publicaciones:', err);
      return [];
    }
  },

  editPublicacion: async (id, nuevoContenido) => {
    if (!nuevoContenido || nuevoContenido.trim() === "") {
      return {
        success: false,
        data: "El contenido no puede estar vacío"
      };
    }
    try {
      const res = await API.patch(`/muro/${id}`, { contenido: nuevoContenido.trim() });
      // Mensaje de éxito: "Publicación editada correctamente"
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error al editar publicación'
      };
    }
  },

  deletePublicacion: async (id) => {
    try {
      const res = await API.delete(`/muro/${id}`);
      // Mensaje de éxito: "Publicación eliminada correctamente"
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data?.error || 'Error al eliminar publicación'
      };
    }
  },

  reaccionar: async (id, tipo) => {
    try {
      const res = await API.post(`/muro/${id}/reaccionar`, { reaccion: tipo });
      return res.data;
    } catch (err) {
      console.error('Error al reaccionar:', err);
      return null;
    }
  },

  deleteReaccion: async (id, tipo) => {
    try {
      const res = await API.delete(`/muro/${id}/reaccionar`, {
        data: { reaccion: tipo }
      });
      return res.data;
    } catch (err) {
      console.error('Error al eliminar la reacción:', err);
      return null;
    }
  }
};

// ─────────────────────────────────────────────
// Admin (para usuarios con rol admin en el JWT)
// ─────────────────────────────────────────────
export const adminService = {
  getAllDenuncias: async () => {
    try {
      const res = await API.get('/denuncias/');
      return res.data;
    } catch (err) {
      console.error('Error al obtener todas las denuncias:', err);
      return [];
    }
  },

  getAllPosts: async () => {
    try {
      const res = await API.get('/muro');
      return res.data;
    } catch (err) {
      console.error('Error al obtener todas las publicaciones:', err);
      return [];
    }
  },

  getMisPosts: async () => {
    try {
      const res = await API.get('/muro/mis-publicaciones');
      return res.data;
    } catch (err) {
      console.error('Error al obtener mis publicaciones:', err);
      return [];
    }
  }
};

export default API;
