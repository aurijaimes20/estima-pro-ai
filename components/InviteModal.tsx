"use client"

import { useState } from "react"

interface InviteModalProps {
  roomId: string
  onClose: () => void
}

export default function InviteModal({ roomId, onClose }: InviteModalProps) {
  const joinUrl = `${window.location.origin}/unirme?id=${roomId}`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Invitar jugadores</h2>
        <p className="text-sm text-gray-600 mb-2">Comparte este enlace para que otros se unan:</p>
        <input
          type="text"
          value={joinUrl}
          readOnly
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleCopy}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          {copied ? "¡Copiado!" : "Copiar enlace de unión"}
        </button>
        <button onClick={onClose} className="mt-4 w-full text-gray-600">
          Cerrar
        </button>
      </div>
    </div>
  )
}

