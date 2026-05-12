/**
 * Renderiza la lista de mensajes en el chat y maneja el desplazamiento automático
 * hacia el final cuando se reciben nuevos mensajes.
 * 
 * @param props.mensajes Arreglo de mensajes a renderizar.
 * @param props.username Nombre de usuario actual para resaltar mensajes propios.
 */
import { useEffect, useRef } from "react";
import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  mensajes: Mensaje[];
  username: string; //esto es para que el MessageList sepa quién es el usuario y pueda diferenciar los mensajes propios de los ajenos, por ejemplo, mostrando los mensajes propios alineados a la derecha y con un color diferente
}

export default function MessageList({ mensajes, username }: Props) {// username es para que el MessageList sepa quién es el usuario y pueda diferenciar los mensajes propios de los ajenos, por ejemplo, mostrando los mensajes propios alineados a la derecha y con un color diferente
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {

          bottomRef.current?.scrollIntoView({
            behavior: "smooth"
          });

        }, [mensajes]);
  return (
    <div
      style={{
        height: "550px",
        overflowY: "auto",
        padding: "15px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      {mensajes.map((msg, index) => {
        const esMio = msg.usuario === username;

        // Mensajes del sistema
        if (msg.tipo === "sistema") {
          return (
            <div
              key={index}
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "12px",
                margin: "8px 0",
                fontStyle: "italic",
              }}
            >
              {msg.mensaje}
            </div>
          );
        }

        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: esMio ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                backgroundColor: esMio ? "#4f46e5" : "#f3f4f6",
                color: esMio ? "#ffffff" : "#1f2937",
                padding: "10px 14px",
                borderRadius: esMio ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                maxWidth: "75%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                fontSize: "14px",
              }}
            >
              {!esMio && (
                <strong
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#4f46e5",
                    marginBottom: "4px",
                  }}
                >
                  {msg.usuario}
                </strong>
              )}

              <div style={{ lineHeight: "1.5" }}>{msg.mensaje}</div>

              <div
                style={{
                  fontSize: "10px",
                  textAlign: "right",
                  color: esMio ? "rgba(255, 255, 255, 0.8)" : "#9ca3af",
                  marginTop: "4px",
                }}
              >
                {msg.hora}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>

  );
}
//chat