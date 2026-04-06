/**
 * movie.js
 * 
 * Este archivo se encarga de mostrar el detalle buscando el `id` en la URL.
 * En React:
 * 1. Obtenemos el `id` mediante el hook `useParams()` de react-router-dom.
 * 2. Usamos un `useEffect` con la dependencia `[id]` para buscar los datos.
 * 3. `movie` y `error` serán variables de estado manejadas con `useState()`.
 */

// Base del API (mismo origen si la app se abre desde http://localhost:3001)
const API_BASE = ''
const movieDetailsContainer = document.querySelector('.movie-details')

// Obtener el ID de la URL. En React se usa useParams()
const params = new URLSearchParams(window.location.search)
const movieId = parseInt(params.get('id'))

const getMovieDetails = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/contenido/${movieId}`)
    if (!response.ok) {
      if (response.status === 404) {
        movieDetailsContainer.innerHTML = '<p class="error">Película no encontrada.</p>'
        return
      }
      throw new Error('Error en la petición')
    }
    const movie = await response.json()

    movieDetailsContainer.innerHTML = `
        <div class="movie-poster">
          <img src="${movie.poster}" alt="${movie.titulo}" />
        </div>
        <div class="movie-info">
          <h2>${movie.titulo}</h2>
          <p><strong>Resumen:</strong> ${movie.resumen}</p>
          <iframe width="560" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
          <p><strong>Reparto:</strong> ${movie.reparto}</p>
        </div>
      `
  } catch (error) {
    movieDetailsContainer.innerHTML = '<p class="error">Error al cargar los detalles de la película.</p>'
  }
}

getMovieDetails()
