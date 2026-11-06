// PASO 1 · COPIAR TAL CUAL
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="error">
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}