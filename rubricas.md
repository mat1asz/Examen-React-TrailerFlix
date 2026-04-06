## Rúbrica - Examen React TrailerFlix

Puntaje total sugerido: **100 puntos**.  

---

### 1. Routing y SPA (20 pts)
- Generación de jerarquías de ruteado (`/`, `/peliculas/:id`).  
- Componente de Fallback funcional de cara a errores humanos en tipeo de URLs.
- Usar de `useParams` para alimentar la llamada AJAX interna en la ruta anidada.

---

### 2. Fetch Catálogo y Layouts (25 pts)
- Conexión vía GET a `/api/contenido`, asimilación de la promesa y modelado de datos en el `useState`.
- Separación asertiva de elementos UI (`VideoCard`, `Section`, `Navbar`).
- Prevención de desbordes por carga lenta de fetch (Loaders indicativos).

---

### 3. Detalles Unitarios y Parámetros (20 pts)
- Fetch de películas singulares para su reproducción local.
- Estructuración de UI que muestre el iFrame de video, reparto y sinopsis con seguridad de tipado inicial (Validaciones nulas o undefines temporales).

---

### 4. Autenticación (Contextualizada) (20 pts)
- Implementar `POST` API Request consumiendo `body JSON` con usuario/contraseña.
- Elevación de credenciales al Root vía un `AuthContext`
- Cambio estético en el navbar una vez el usuario es identificado en el sistema.

---

### 5. Consistencia Reactiva y Hooks (15 pts)
- Componentes altamente granulares sin sobrecarga.
- Sin fallos críticos en la inyección de dependencias `useEffect` que puedan causar Render Loops infinitos.

---

### 6. Desaprobación automática (orientativa)
- Uso persistente de EventListeners (`document.getElementById().addEventListener()`) en lugar del flujo `onChange` de Formularios Controlados de React.
- Módulos bloqueados al compilar a causa de errores de Sintaxis JSX o dependencias circulares impidiendo ejecución.
