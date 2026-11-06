// PASO 2 · REEMPLAZAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (la tarjeta)
import { Link } from "react-router-dom";
import { VerDatos } from "./VerDatos.jsx";

export function VideoCard({ movie, grupo }) {
  const { id, poster, titulo, categoria } = movie;

  return (
    <>
      <div className="card">
        <Link to={`/peliculas/${id}`}>
          <div className="card-picture">
            <img
              src={`http://localhost:3001/${poster}`}
              alt={titulo}
              title={titulo}
            />
          </div>
          <div className="card-bottom">
            <p className="card-bottom-title">{titulo}</p>
            <p>{categoria}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
