import { useEffect, useRef } from 'react'
import type { Message } from '../hooks/useWebSocket'

interface Props {
  messages: Message[]
  currentUserId: string
}

export default function MessageList({ messages, currentUserId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth custom-scrollbar"
    >
      {messages.map((msg, index) => {
        if (msg.type === 'notification') {
          return (
            <div key={index} className="flex justify-center">
              <span className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-700/50">
                {msg.payload.message}
              </span>
            </div>
          )
        }

        const isMe = msg.payload.userId === currentUserId

        return (
          <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              <span className="text-[10px] text-gray-500 font-medium px-1">
                {isMe ? 'Tú' : msg.payload.userName} • {new Date(msg.payload.timestamp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className={`px-4 py-2 rounded-2xl text-sm ${
                isMe 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-900/10' 
                  : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
              }`}>
                {msg.payload.text}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}