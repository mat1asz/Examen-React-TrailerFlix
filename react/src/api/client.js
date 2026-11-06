// PASO 2 · REEMPLAZAR (Ctrl+H con la ficha)
export const API_BASE_URL = "http://localhost:3000/api";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const datos = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(datos?.error || "Error al conectar con el servidor");
  }
  return datos;
}