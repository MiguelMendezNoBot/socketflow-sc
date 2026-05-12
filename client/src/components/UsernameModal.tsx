/**
 * Muestra una ventana modal superpuesta para requerir la identificación del usuario.
 * Soporta ingreso manual y, si la API de Google está disponible, inicio de sesión de Google.
 * 
 * @param props.onConectar Función de callback para establecer la conexión con el nombre ingresado.
 */
import React, { useState } from 'react';

interface Props {
  onConectar: (nombre: string) => void;
}

const UsernameModal: React.FC<Props> = ({ onConectar }) => {
  const [nombre, setNombre] = useState('');

  /**
   * Decodifica de forma segura un token JWT (como los provistos por Google)
   * extrayendo su carga útil (payload) en formato JSON.
   * 
   * @param token Token JWT a decodificar.
   * @returns El objeto JSON decodificado o null si ocurre un error.
   */
  const decodeGoogleToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  React.useEffect(() => {
    /* global google */
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: "98281127419-jspug5udv75pr3vguve0t4jlf3p9r6kb.apps.googleusercontent.com", 
        callback: (response: any) => {
          const userData = decodeGoogleToken(response.credential);
          if (userData && userData.name) {
            onConectar(userData.name);
          }
        },
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, [onConectar]);

  /**
   * Maneja el envío del formulario de identificación manual, validando
   * que el nombre no esté en blanco antes de proceder.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nombreFinal = nombre.trim();
    if (nombreFinal) {
      console.log("Entrando con nombre manual:", nombreFinal);
      onConectar(nombreFinal);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>SocketFlow Chat</h2>
        <p style={styles.subtitle}>Identifícate para comenzar a chatear</p>
        
        <div id="googleBtn" style={{ marginBottom: '24px' }}></div>

        <div style={styles.divider}>
          <span style={styles.dividerText}>O INGRESA MANUALMENTE</span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Tu nombre o apodo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Confirmar e Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(17, 24, 39, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#111827",
    fontSize: "24px",
    fontWeight: "700",
  },
  subtitle: {
    margin: "0 0 32px 0",
    color: "#6b7280",
    fontSize: "14px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0",
    color: "#9ca3af",
  },
  dividerText: {
    padding: "0 10px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  input: {
    padding: "14px 20px",
    fontSize: "15px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    backgroundColor: "#f9fafb",
    color: "#1f2937",
    transition: "all 0.2s",
  },
  button: {
    padding: "14px 24px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
  },
};


export default UsernameModal;
//chat