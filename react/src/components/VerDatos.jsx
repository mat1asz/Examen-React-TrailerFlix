
export function VerDatos({ dato, corto = false }) {
  if (!dato) return null;
  let filas = Object.entries(dato).filter(([, valor]) => valor !== null && valor !== undefined);
  if (corto) filas = filas.filter(([, valor]) => typeof valor !== "object").slice(0, 3);
  return (
    <div style={{ background: "#fff", color: "#222", padding: "8px", margin: "8px 0" }}>
      {filas.map(([campo, valor]) => (
        <p key={campo}>
          <strong>{campo}:</strong> {typeof valor === "object" ? JSON.stringify(valor) : String(valor)}
        </p>
      ))}
    </div>
  );
}

export default VerDatos;