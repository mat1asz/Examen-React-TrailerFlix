/**
 * BACKEND TRAILERFLIX - NODE + EXPRESS
 * Este archivo ya está implementado. El alumno debe consumir esta API desde el frontend.
 */

const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001

// Ruta base de los datos (desde server/ hacia data/)
const DATA_PATH = path.join(__dirname, '..', 'data')

app.use(cors())
app.use(express.json())

// Cargar datos al iniciar (se leen desde los JSON del proyecto)
let contenido = []
let usuarios = { users: [] }

function loadData () {
  try {
    const contenidoPath = path.join(DATA_PATH, 'trailerflix.json')
    const usuariosPath = path.join(DATA_PATH, 'usuarios.json')
    contenido = JSON.parse(fs.readFileSync(contenidoPath, 'utf-8'))
    usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'))
    console.log(`Datos cargados: ${contenido.length} títulos, ${usuarios.users.length} usuarios`)
  } catch (err) {
    console.error('Error cargando datos:', err.message)
  }
}

loadData()

// -------- RUTAS API (el alumno debe consumirlas con fetch) --------

/**
 * GET /api/contenido
 * Devuelve todo el catálogo (películas y series).
 */
app.get('/api/contenido', (req, res) => {
  res.json(contenido)
})

/**
 * GET /api/contenido/:id
 * Devuelve un título por su id. Responde 404 si no existe.
 */
app.get('/api/contenido/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' })
  }
  const item = contenido.find(c => c.id === id)
  if (!item) {
    return res.status(404).json({ error: 'No encontrado' })
  }
  res.json(item)
})

/**
 * POST /api/login
 * Body: { "username": "...", "password": "..." }
 * Devuelve { "ok": true, "username": "..." } si las credenciales son correctas.
 * Devuelve 401 si son incorrectas.
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan usuario o contraseña' })
  }
  const user = usuarios.users.find(
    u => u.username === username && u.password === password
  )
  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
  }
  res.json({ ok: true, username: user.username })
})

// Ruta de salud para comprobar que el servidor está en marcha
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API TrailerFlix funcionando' })
})

// Servir el frontend estático (HTML, CSS, JS) desde la raíz del proyecto
const FRONTEND_PATH = path.join(__dirname, '..')
app.use(express.static(FRONTEND_PATH))

// Las rutas de la SPA se sirven con index.html (para que movie.html y 404 sigan funcionando)
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`API TrailerFlix escuchando en http://localhost:${PORT}`)
  console.log('Abre en el navegador: http://localhost:' + PORT)
  console.log('Endpoints: GET /api/contenido, GET /api/contenido/:id, POST /api/login')
})
