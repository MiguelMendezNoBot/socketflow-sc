// TODO: HU-08 — campo de texto y botón de enviar
// - no enviar mensajes vacíos
// - limpiar el campo después de enviar
// - enviar con Enter o con el botón
import { useState } from "react";

interface Props {
  onSend: (mensaje: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [mensaje, setMensaje] = useState("");

  const enviar = () => {
    if (mensaje.trim() === "") return;

    onSend(mensaje);
    setMensaje("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {/*todo esto se aumento por claude */
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();// añadio chatgpt para no tenerrepetidos
      enviar();
    }
  };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        value={mensaje}
        placeholder="Escribe un mensaje..."
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "10px",
        }}
      />

      <button onClick={enviar}
        style={{  //  estyle es para darle estilos 
          backgroundColor: "#078061",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Enviar
      </button>
    </div>
  );
}
// chat