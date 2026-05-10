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
        style={{
          flex: 1,
          padding: "10px",
        }}
      />

      <button onClick={enviar}>
        Enviar
      </button>
    </div>
  );
}
