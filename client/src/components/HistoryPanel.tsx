import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  historial: Mensaje[];
}

export default function HistoryPanel({
  historial,
}: Props) {

  return (
    <div
      style={{
        width: "300px",

        height: "550px",

        overflowY: "auto",

        padding: "15px",

        borderRadius: "15px",

        backgroundColor:
          "rgba(255,255,255,0.08)",

        backdropFilter: "blur(8px)",

        color: "white",
      }}
    >

      <h3
        style={{
          marginTop: 0,
          marginBottom: "15px",
        }}
      >
        Historial
      </h3>

      {historial.length === 0 ? (

        <p>No hay historial</p>

      ) : (

        historial.map((msg, index) => (

          <div
            key={index}
            style={{
              marginBottom: "12px",

              paddingBottom: "10px",

              borderBottom:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <strong>
              {msg.usuario}
            </strong>

            <div>
              {msg.mensaje}
            </div>

            <small
              style={{
                opacity: 0.7,
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