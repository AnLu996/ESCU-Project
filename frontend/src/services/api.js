import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Si usas cookies de sesión
});

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
      const res = await API.post('/denuncias', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
      const res = await API.get('/denuncias');
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
  async getDenuncias() {
    // Simula una API temporalmente
    return [
      {
        categoria: 'Acoso',
        descripcion: 'Un incidente en el pasillo B',
        fechaHora: '2025-07-01T14:00',
      },
      {
        categoria: 'Robo',
        descripcion: 'Se reportó robo de laptop en la biblioteca',
        fechaHora: '2025-07-02T09:30',
      },
    ];
  },

  async getPosts() {
    return [
      { content: 'Hoy me siento triste 😞' },
      { content: 'Recuerda que eres fuerte 💪' },
    ];
  },
};

export default API;
