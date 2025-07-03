// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export default API;

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