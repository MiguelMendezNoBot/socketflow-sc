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
  //esHistorial?: boolean; // se añadio para saber si es historial o mensaje 
}


type EstadoConexion = "conectando" | "conectado" | "desconectado" | "error";// aumentado de claude

export function useWebSocket(initialUsername?: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [historial, setHistorial] = useState<Mensaje[]>([]);// crea el estado del historial 
  const [username, setUsername] = useState("");
  
  const [estado, setEstado] = useState<EstadoConexion>("conectando");// aumentado de claude

  useEffect(() => {
    // Si no hay nombre inicial, no conectamos todavía
    if (!initialUsername) return;

    console.log("Creando websocket para:", initialUsername);
    const wsUrl =
      import.meta.env.VITE_WS_URL ??
      `ws://${window.location.hostname}:3000`;
    
    // Agregamos el nombre a la URL
    const ws = new WebSocket(`${wsUrl}?username=${encodeURIComponent(initialUsername)}`);

    //conexion exitosa
    ws.onopen = () => {
      console.log("Conectado al servidor [OK]");
      setEstado("conectado");

      ws.send(
        JSON.stringify({
          tipo: "historial"
        })
      );
    };


    //mensaje recibidos
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.tipo === "historial") {
        setHistorial(data.mensajes);
        return;
      }

      if (data.tipo === "usuario") {
        setUsername(data.username);
      } else {
        setMensajes((prev) => [...prev, data]);
      }
    };

    // Error
    ws.onerror = () => {
      console.error("Error WebSocket — ¿está corriendo el servidor en localhost:3000?");
      setEstado("error");
    };

    //desconectado
    ws.onclose = () => {
      console.log("Desconectado del servidor");
      setEstado("desconectado");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [initialUsername]);

  const enviarMensaje = (mensaje: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ mensaje }));
    }
  };

  const cargarHistorial = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ tipo: "historial" }))
      }
  };

  const cambiarNombre = (nuevoNombre: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          tipo: "setUsername",
          username: nuevoNombre,
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
    cambiarNombre,
  };
}