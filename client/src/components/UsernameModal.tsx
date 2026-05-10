// TODO: HU-07 — modal inicial para que el usuario ingrese su nombre
// - campo de texto para el nombre
// - botón de confirmar
// - si está vacío, el servidor asignará un nombre temporal

import React, { useState } from 'react';

interface Props {
  onConectar: (nombre: string) => void;
}

const UsernameModal: React.FC<Props> = ({ onConectar }) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim()) {
      onConectar(nombre.trim());
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>💬 Chat Colaborativo</h2>
        <p style={styles.subtitle}>Ingresa tu nombre para unirte al chat</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Unirse al Chat
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: { // no se hizo ninun cambio
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#075e54',
  },
  subtitle: {
    margin: '0 0 24px 0',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '24px',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#075e54',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default UsernameModal;
//chat