"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Unirse() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [roomId, setRoomId] = useState("")
  const [nickname, setNickname] = useState("")

  useEffect(() => {
    const idFromUrl = searchParams.get("id")
    if (idFromUrl) setRoomId(idFromUrl)
  }, [searchParams])

  const handleJoin = () => {
    if (!roomId || !nickname) return alert("Debes ingresar un nombre y un ID de sala")
    localStorage.setItem("userName", nickname)
    router.push(`/sala/${roomId}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Unirse a una Sala</h1>
      <input
        type="text"
        placeholder="ID de la sala"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="p-3 border rounded-md mb-4 w-80"
      />
      <input
        type="text"
        placeholder="Tu nombre o nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="p-3 border rounded-md mb-4 w-80"
      />
      <button
        onClick={handleJoin}
        className="bg-green-600 text-white p-3 rounded-md w-80 hover:bg-green-700"
      >
        Unirse a la Sala
      </button>
    </div>
  )
}

