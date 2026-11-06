// PASO 1 · COPIAR TAL CUAL
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { apiFetch } from "../api/client.js";

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const datos = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      login({
        fullName: datos.firstName
          ? `${datos.firstName} ${datos.lastName}`
          : datos.username,
        rol: datos.rol || "",
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
      {error && (
        <p id="loginError" className="login-error">
          {error.message}
        </p>
      )}
    </form>
  );
}