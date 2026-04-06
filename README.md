## Examen Práctico - React TrailerFlix

**Objetivo general**  
Migrar la app TrailerFlix (hecha en JS vanilla) a una **SPA en React**, reutilizando la API local ya implementada en Express.

---

### 1. Qué hay en el repo

- **Versión referencia**: Cuentas con archivos HTML, CSS y la lógica imperativa en la carpeta `js/`.
- **Servidor Mock API**: carpeta `server/`, configurado para proveer el catálogo de películas y endpoints de validación.
- **Proyecto React**: carpeta `react/`, punto de partida vacío y configurado con Vite listo para operar.

Tu misión es emular y mejorar este comportamiento bajo control del Virtual DOM.

---

### 2. Qué debe tener tu app React

- **Routing (React Router)**  
  - `/` -> Catálogo inicial, listado paginado o continuo de la videoteca.  
  - `/peliculas/:id` -> Ruta paramétrica mostrando Player, Sipnosis y reparto.

- **Consumo de API (fetch desde React)**  
  - Uso correcto del Endpoint en BaseURL para rescatar el JSON.

- **Login Administrativo**  
  - Lógica para consumir `/api/login` enviando las credenciales vía POST payload en React.

---

### 3. React: piezas mínimas

- **Hooks**: Todo el set de uso común: `useState`, `useEffect`, `useContext`.
- **Contexto**: Exponer los detalles del usuario logueado en todas las demás jerarquías de componentes mediante `AuthContext.Provider`.

---

### 4. Cómo ejecutar todo

1. **Backend Server**
   - Entra a `server/`, ejecuta `npm install` si fuere necesario y luego `npm run start`.
2. **App React**
   - Accede a `react/`, instala y prende la app ejecutando `npm run dev` tal cual como el ecosistema de Vite lo dictamina.

---

### 5. Reglas básicas del examen

- Considera que el servidor provee tanto contenido general como credenciales evaluables, por consiguiente el puerto del API (`3001` usualmente) debe estar mapeado acorde a lo que levante en tu terminal Node.
- Consulta el archivo `rubricas.md` para entender el modelo de calificación bajo el que te evaluarán.
