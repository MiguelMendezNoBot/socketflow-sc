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

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [historial, setHistorial] = useState<Mensaje[]>([]);// crea el estado del historial 
  const [username, setUsername] = useState("");
  
  const [estado, setEstado] = useState<EstadoConexion>("conectando");// aumentado de claude

  useEffect(() => {
    console.log("Creando websocket..."); // ultima modificacion para evitar mensajes repetidos 
    const wsUrl =
      import.meta.env.VITE_WS_URL ??
      `ws://${window.location.hostname}:3000`;
    const ws = new WebSocket(wsUrl);

    //conexion exitosa
    ws.onopen = () => {
      console.log("ONMESSAGE EJECUTADO"); // ultima modificacion para evitar mensajes repetidos
      console.log("Conectado al servidor ✅");// aumentado de claude
      setEstado("conectado");// aumentado de claude

      ws.send(
      JSON.stringify({
      tipo: "historial"
        })
      );
    };

    //mensaje recibidos
    ws.onmessage = (event) => {// se añadio un if para guardar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.

      console.log("Mensaje recibido:", event.data);

      const data = JSON.parse(event.data);
      if (data.tipo === "historial") { // para el historial

        //setMensajes(data.mensajes) esto estaba generando duplicados de mensaje 
       
        if (data.tipo === "historial") {

          setHistorial(data.mensajes);

          return;
        }
          

        return
      }// para el historial 

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

  const cargarHistorial = () => { // para cargar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.

    if (
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {

        socket.send(
          JSON.stringify({
            tipo: "historial"
          })
        )
      }
  };

  return {
    mensajes,
    historial, 
    enviarMensaje,
    username,
    estado, 
    cargarHistorial, // para cargar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.
  };// estado lo aumento claude 
}