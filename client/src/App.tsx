
import "./index.css";
import fondo from "./assets/fondo.jpg"; 
import HistoryPanel from "./components/HistoryPanel"; 
import ChatBox from "./components/ChatBox";
import { useState } from "react"; 
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [mostrarHistorial, setMostrarHistorial] =useState(false); 
  const {
    mensajes,
    historial,
    enviarMensaje,
    cargarHistorial, 
    username,
    estado,
  } = useWebSocket();//variable para mostrar el estado de la conexión

  
  return (
        <div
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          minHeight: "100vh",

          padding: "20px",
        }}
        > {/* CONTENEDOR PRINCIPAL */}
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",

              padding: "10px 20px",

              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <h1 style={{ color: "white" }}>Chat WebSocket</h1>

            <p
              style={{
                color:
                  estado === "conectado"
                    ? "#00ff88"
                    : estado === "conectando"
                    ? "orange"
                    : "red",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
          >
            {estado === "conectado" && "🟢 Conectado"}
            {estado === "conectando" && "🟡 Conectando..."}
            {estado === "desconectado" && "🔴 Desconectado — tu servidor no esta corriendo"}
            {estado === "error" && "🔴 Error de conexión — revisá la consola"}
          </p>
          <h3>
            Conectado como: {username}
          </h3>

          <button 
             onClick={() => { // boton de historial

              cargarHistorial();

              setMostrarHistorial(
                !mostrarHistorial
              );
            }}
            style={{
              marginBottom: "15px",
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#9225eb",
              color: "white",
              fontWeight: "bold"
            }}
          >
             {mostrarHistorial 
              ? "Ocultar historial"
              : "Cargar historial"}
          </button> 
          //fin del  boton para cargar historial
               {/* CHAT */}
        <div
          style={{ // ajuste cuadro de chat
            backgroundColor: "transparent",
            backdropFilter: "blur(6px)",
            borderRadius: "15px",
            padding: "15px",
            maxWidth: "800px",
            margin: "0 auto",
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
// chat
