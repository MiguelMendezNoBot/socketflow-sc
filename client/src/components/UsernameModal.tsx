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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black p-10 brutalist-shadow max-w-md w-full">
        <h2 className="text-4xl font-black text-black mb-2 text-center uppercase tracking-tighter">WHO_ARE_YOU?</h2>
        <p className="text-black font-bold text-center mb-10 border-b-2 border-black pb-4">ACCESSING_CORPORATE_NODE</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="name" className="text-xs font-black text-black uppercase tracking-widest">
              IDENTIFIER_NAME:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={currentName}
              className="w-full bg-white border-4 border-black text-black px-4 py-4 font-black focus:outline-none focus:bg-[#ffff00] transition-colors placeholder:text-gray-400"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black hover:bg-[#ffff00] hover:text-black text-[#ffff00] font-black py-5 border-4 border-black uppercase tracking-widest brutalist-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            ESTABLISH_CONNECTION_{">"}
          </button>

        </form>
        
        <p className="mt-10 text-[10px] text-center text-black font-black uppercase">
          DEFAULT_ALIAS: <span className="bg-black text-[#ffff00] px-2 py-1">{currentName}</span>
        </p>
      </div>
    </div>
  )
}
