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
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <input
        type="text"
        value={mensaje}
        placeholder="Escribe un mensaje..."
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "12px 16px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          outline: "none",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          color: "#1f2937",
        }}
      />

      <button onClick={enviar}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 24px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          transition: "all 0.2s",
        }}
      >
        Enviar
      </button>
    </div>

  );
}
// chat