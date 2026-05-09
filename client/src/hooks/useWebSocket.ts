import { useEffect, useRef, useState, useCallback } from 'react'

export interface Message {
  type: 'chat' | 'notification' | 'welcome'
  payload: {
    userId?: string
    userName?: string
    text?: string
    message?: string
    timestamp?: string
    id?: string
    name?: string
  }
}

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(url)
    socketRef.current = socket

    socket.onopen = () => {
      setIsConnected(true)
      console.log('Conectado al servidor WebSocket')
    }

    socket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data)
      
      if (data.type === 'welcome') {
        setCurrentUser({ id: data.payload.id!, name: data.payload.name! })
      } else {
        setMessages((prev) => [...prev, data])
      }
    }

    socket.onclose = () => {
      setIsConnected(false)
      console.log('Desconectado del servidor WebSocket')
    }

    socket.onerror = (error) => {
      console.error('Error en WebSocket:', error)
    }

    return () => {
      // Solo cerrar si el socket está en un estado que permite el cierre
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close()
      }
    }
  }, [url])


  const sendMessage = useCallback((type: string, payload: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, payload }))
    }
  }, [])

  const setUserName = useCallback((name: string) => {
    sendMessage('set_name', { name })
    setCurrentUser((prev) => prev ? { ...prev, name } : null)
  }, [sendMessage])

  const sendChatMessage = useCallback((text: string) => {
    sendMessage('chat', { text })
  }, [sendMessage])

  return {
    messages,
    isConnected,
    currentUser,
    setUserName,
    sendChatMessage
  }
}