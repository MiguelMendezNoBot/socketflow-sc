
export default App*/
import "./index.css";
import fondo from "./assets/fondo.jpg"; // fondo de pantalla para el chat, esto es solo para darle un toque más agradable a la interfaz, no es necesario para el funcionamiento del chat pero mejora la experiencia visual. Se podría mejorar añadiendo un selector de fondos o permitiendo subir fondos personalizados, pero por ahora esto es suficiente para el ejercicio.
import ChatBox from "./components/ChatBox";
import HistoryPanel from "./components/HistoryPanel"; // para cargar el historial aparte
import { useState } from "react"; // para cargar el historial aparte
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [mostrarHistorial, setMostrarHistorial] =useState(false); // para ver el historial
  const {
    mensajes,
    historial, // para cargar el historial aparte
    enviarMensaje,
    cargarHistorial, // para cargar el historial de mensajes antes de enviarlo a todos, aunque no se pidió explícitamente, es útil para que los nuevos clientes puedan recibir los mensajes anteriores al conectarse. Se podría mejorar guardando solo los últimos N mensajes o guardándolos en una base de datos si se quisiera persistencia a largo plazo. Por ahora, esto es suficiente para el ejercicio.
    username, estado
  } = useWebSocket();// estado es una variable que claude aumento para mostrar el estado de la conexión

  
  return (
        <div
        style={{ // actualizado para fondo de pantalla para el chat, esto es solo para darle un toque más agradable a la interfaz, no es necesario para el funcionamiento del chat pero mejora la experiencia visual. Se podría mejorar añadiendo un selector de fondos o permitiendo subir fondos personalizados, pero por ahora esto es suficiente para el ejercicio.
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

              //backgroundColor: "rgba(255,255,255,0.12)", eliminamos la caja grande
              //backdropFilter: "blur(10px)",

              //borderRadius: "20px",
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
             onClick={() => { // boton para cargar el historial mejorado

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
             {mostrarHistorial // para cargar historial
              ? "Ocultar historial"
              : "Cargar historial"}
          </button> 
          //fin del  boton para cargar historial
               {/* CHAT */}
        <div
          style={{
            backgroundColor: "transparent", // para ajustar el segundo cuar¿drado  o contenedor
            backdropFilter: "blur(6px)",
            borderRadius: "15px",
            padding: "15px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          
          <div // SE añadio para cargar el historial, ultima mejora
            style={{
              display: mostrarHistorial
                ? "flex"
                : "block",
              gap: "20px",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >

          {mostrarHistorial && ( // tdo esto se aumento para cargar el historial
              <HistoryPanel
                historial={ historial       
                }
              />

            )}
            <ChatBox
              mensajes={mensajes}
              onSend={enviarMensaje}
              username={username}  //esto es para que el ChatBox sepa quién es el usuario y pueda mostrarlo en los mensajes que envíe, además de diferenciar los mensajes propios de los ajenos
            />
            
            </div>// fin del contenedor del chat, que incluye el HistoryPanel y el ChatBox, se podría mejorar añadiendo una barra lateral para el historial o permitiendo ocultar el historial para pantallas más pequeñas, pero por ahora esto es suficiente para el ejercicio.
          </div>
        </div>
    </div>
    );
}

export default App;
// chat
