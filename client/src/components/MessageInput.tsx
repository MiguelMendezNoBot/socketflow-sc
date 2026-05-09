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
      className="p-6 bg-white flex items-center gap-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "OFFLINE..." : "TYPE_MESSAGE_HERE_{'>'}"}

        className="flex-1 bg-white border-4 border-black text-black px-4 py-4 font-bold focus:outline-none focus:bg-[#ffff00] transition-colors placeholder:text-gray-400 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="bg-black hover:bg-[#ffff00] hover:text-black text-[#ffff00] px-8 py-4 border-4 border-black font-black uppercase brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
      >
        SEND_
      </button>
    </form>
  )
}
