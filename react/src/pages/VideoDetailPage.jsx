// PASO 2 · REEMPLAZAR  ·  PASO 4 · PEGAR HTML (el detalle)
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";
import { VerDatos } from "../components/VerDatos.jsx";

export function VideoDetailPage() {
  const { id } = useParams();
  const [movie, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // No se toca: también trae la lista completa, por si el detalle muestra un dato que solo está ahí
  const [lista, setLista] = useState(null);
  useEffect(() => {
    apiFetch("/contenido")
      .then(setLista)
      .catch(() => setLista(null));
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError(null);
        const datos = await apiFetch(`/contenido/${id}`);
        setVideo(datos);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [id]);

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error || !movie) {
    return (
      <article className="container">
        <p className="error">{error ? error.message : "No encontrado"}</p>
        <Link to="/">Volver al inicio</Link>
      </article>
    );
  }

  return (
    <>
    <main className="movie-page-container">
      <a href="index.html" className="back-btn">← Volver al catálogo</a>
      <div className="movie-details">
        <div className="movie-poster">
          <img src={`http://localhost:3001${movie.poster}`} alt={movie.titulo} />
        </div>
        <div className="movie-info">
          <h2>{movie.titulo}</h2>
          <p><strong>Resumen:</strong> {movie.resumen}</p>
          <iframe width="560" height="315" src="{movie.trailer}" frameborder="0" allowfullscreen></iframe>
          <p><strong>Reparto:</strong> {movie.reparto}</p>
        </div>
      </div>
    </main>
    
    </>
  );
}  