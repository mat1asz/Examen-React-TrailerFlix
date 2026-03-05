# Examen: Consumo de API con Fetch - TrailerFlix

## Objetivo

Conectar la aplicación **TrailerFlix** (HTML, CSS y JavaScript) con un **backend ya implementado** en Node.js y Express. La tarea del alumno es que el frontend obtenga todos los datos mediante **fetch** a la API REST, en lugar de cargar archivos JSON estáticos. No se debe modificar el código del backend en `server/`.

Se evaluará el uso correcto de **fetch** (GET y POST), el manejo de respuestas y errores, y la integración con la interfaz actual.

---

## Puesta en marcha

1. En la carpeta **`server`**: `npm install` y luego `npm start`.
2. Abrir en el navegador **http://localhost:3001** (no abrir `index.html` por archivo, para que las peticiones vayan al mismo origen).

---

## Datos y API

Los datos están en **`data/`** pero el frontend **no debe acceder a ellos directamente**. El backend los expone vía API:

| Recurso   | En backend        | Endpoint              |
|-----------|-------------------|------------------------|
| Catálogo  | `data/trailerflix.json` | `GET /api/contenido`   |
| Usuarios  | `data/usuarios.json`   | `POST /api/login`      |

**Endpoints:**

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/contenido` | Devuelve todo el catálogo (array de películas/series). |
| GET | `/api/contenido/:id` | Devuelve un título por `id`. Responde 404 si no existe. |
| POST | `/api/login` | Body: `{ "username": "...", "password": "..." }`. Responde `{ "ok": true, "username": "..." }` si es correcto, o 401 si no. |

Credenciales de prueba: por ejemplo `emilys` / `emilyspass` (cualquier usuario de `data/usuarios.json`).

---

## Archivos a completar

Implementar las peticiones **fetch** en:

- **`js/app.js`** — Obtener el catálogo con `GET /api/contenido` y mantener la lógica de tarjetas por género y manejo de errores.
- **`js/movie.js`** — Obtener el detalle con `GET /api/contenido/:id` (usar el `id` de la URL). Mostrar "Película no encontrada" si responde 404.
- **`js/login.js`** — Enviar usuario y contraseña con `POST /api/login` (cabecera `Content-Type: application/json`, body `JSON.stringify({ username, password })`). Si la respuesta es correcta, guardar usuario (ej. en `localStorage`) y actualizar la UI; si no, mostrar mensaje de error.

Requerimientos técnicos: usar una constante para la URL base del API; comprobar `response.ok` o `response.status`; manejar 404, 401 y fallos de red. Se puede usar `async/await` o `.then()`.

---

## Ejemplos de código

**Catálogo (app.js):**
```javascript
const API_BASE = '' // mismo origen si se sirve desde http://localhost:3001
const response = await fetch(`${API_BASE}/api/contenido`)
const data = await response.json()
// ... usar data para armar el HTML por género
```

**Detalle (movie.js):**
```javascript
const response = await fetch(`${API_BASE}/api/contenido/${movieId}`)
if (!response.ok) {
  if (response.status === 404) { /* mostrar no encontrada */ return }
  throw new Error('Error en la petición')
}
const movie = await response.json()
```

**Login (login.js):**
```javascript
const response = await fetch(`${API_BASE}/api/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
if (!response.ok) return null
const data = await response.json()
return data.ok === true ? { username: data.username } : null
```

---

## Estructura del proyecto

```
Examen-React-TrailerFlix/
├── server/                 # Backend (ya implementado - no modificar)
│   ├── package.json
│   └── server.js
├── data/
│   ├── trailerflix.json
│   └── usuarios.json
├── js/
│   ├── app.js
│   ├── movie.js
│   └── login.js
├── css/
│   └── style.css
├── index.html
├── movie.html
├── 404.html
└── README.md
```

---

## Requerimientos funcionales

1. **Catálogo:** Cargar desde `GET /api/contenido` y mostrar agrupado por género.
2. **Detalle:** Cargar desde `GET /api/contenido/:id`; mensaje claro si no existe.
3. **Login:** Enviar a `POST /api/login`; mostrar nombre de usuario y botón cerrar sesión si es correcto; mensaje de error si no.
4. **Errores:** Manejar 404, 401 y fallos de red sin romper la app y con feedback al usuario.

---

## Evaluación y entrega

- Subir el proyecto a un repositorio de GitHub con instrucciones para ejecutarlo (levantar backend y abrir http://localhost:3001) y enviar el enlace antes de la fecha límite.

**Rúbrica (100 puntos):**

| Área | Puntos | Qué se evalúa |
|------|--------|----------------|
| Fetch catálogo (app.js) | 35 | GET a `/api/contenido`, agrupación por género, manejo de errores. |
| Fetch detalle (movie.js) | 35 | GET a `/api/contenido/:id`, id desde URL, 404 manejado, poster/título/resumen/reparto/tráiler. |
| Login (login.js) | 30 | POST con body JSON y cabecera correcta, actualización de UI, mensaje ante 401/error. |

**Desaprobación automática si:** la aplicación no ejecuta o tiene errores críticos; no se usa el API (se cargan JSON estáticos); el login no usa `POST /api/login` con body en JSON.

**Bonus (hasta +10):** +5 persistencia de sesión con `localStorage`; +5 mensajes de error en la UI (no solo `alert`).
