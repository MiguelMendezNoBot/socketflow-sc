// TODO: HU-09 — lista de mensajes
// - muestra cada mensaje con nombre de usuario y hora
// - diferencia visualmente mensajes propios vs ajenos
// - notificaciones de conexión/desconexión en estilo distinto
// - scroll automático al último mensaje
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
        border: "1px solid gray",

        height: "550px",
        maxWidth: "800px",
        margin: "0 auto",
        overflowY: "auto",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "transparent",
        backdropFilter: "blur(8px)",
        borderRadius: "15px",
      }}
    >
       {mensajes.map((msg, index) => {

        const esMio = msg.usuario === username; // todo el codigo se actualizo para 
        

        // Mensajes del sistema
        if (msg.tipo === "sistema") {
          return (
            <div
                key={index}
                style={{
                  textAlign: "center",
                  color: "rgb(248, 248, 248)", // color de los mensajes del sistema
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
              justifyContent: esMio
                ? "flex-end"
                : "flex-start",
            }}
          >
            <div
              style={{
                backgroundColor: esMio
                  ? "#05f585"// ei el mensaje es mio lo muestro con un fondo verde
                  : "white", // si el mensaje no es mio lo muestro con un fondo blanco

                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                boxShadow: "0 1px 2px rgb(230, 20, 20)",
              }}
            >
              {!esMio && (
                <strong>
                  {msg.usuario}
                </strong>
              )}

              <div>
                {msg.mensaje}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  textAlign: "right",
                  color: "rgba(0, 0, 0, 0.7)", // color de la hora
                  marginTop: "5px",
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