// TODO: HU-09 — lista de mensajes
// - muestra cada mensaje con nombre de usuario y hora
// - diferencia visualmente mensajes propios vs ajenos
// - notificaciones de conexión/desconexión en estilo distinto
// - scroll automático al último mensaje

import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  mensajes: Mensaje[];
}

export default function MessageList({ mensajes }: Props) {
  return (
    <div
      style={{
        border: "1px solid gray",
        height: "400px",
        overflowY: "auto",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {mensajes.map((msg, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {msg.tipo === "sistema" ? (
            <i>{msg.mensaje}</i>
          ) : (
            <>
              <strong>{msg.usuario}</strong>: {msg.mensaje}
              <div style={{ fontSize: "12px" }}>
                {msg.hora}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}