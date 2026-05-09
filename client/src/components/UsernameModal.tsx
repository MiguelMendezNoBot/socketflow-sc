import { useState } from 'react'

interface Props {
  onConfirm: (name: string) => void
  currentName: string
}

export default function UsernameModal({ onConfirm, currentName }: Props) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onConfirm(name)
    } else {
      onConfirm(currentName)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">¡Bienvenido!</h2>
        <p className="text-gray-400 text-center mb-8">Ingresa tu nombre para empezar a colaborar en tiempo real.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
              Nombre de usuario
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={currentName}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-600"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/20 transform active:scale-95 transition-all"
          >
            Confirmar y entrar
          </button>
        </form>
        
        <p className="mt-6 text-xs text-center text-gray-500">
          Si lo dejas vacío, se usará tu nombre temporal: <span className="text-gray-400 font-mono">{currentName}</span>
        </p>
      </div>
    </div>
  )
}