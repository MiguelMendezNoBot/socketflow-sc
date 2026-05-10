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


type EstadoConexion = "conectando" | "conectado" | "desconectado" | "error";// aumentado de claude

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [username, setUsername] = useState("");
  
  const [estado, setEstado] = useState<EstadoConexion>("conectando");// aumentado de claude

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    //conexion exitosa
    ws.onopen = () => {
      console.log("Conectado al servidor ✅");// aumentado de claude
      setEstado("conectado");// aumentado de claude
    };

    //mensaje recibidos
    ws.onmessage = (event) => {

      console.log("Mensaje recibido:", event.data);

      const data = JSON.parse(event.data);

      if (data.tipo === "usuario") {
        setUsername(data.username);
      } else {
        setMensajes((prev) => [...prev, data]);
      }
    };

    // Error
    ws.onerror = (error) => {
      //console.log("Error WebSocket:", error);
      console.error("❌ Error WebSocket — ¿está corriendo el servidor en localhost:3000?");
      setEstado("error");// aumentado de claude
    };

    //desconectado
    ws.onclose = () => {
      console.log("Desconectado del servidor");
      setEstado("desconectado");// aumentado de claude
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const enviarMensaje = (mensaje: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ mensaje }));
    } else {
      console.error("No se puede enviar mensaje, WebSocket no está conectado");
    } 
  };

  return {
    mensajes,
    enviarMensaje,
    username,
    estado, 
  };// estado lo aumento claude 
}