// TODO: HU-06 — hook que maneja la conexión WebSocket
// - conectarse al servidor al montar
// - manejar mensajes entrantes
// - manejar desconexión y errores
// - exponer función para enviar mensajes

// TODO: HU-06 — hook que maneja la conexión WebSocket
// - conectarse al servidor al montar
// - manejar mensajes entrantes
// - manejar desconexión y errores
// - exponer función para enviar mensajes
import { useEffect, useState } from "react";

export interface Mensaje {
  tipo: string;
  usuario?: string;
  mensaje: string;
  hora?: string;
}
type EstadoConexion =
  | "conectando"
  | "conectado"
  | "desconectado"
  | "error";

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [mensajes, setMensajes] = useState<Mensaje[]>([]);

  const [historial, setHistorial] = useState<Mensaje[]>([]);

  const [username, setUsername] = useState("");

  const [estado, setEstado] =
    useState<EstadoConexion>("conectando");

  useEffect(() => {
    console.log("Creando websocket...");

    const ws = new WebSocket("ws://localhost:3000");

    // conexión exitosa
    ws.onopen = () => {
      console.log("Conectado al servidor ✅");

      setEstado("conectado");

      ws.send(
        JSON.stringify({
          tipo: "historial",
        })
      );
    };

    // mensajes recibidos
    ws.onmessage = (event) => {
      console.log("Mensaje recibido:", event.data);

      const data = JSON.parse(event.data);

      // historial
      if (data.tipo === "historial") {
        setHistorial(data.mensajes);
        return;
      }

      // usuario asignado
      if (data.tipo === "usuario") {
        setUsername(data.username);
      } else {
        setMensajes((prev) => [...prev, data]);
      }
    };

    // error
    ws.onerror = () => {
      console.error(
        " Error WebSocket — ¿está corriendo el servidor en localhost:3000?"
      );

      setEstado("error");
    };

    // desconectado
    ws.onclose = () => {
      console.log("Desconectado del servidor");

      setEstado("desconectado");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const enviarMensaje = (mensaje: string) => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(
        JSON.stringify({ mensaje })
      );
    } else {
      console.error(
        "No se puede enviar mensaje, WebSocket no está conectado"
      );
    }
  };

  const cargarHistorial = () => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(
        JSON.stringify({
          tipo: "historial",
        })
      );
    }
  };

  return {
    mensajes,
    historial,
    enviarMensaje,
    username,
    estado,
    cargarHistorial,
  };
}