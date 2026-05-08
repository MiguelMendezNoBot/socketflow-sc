import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer })

const PORT = 3000

// TODO: HU-04 — manejar conexiones, desconexiones y nombres de usuario
// TODO: HU-05 — recibir y reenviar mensajes a todos los clientes

wss.on('connection', (ws) => {
  console.log('Cliente conectado')

  ws.on('message', (data) => {
    console.log('Mensaje recibido:', data.toString())
  })

  ws.on('close', () => {
    console.log('Cliente desconectado')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})