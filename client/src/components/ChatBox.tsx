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
    <div className="flex flex-col h-[700px] w-full max-w-4xl bg-white brutalist-border brutalist-shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-black text-[#ffff00] border-b-4 border-black flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ffff00] border-2 border-black flex items-center justify-center font-black text-black text-xl">
            SF
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">SocketFlow_Terminal</h1>
            <p className="text-[10px] font-bold">STATUS: {isConnected ? 'ONLINE_READY' : 'OFFLINE_DISCONNECTED'}</p>
          </div>
        </div>
        <div className={`w-6 h-6 border-4 border-black ${isConnected ? 'bg-[#ffff00]' : 'bg-red-600'}`}></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-white flex flex-col min-h-0">
        <MessageList messages={messages} currentUserId={currentUserId} />
      </div>

      {/* Input Area */}
      <div className="border-t-4 border-black">
        <MessageInput onSendMessage={onSendMessage} disabled={!isConnected} />
      </div>
    </div>
  )
}
