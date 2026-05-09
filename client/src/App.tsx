import { useState } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import ChatBox from "./components/ChatBox";
import UsernameModal from "./components/UsernameModal";

function App() {
  const { messages, isConnected, currentUser, setUserName, sendChatMessage } =
    useWebSocket("https://socketflow-sc.onrender.com/");

  const [showModal, setShowModal] = useState(true);

  const handleConfirmName = (name: string) => {
    setUserName(name);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#ffff00] flex items-center justify-center p-4 font-mono">
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-8 border-black border-t-transparent animate-spin"></div>
          <p className="text-black font-black uppercase text-xl">
            CONECTANDO AL NODO...
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
