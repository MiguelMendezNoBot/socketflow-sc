// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/**
 * Punto de entrada principal de la aplicación React.
 * Inicializa el renderizado del componente App en el elemento raíz del DOM.
 */
createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <App />
  //</StrictMode>
)