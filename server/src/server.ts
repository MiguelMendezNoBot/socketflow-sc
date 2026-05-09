import express from 'express'
import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'

const app = express()
const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer })

const PORT = 3001


interface User {
  id: string
  name: string
  ws: WebSocket
}

const users = new Map<string, User>()
let userCounter = 1

function broadcast(message: any) {
  const data = JSON.stringify(message)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws) => {
  const userId = Math.random().toString(36).substring(2, 9)
  const defaultName = `Usuario_${userCounter++}`
  
  const newUser: User = {
    id: userId,
    name: defaultName,
    ws
  }
  
  users.set(userId, newUser)
  console.log(`Cliente conectado: ${defaultName} (${userId})`)

  // Notificar al nuevo usuario su información
  ws.send(JSON.stringify({
    type: 'welcome',
    payload: { id: userId, name: defaultName }
  }))

  // Notificar a todos que alguien se unió
  broadcast({
    type: 'notification',
    payload: { message: `${defaultName} se ha unido al chat` }
  })

  ws.on('message', (rawData) => {
    try {
      const data = JSON.parse(rawData.toString())
      
      if (data.type === 'set_name') {
        const oldName = newUser.name
        newUser.name = data.payload.name
        broadcast({
          type: 'notification',
          payload: { message: `${oldName} ahora es ${newUser.name}` }
        })
      }

      if (data.type === 'chat') {
        broadcast({
          type: 'chat',
          payload: {
            userId: newUser.id,
            userName: newUser.name,
            text: data.payload.text,
            timestamp: new Date().toISOString()
          }
        })
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error)
    }
  })

  ws.on('close', () => {
    users.delete(userId)
    console.log(`Cliente desconectado: ${newUser.name}`)
    broadcast({
      type: 'notification',
      payload: { message: `${newUser.name} ha dejado el chat` }
    })
  })
})

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})
