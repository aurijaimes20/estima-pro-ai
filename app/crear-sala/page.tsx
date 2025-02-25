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
      <h1 className="text-4xl font-bold mb-8 text-white">Crear Nueva Sala</h1>
  
      {/* Caja blanca alrededor del formulario */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
        <form onSubmit={crearSala} className="flex flex-col">
          <input
            type="text"
            value={nombreSala}
            onChange={(e) => setNombreSala(e.target.value)}
            placeholder="Nombre de la sala"
            className="border rounded w-full py-3 px-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Sala"}
          </button>
        </form>
      </div>
    </div>
  )
}