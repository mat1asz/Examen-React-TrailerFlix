// PASO 2 · REEMPLAZAR (Ctrl+H con la ficha)
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

export function useVideos() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError(null);
        const respuesta = await apiFetch("/contenido");
        setDatos(respuesta);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, []);

  return { datos, loading, error };
}