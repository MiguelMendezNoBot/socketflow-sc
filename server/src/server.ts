import express from 'express'
import { createServer } from 'http'
import WebSocket, { WebSocketServer } from 'ws' 
import url from 'url'

const app = express()
const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer })


const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOST ?? '0.0.0.0'
const historialMensajes: any[] = [] // esto guarda el historial globalmente para que quien sea pueda verlo 
// TODO: HU-04 — manejar conexiones, desconexiones y nombres de usuario
// TODO: HU-05 — recibir y reenviar mensajes a todos los clientes
// Interfaz para agregar username al socket

interface ClienteWebSocket extends WebSocket {
  username?: string
}

// Enviar mensaje a todos los clientes conectados

function enviarATodos(data: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
}

// Conexión WebSocket
wss.on('connection', (ws: ClienteWebSocket, req) => {
  // Leer nombre de la URL (ej: ws://localhost:3000?username=Fabio)
  const parameters = url.parse(req.url || '', true).query;
  const nombreQuery = parameters.username as string;

  // Asignar nombre: el de la URL o uno por defecto
  ws.username = nombreQuery || "Invitado"


  console.log(`Conexión establecida: ${ws.username}`)


  // Enviar nombre al cliente conectado
  ws.send(
    JSON.stringify({
      tipo: 'usuario',
      username: ws.username
    })
  )

  // Notificar a todos que alguien se conectó
  enviarATodos({
    tipo: 'sistema',
    mensaje: `${ws.username} se unió al chat`
  })

  // Manejo de mensajes entrantes
  ws.on('message', (data: Buffer) => {
    const mensajeRecibido = JSON.parse(data.toString())

    // Handler para cambio de nombre
    if (mensajeRecibido.tipo === "setUsername") {
      const nombreAnterior = ws.username;
      ws.username = mensajeRecibido.username || ws.username;
      console.log(`Cambio de nombre: ${nombreAnterior} -> ${ws.username}`);

      ws.send(JSON.stringify({ tipo: "usuario", username: ws.username }));
      enviarATodos({ tipo: "sistema", mensaje: `${nombreAnterior} ahora es ${ws.username}` });
      return;
    }

    // Handler para solicitud de historial
    if (mensajeRecibido.tipo === 'historial') {
      ws.send(JSON.stringify({ tipo: 'historial', mensajes: historialMensajes }));
      return;
    }

    console.log(`Mensaje de ${ws.username}:`, mensajeRecibido.mensaje)

    // Crear y distribuir nuevo mensaje de chat
    const nuevoMensaje = {
      tipo: 'chat',
      usuario: ws.username,
      mensaje: mensajeRecibido.mensaje,
      hora: new Date().toLocaleTimeString()
    }

    historialMensajes.push(nuevoMensaje)
    enviarATodos(nuevoMensaje)
  })

  // Manejo de desconexión
  ws.on('close', () => {
    console.log(`Desconexión: ${ws.username}`)
    enviarATodos({
      tipo: 'sistema',
      mensaje: `${ws.username} salió del chat`
    })
  })

})




// Health check del servidor
app.get('/', (_req, res) => {
  res.send({ status: "ok", service: "SocketFlow Server" });
});

// Iniciar servidor
httpServer.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
})

//chat