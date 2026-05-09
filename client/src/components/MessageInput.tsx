import { useState } from 'react'

interface Props {
  onSendMessage: (text: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSendMessage, disabled }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !disabled) {
      onSendMessage(text)
      setText('')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 bg-gray-900 border-t border-gray-800 flex items-center gap-3"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Conectando..." : "Escribe un mensaje aquí..."}
        className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-600 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white p-3 rounded-xl shadow-lg transform active:scale-95 transition-all group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  )
}