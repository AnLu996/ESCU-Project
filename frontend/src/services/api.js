import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Autenticación
export const authService = {
  login: async (credentials) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
    }
    return { success: res.ok, data };
  },

  register: async (credentials) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json().catch(() => ({}));

      return {
        success: res.ok,
        data: res.ok ? data : (data.error || "Error desconocido"),
      };
    } catch (error) {
      return {
        success: false,
        data: "Error de red o servidor no disponible",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

// Denuncias
export const denunciaService = {
  crearDenuncia: async (formData) => {
    try {
      const res = await API.post('/denuncias/', formData);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data || 'Error al enviar la denuncia',
      };
    }
  },

  obtenerDenuncias: async () => {
    try {
      const res = await API.get('/mis-denuncias');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        data: err.response?.data || 'Error al obtener denuncias',
      };
    }
  }
};


export const adminService = {
  getAllDenuncias: async () => {
    try {
      const res = await API.get('/denuncias');
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

  deletePost: async (id, token) => {
    try {
      const res = await API.delete(`/muro/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.error('Error al eliminar la publicación:', err);
      return null;
    }
  },

  eliminarReaccion: async (id, tipo, token) => {
    try {
      const res = await API.delete(`/muro/${id}/reaccionar`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { reaccion: tipo }
      });
      return res.data;
    } catch (err) {
      console.error('Error al eliminar la reacción:', err);
      return null;
    }
  }
};

export default API;
