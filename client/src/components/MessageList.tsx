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
      className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar bg-white"
    >
      {messages.map((msg, index) => {
        if (msg.type === 'notification') {
          return (
            <div key={index} className="flex justify-center">
              <span className="bg-black text-[#ffff00] text-[10px] font-black uppercase px-4 py-1 border-2 border-black">
                {msg.payload.message}
              </span>
            </div>
          )
        }

        const isMe = msg.payload.userId === currentUserId

        return (
          <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              <span className="text-[10px] text-black font-black uppercase tracking-tighter">
                {isMe ? 'YOU' : msg.payload.userName} // {new Date(msg.payload.timestamp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <div className={`px-4 py-3 border-4 border-black brutalist-shadow-sm font-bold text-sm ${
                isMe 
                  ? 'bg-[#ffff00] text-black' 
                  : 'bg-white text-black'
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
