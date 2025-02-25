"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { v4 as uuidv4 } from "uuid"

export default function CrearSala() {
  const [nombreSala, setNombreSala] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const crearSala = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const salaId = uuidv4() // Generar un ID único

    const { error } = await supabase.from("salas").insert([
      { id: salaId, nombre: nombreSala, votos: [] } // Insertamos la sala en Supabase
    ])

    setLoading(false)

    if (error) {
      console.error("Error al crear la sala:", error.message)
      return
    }

    router.push(`/sala/${salaId}`) // Redirigir a la sala creada
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Sala</h1>
      <form onSubmit={crearSala} className="w-full max-w-xs">
        <input
          type="text"
          value={nombreSala}
          onChange={(e) => setNombreSala(e.target.value)}
          placeholder="Nombre de la sala"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Sala"}
        </button>
      </form>
    </div>
  )
}