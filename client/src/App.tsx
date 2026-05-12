
import "./index.css";
import HistoryPanel from "./components/HistoryPanel"; 
import ChatBox from "./components/ChatBox";
import UsernameModal from "./components/UsernameModal";
import { useState } from "react"; 
import { useWebSocket } from "./hooks/useWebSocket";

/**
 * Componente principal de la aplicación que gestiona el estado global,
 * la autenticación inicial del usuario y la disposición de la interfaz.
 */
function App() {
  const [nombreConfirmado, setNombreConfirmado] = useState(false);
  const [chosenName, setChosenName] = useState<string | undefined>(undefined);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const {
    mensajes,
    historial,
    enviarMensaje,
    cargarHistorial,
    username,
    estado,
  } = useWebSocket(chosenName);

  // Si no ha confirmado su nombre, mostramos el modal primero
  if (!nombreConfirmado) {
    return (
      <UsernameModal
        onConectar={(nombre) => {
          setChosenName(nombre);
          setNombreConfirmado(true);
        }}
      />
    );
  }



  
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {" "}
      {/* Estructura principal del contenedor de la aplicación */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#1f2937", marginBottom: "10px" }}>SocketFlow Chat</h1>

        <p
          style={{
            color:
              estado === "conectado"
                ? "#059669"
                : estado === "conectando"
                ? "#d97706"
                : "#dc2626",
            fontWeight: "600",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor:
                estado === "conectado"
                  ? "#059669"
                  : estado === "conectando"
                  ? "#d97706"
                  : "#dc2626",
            }}
          ></span>
          {estado === "conectado" && "Conectado"}
          {estado === "conectando" && "Conectando..."}
          {estado === "desconectado" &&
            "Desconectado — tu servidor no esta corriendo"}
          {estado === "error" && "Error de conexión — revisá la consola"}
        </p>
        <h3 style={{ color: "#4b5563", marginBottom: "20px" }}>
          Usuario: {username}
        </h3>

          <button 
             onClick={() => { // Acción para cargar y conmutar visibilidad del historial

              cargarHistorial();

              setMostrarHistorial(
                !mostrarHistorial
              );
            }}
            style={{
              marginBottom: "20px",
              padding: "10px 24px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4f46e5",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
             {mostrarHistorial 
              ? "Ocultar historial"
              : "Cargar historial"}
          </button>
               {/* Sección de visualización del chat e historial */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "900px",
            margin: "0 auto",
            border: "1px solid #e5e7eb",
          }}
        >
          
          <div
            style={{
              display: mostrarHistorial
                ? "flex"
                : "block",
              gap: "20px",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >

          {mostrarHistorial && ( 
              <HistoryPanel
                historial={ historial       
                }
              />

            )}
            <ChatBox
              mensajes={mensajes}
              onSend={enviarMensaje}
              username={username}  
            />
            
            </div>
          </div>
        </div>
    </div>
    );
}

export default App;
