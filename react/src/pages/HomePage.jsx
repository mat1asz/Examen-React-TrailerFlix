// PASO 2 · REEMPLAZAR + ELEGIR UNA OPCIÓN  ·  PASO 4 · PEGAR HTML (un grupo)
import { Fragment } from "react";
import { useVideos } from "../hooks/useVideos.js";
import { VideoCard } from "../components/VideoCard.jsx";

// No se toca: arma los grupos cuando el servidor manda una lista sin agrupar
function agrupar(lista, campo) {
  const nombres = [...new Set(lista.map((x) => x[campo]))].sort();
  return nombres.map((nombre) => [
    nombre,
    lista.filter((x) => x[campo] === nombre),
  ]);
}

export function HomePage() {
  const { datos, loading, error } = useVideos();

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error al cargar los datos</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const grupos = agrupar(datos || [], "gen");

  const conDatos = grupos.filter(([, items]) => items.length > 0);

  if (conDatos.length === 0) {
    return (
      <div className="error">
        <p>No hay datos para mostrar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {conDatos.map(([grupo, items]) => {
          const tarjetas = items.map((x) => (
            <VideoCard key={x.id} movie={x} grupo={grupo} />
          ));
          return (
            <Fragment key={grupo}>
              
              <article className="genero">
                <h2>{grupo}</h2>
              </article>
              {tarjetas}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
