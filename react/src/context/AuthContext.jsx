// PASO 2 · REEMPLAZAR (Ctrl+H con la ficha)
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const CLAVE = "usuario";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(CLAVE, JSON.stringify(user));
    } else {
      localStorage.removeItem(CLAVE);
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}