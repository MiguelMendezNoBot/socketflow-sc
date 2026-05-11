import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  mensajes: Mensaje[];
  onSend: (mensaje: string) => void;
  username: string;
}

export default function ChatBox({ mensajes, onSend, username }: Props) {
  return (
    <div>
      <MessageList mensajes={mensajes} username={username} />

      <MessageInput onSend={onSend} />
    </div>
  );
}
