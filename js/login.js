/**
 * Login en el frontend - Consume POST /api/login
 * Funciona en index.html y movie.html (mismo header con formulario).
 * Envuelto en IIFE para no colisionar con API_BASE de app.js.
 */
(function () {
  const baseUrl = (typeof window !== 'undefined' && window.location.origin.includes('3001'))
    ? ''
    : 'http://localhost:3001'

  const loginForm = document.getElementById('loginForm')
  const userInfo = document.getElementById('userInfo')
  const userNameDisplay = document.getElementById('userNameDisplay')
  const logoutBtn = document.getElementById('logoutBtn')
  const loginError = document.getElementById('loginError')
  const loginSubmitBtn = document.getElementById('loginSubmitBtn')

  if (!loginForm || !userInfo) {
    console.warn('Login: elementos del formulario no encontrados en esta página')
    return
  }

  // Estado inicial según sesión guardada
  const currentUser = window.localStorage.getItem('usuario')
  if (currentUser) {
    mostrarUsuario(currentUser)
  } else {
    mostrarFormulario()
  }

  // Validar credenciales contra el API
  async function validarUsuario (username, password) {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.ok === true) {
        return { username: data.username }
      }
      if (response.status === 401) {
        return null
      }
      throw new Error(data.error || 'Error en el servidor')
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        throw new Error('No se pudo conectar con el servidor. ¿Está el backend en marcha?')
      }
      throw err
    }
  }

  function mostrarError (mensaje) {
    if (loginError) {
      loginError.textContent = mensaje || ''
    } else {
      window.alert(mensaje || 'Usuario o contraseña incorrectos')
    }
  }

  function mostrarFormulario () {
    loginForm.classList.add('login-form-visible')
    loginForm.classList.remove('login-form-hidden')
    userInfo.classList.add('login-user-info-hidden')
    userInfo.classList.remove('login-user-info-visible')
    if (loginError) loginError.textContent = ''
  }

  function mostrarUsuario (username) {
    loginForm.classList.remove('login-form-visible')
    loginForm.classList.add('login-form-hidden')
    userInfo.classList.remove('login-user-info-hidden')
    userInfo.classList.add('login-user-info-visible')
    if (userNameDisplay) userNameDisplay.textContent = `Bienvenido, ${username}`
    if (loginError) loginError.textContent = ''
  }

  function ejecutarLogin () {
    const username = document.getElementById('username')?.value?.trim()
    const password = document.getElementById('password')?.value ?? ''

    if (!username) {
      mostrarError('Ingresa tu usuario')
      return
    }

    if (loginSubmitBtn) {
      loginSubmitBtn.disabled = true
      loginSubmitBtn.textContent = 'Entrando…'
    }
    mostrarError('')

    validarUsuario(username, password)
      .then((usuarioValido) => {
        if (usuarioValido) {
          window.localStorage.setItem('usuario', usuarioValido.username)
          mostrarUsuario(usuarioValido.username)
        } else {
          mostrarError('Usuario o contraseña incorrectos')
        }
      })
      .catch((err) => {
        mostrarError(err.message || 'Error al iniciar sesión')
      })
      .finally(() => {
        if (loginSubmitBtn) {
          loginSubmitBtn.disabled = false
          loginSubmitBtn.textContent = 'Ingresar'
        }
      })
  }

  // Envío del formulario: evitar recarga y ejecutar login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault()
    e.stopPropagation()
    ejecutarLogin()
    return false
  })

  // Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.localStorage.removeItem('usuario')
      mostrarFormulario()
    })
  }
})()
