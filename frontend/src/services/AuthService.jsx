export const authService = {
  login: async (credentials) => {
    const res = await fetch("/api/login", {
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
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return { success: res.ok, data: await res.json() };
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};