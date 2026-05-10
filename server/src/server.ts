import express from 'express'
import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'

const app = express()
const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer })

const PORT = 3001

// Estructura de un usuario
interface User {
  id: string
  name: string
  ws: WebSocket
}

// Base de datos en memoria
const users = new Map<string, User>()
let userCounter = 1 

// FUNCIONES AUXILIARES

// 1. Envía un mensaje raw a todos los conectados
function broadcast(message: any) {
  const data = JSON.stringify(message)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

// 2. Envía una notificación de sistema a todos
function notifyAll(messageText: string) {
  broadcast({
    type: 'notification',
    payload: { message: messageText }
  })
}

// 3. Registra y crea un nuevo usuario
function createNewUser(ws: WebSocket): User {
  const userId = Math.random().toString(36).substring(2, 9)
  const defaultName = `Usuario_${userCounter++}`
  
  const newUser = { id: userId, name: defaultName, ws }
  users.set(userId, newUser)
  
  return newUser
}

// MANEJADORES DE EVENTOS

function handleNameChange(user: User, newName: string) {
  const oldName = user.name
  user.name = newName
  notifyAll(`${oldName} ahora es ${newName}`)
}

function handleChatMessage(user: User, text: string) {
  broadcast({
    type: 'chat',
    payload: {
      userId: user.id,
      userName: user.name,
      text: text,
      timestamp: new Date().toISOString()
    }
  })
}

// LÓGICA PRINCIPAL DEL WEBSOCKET

wss.on('connection', (ws) => {
  // Registrar al usuario que acaba de entrar
  const user = createNewUser(ws)
  console.log(`Cliente conectado: ${user.name} (${user.id})`)

  // Darle la bienvenida personalmente
  ws.send(JSON.stringify({
    type: 'welcome',
    payload: { id: user.id, name: user.name }
  }))

  // Avisar al resto que entró
  notifyAll(`${user.name} se ha unido al chat`)

  // Escuchar los mensajes que envíe este usuario
  ws.on('message', (rawData) => {
    try {
      const data = JSON.parse(rawData.toString())
      
      switch (data.type) {
        case 'set_name':
          handleNameChange(user, data.payload.name)
          break;
        case 'chat':
          handleChatMessage(user, data.payload.text)
          break;
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error)
    }
  })

  // Manejar cuando el usuario se va
  ws.on('close', () => {
    users.delete(user.id)
    console.log(`Cliente desconectado: ${user.name}`)
    notifyAll(`${user.name} ha dejado el chat`)
  })
})

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})


