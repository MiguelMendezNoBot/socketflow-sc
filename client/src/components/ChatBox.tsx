import type { Message } from '../hooks/useWebSocket'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

interface Props {
  messages: Message[]
  currentUserId: string
  onSendMessage: (text: string) => void
  isConnected: boolean
}

export default function ChatBox({ messages, currentUserId, onSendMessage, isConnected }: Props) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
              SF
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">SocketFlow SC</h1>
            <p className="text-[10px] text-gray-500 font-medium">SISTEMA COLABORATIVO CORPORATIVO</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
            {isConnected ? 'EN LÍNEA' : 'DESCONECTADO'}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <MessageList messages={messages} currentUserId={currentUserId} />

      {/* Input Area */}
      <MessageInput onSendMessage={onSendMessage} disabled={!isConnected} />
    </div>
  )
}