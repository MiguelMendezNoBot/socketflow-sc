import express from 'express'

import { createServer } from 'http'

import WebSocket, { WebSocketServer } from 'ws' // este es el paquete correcto para WebSocketServer



const app = express()

const httpServer = createServer(app)

const wss = new WebSocketServer({ server: httpServer })



const PORT = 3000

const historialMensajes: any[] = [] // esto guarda el historial globalmente para que quien sea pueda verlo

// TODO: HU-04 — manejar conexiones, desconexiones y nombres de usuario

// TODO: HU-05 — recibir y reenviar mensajes a todos los clientes

// Interfaz para agregar username al socket



interface ClienteWebSocket extends WebSocket {

  username?: string

}



// Generar nombre automático

function generarNombreUsuario() {

  return `Usuario_${Math.floor(Math.random() * 1000)}`

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

wss.on('connection', (ws: ClienteWebSocket) => {



  // Asignar nombre automático

  ws.username = generarNombreUsuario()



  console.log(`${ws.username} conectado felizmente`)



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



  // Recibir mensajes

  ws.on('message', (data: Buffer) => {// se actualizo para guardar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.



    const mensajeRecibido = JSON.parse(data.toString())



    // solicitar el historial

    if (mensajeRecibido.tipo === 'historial') { // guardar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.



      ws.send(

        JSON.stringify({

          tipo: 'historial',

          mensajes: historialMensajes

        })

      )



      return

    } //termin el if para guardar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.



    console.log(

      `Mensaje de ${ws.username}:`, mensajeRecibido.mensaje

    )



    // enviar un solo mensaje y guardar historial

    const nuevoMensaje = {  // desde aqui para guardar el historiañl de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.

    tipo: 'chat',

    usuario: ws.username,

    mensaje: mensajeRecibido.mensaje,

    hora: new Date().toLocaleTimeString()

    }



      // Guardar historial

    historialMensajes.push(nuevoMensaje)



      // Enviar a todos

    enviarATodos(nuevoMensaje) // hasta aqui para guardar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.

  })



  // Desconexión

  ws.on('close', () => {



    console.log(`${ws.username} desconectado`)



    // Notificar desconexión

    enviarATodos({

      tipo: 'sistema',

      mensaje: `${ws.username} salió del chat`

    })

  })

})



// Ruta simple HTTP

app.get('/', (_req, res) => {

  res.send('Servidor WebSocket funcionando')

})



// Iniciar servidor

httpServer.listen(PORT, () => {

  console.log(`Servidor corriendo en http://localhost:${PORT}`)

})



//chat