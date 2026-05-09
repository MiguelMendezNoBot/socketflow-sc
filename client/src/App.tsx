import { useState } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
import ChatBox from './components/ChatBox'
import UsernameModal from './components/UsernameModal'

function App() {
  const { messages, isConnected, currentUser, setUserName, sendChatMessage } = useWebSocket('ws://127.0.0.1:3001')


  const [showModal, setShowModal] = useState(true)

  const handleConfirmName = (name: string) => {
    setUserName(name)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-4 selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      {showModal && currentUser && (
        <UsernameModal 
          onConfirm={handleConfirmName} 
          currentName={currentUser.name} 
        />
      )}

      {currentUser && (
        <ChatBox 
          messages={messages} 
          currentUserId={currentUser.id}
          onSendMessage={sendChatMessage}
          isConnected={isConnected}
        />
      )}
      
      {!currentUser && (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Estableciendo conexión segura...</p>
        </div>
      )}
    </div>
  )
}

export default App