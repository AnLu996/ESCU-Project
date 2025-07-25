// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    // Recuperar tanto token como user del sessionStorage al iniciar
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token
    };
  });

  useEffect(() => {
    // Persistir cambios en sessionStorage
    if (authState.token) {
      sessionStorage.setItem("token", authState.token);
      sessionStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  }, [authState.token, authState.user]);

  const login = (token, userData) => {
    setAuthState({
      token,
      user: userData || null,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    });
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}