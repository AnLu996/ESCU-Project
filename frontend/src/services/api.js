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

// Función para verificar rol de admin
const checkAdminRole = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return false;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.rol === 'admin';
  } catch (e) {
    console.error('Error decoding token:', e);
    return false;
  }
};

// ─────────────────────────────────────────────
// Servicio de Autenticación
// ─────────────────────────────────────────────
export const authService = {
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      
      if (response.data.error) {
        return { error: response.data.error };
      }

      if (!response.data.token) {
        return { error: 'No se recibió token en la respuesta' };
      }

      return { 
        token: response.data.token,
        user: {
          username: response.data.user?.alias || response.data.user?.username,
          email: response.data.user?.email,
          rol: response.data.user?.rol
        }
      };
      
    } catch (error) {
      console.error('Error en login:', error);
      if (error.response) {
        if (error.response.status === 400) {
          return { error: 'Usuario y contraseña son requeridos' };
        }
        if (error.response.status === 401) {
          return { error: error.response.data?.error || 'Credenciales inválidas' };
        }
      }
      return { error: 'Error de conexión con el servidor' };
    }
  },

  register: async (userData) => {
    try {
      const res = await API.post('/auth/register', userData);
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
    sessionStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return {
        username: payload.identity,
        rol: payload.rol
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
};

// ─────────────────────────────────────────────
// Servicio de Denuncias
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
        error: err.response?.data?.error || 'Error al enviar denuncia'
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
        error: err.response?.data?.error || 'Error al obtener denuncias'
      };
    }
  },

  getAllDenuncias: async () => {
    if (!checkAdminRole()) {
      return { success: false, error: 'No tienes permisos de administrador' };
    }

    try {
      const res = await API.get('/denuncias/');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener denuncias'
      };
    }
  }
};

// ─────────────────────────────────────────────
// Servicio de Publicaciones (Muro)
// ─────────────────────────────────────────────
export const muroService = {
  createPublicacion: async (contenido, anonimo = false) => {
    if (!contenido || contenido.trim() === "") {
      return {
        success: false,
        error: "El contenido no puede estar vacío"
      };
    }

    try {
      const res = await API.post('/muro/', { 
        contenido: contenido.trim(), 
        anonimo 
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al crear publicación'
      };
    }
  },

  getPublicaciones: async () => {
    try {
      const res = await API.get('/muro/');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener publicaciones'
      };
    }
  },

  getMisPublicaciones: async () => {
    try {
      const res = await API.get('/muro/mis-publicaciones');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener publicaciones'
      };
    }
  },

  editPublicacion: async (id, nuevoContenido) => {
    if (!nuevoContenido || nuevoContenido.trim() === "") {
      return {
        success: false,
        error: "El contenido no puede estar vacío"
      };
    }

    try {
      const res = await API.patch(`/muro/${id}`, { 
        contenido: nuevoContenido.trim() 
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al editar publicación'
      };
    }
  },

  deletePublicacion: async (id) => {
    try {
      const res = await API.delete(`/muro/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al eliminar publicación'
      };
    }
  },

  reaccionar: async (id, tipo) => {
    try {
      const res = await API.post(`/muro/${id}/reaccionar`, { reaccion: tipo });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al reaccionar'
      };
    }
  },

  deleteReaccion: async (id, tipo) => {
    try {
      const res = await API.delete(`/muro/${id}/reaccionar`, {
        data: { reaccion: tipo }
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al eliminar reacción'
      };
    }
  }
};

// ─────────────────────────────────────────────
// Servicio de Administración
// ─────────────────────────────────────────────
export const adminService = {
  getAllDenuncias: async () => {
    if (!checkAdminRole()) {
      return { success: false, error: 'No tienes permisos de administrador' };
    }

    try {
      const res = await API.get('/denuncias/');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener denuncias'
      };
    }
  },

  getAllPosts: async () => {
    if (!checkAdminRole()) {
      return { success: false, error: 'No tienes permisos de administrador' };
    }

    try {
      const res = await API.get('/muro');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener publicaciones'
      };
    }
  },

  getMisPosts: async () => {
    try {
      const res = await API.get('/muro/mis-publicaciones');
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Error al obtener publicaciones'
      };
    }
  }
};

// ─────────────────────────────────────────────
// Servicio de Chatbot
// ─────────────────────────────────────────────
export const chatbotService = {
  sendMessage: async (message) => {
    if (!message || message.trim() === "") {
      return {
        success: false,
        error: "El mensaje no puede estar vacío"
      };
    }

    try {
      const res = await API.post('/chatbot', { 
        mensaje: message.trim()
      });
      return { 
        success: true, 
        data: {
          respuesta: res.data.respuesta
        } 
      };
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          return { 
            success: false, 
            error: err.response.data?.error || 'Formato de solicitud inválido' 
          };
        }
        if (err.response.status === 401) {
          return { 
            success: false, 
            error: 'No autorizado. Por favor inicia sesión.' 
          };
        }
      }
      return {
        success: false,
        error: err.response?.data?.error || 'Error al comunicarse con el chatbot'
      };
    }
  }
};



export default API;