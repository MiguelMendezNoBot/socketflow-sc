import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  historial: Mensaje[];
}

/**
 * Renderiza un panel lateral que muestra el historial persistente de mensajes
 * recuperado desde el servidor.
 *
 * @param props.historial Arreglo de mensajes previos a mostrar en el panel.
 */
export default function HistoryPanel({
  historial,
}: Props) {

  return (
    <div
      style={{
        width: "300px",
        height: "550px",
        overflowY: "auto",
        padding: "20px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        color: "#1f2937",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "18px",
          color: "#111827",
        }}
      >
        Historial
      </h3>

      {historial.length === 0 ? (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>No hay historial</p>
      ) : (
        historial.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <strong
              style={{
                display: "block",
                fontSize: "13px",
                color: "#4f46e5",
                marginBottom: "4px",
              }}
            >
              {msg.usuario}
            </strong>

            <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
              {msg.mensaje}
            </div>

            <small
              style={{
                display: "block",
                fontSize: "11px",
                color: "#9ca3af",
                marginTop: "6px",
              }}
            >
              {msg.hora}
            </small>
          </div>
        ))
      )}
    </div>
  );
}