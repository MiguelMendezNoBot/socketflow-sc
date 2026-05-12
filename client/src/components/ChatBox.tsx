/**
 * Renderiza el contenedor principal del chat, integrando la lista de mensajes
 * y el campo de entrada de texto.
 *
 * @param props.mensajes Historial de mensajes a mostrar en la interfaz.
 * @param props.onSend Función invocada al enviar un nuevo mensaje.
 * @param props.username Nombre del usuario actual para diferenciar sus mensajes.
 */
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

import type { Mensaje } from "../hooks/useWebSocket";

interface Props {
  mensajes: Mensaje[];
  onSend: (mensaje: string) => void;
  username: string; //esto es para que el ChatBox sepa quién es el usuario y pueda mostrarlo en los mensajes que envíe, además de diferenciar los mensajes propios de los ajenos
}

export default function ChatBox({
  mensajes,
  onSend,
  username //esto es para que el ChatBox sepa quién es el usuario y pueda mostrarlo en los mensajes que envíe, además de diferenciar los mensajes propios de los ajenos 
}: Props) {
  return (
    <div>
      <MessageList mensajes={mensajes}
                   username={username}  //esto es para que el MessageList sepa quién es el usuario y pueda diferenciar los mensajes propios de los ajenos, por ejemplo, mostrando los mensajes propios alineados a la derecha y con un color diferente
      />

      <MessageInput onSend={onSend} />
    </div>
  );
}
// chat