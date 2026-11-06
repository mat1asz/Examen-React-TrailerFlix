// PASO 1 · COPIAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (header, saludo, footer)
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { LoginForm } from "./LoginForm.jsx";

export function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Si hay usuario se ve el saludo; si no, el formulario de login (ya está hecho, no se toca)
  const areaLogin = user ? (
    <>
        <div id="userInfo" className="login-user-info-visible">
          <span id="userNameDisplay">Bienvenido{user.fullName}</span>
          <button id="logoutBtn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
    </>
  ) : (
    <LoginForm />
  );

  return (
    <>
    <header>
      <div className="title">
        <h1 className="red-text logo-title">TRAILERFLIX</h1>
      </div>
      <div className="login-container">
        {areaLogin}
      </div>
    </header> {children}
    </>
  );
}