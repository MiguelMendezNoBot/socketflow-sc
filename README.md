# SocketFlow SC

Sistema de chat colaborativo en tiempo real construido con WebSockets.

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (viene incluido con Node.js)

## Estructura del proyecto

socketflow-sc/
├── client/   → Frontend (React + Vite + TypeScript + Tailwind)
└── server/   → Backend (Express + WebSocket + TypeScript)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/socketflow-sc.git
cd socketflow-sc
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 3. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

## Cómo correr el proyecto

Necesitas **dos terminales abiertas al mismo tiempo**.

### Terminal 1 — Servidor

```bash
cd server
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`

### Terminal 2 — Cliente

```bash
cd client
npm run dev
```

El cliente estará corriendo en `http://localhost:5173`

Abre `http://localhost:5173` en tu navegador para usar el chat.

## Para probar con múltiples usuarios

Abre `http://localhost:5173` en dos pestañas o navegadores distintos y verás los mensajes en tiempo real.