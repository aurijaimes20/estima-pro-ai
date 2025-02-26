"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Eye, EyeOff } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

const voteOptions = [1, 2, 3, 5, 8, 13, 21, 34, 55, "☕"]

interface VotingSystemProps {
  onVoteComplete: (votes: { nombre: string; voto: number | string }[]) => void
  roomId: string
  userName: string
  votes: { nombre: string; voto: number | string }[]
}

export default function VotingSystem({ onVoteComplete, roomId, userName, votes }: VotingSystemProps) {
  const [selectedVote, setSelectedVote] = useState<number | string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleVote = async (vote: number | string) => {
    setSelectedVote(vote)

    // Obtener votos actuales de la sala
    const { data, error: fetchError } = await supabase
      .from("salas")
      .select("nombre, votos")
      .eq("id", roomId)
      .single()

    if (fetchError) {
      console.error("❌ Error al obtener sala:", fetchError.message)
      return
    }

    const currentVotes = data?.votos || []

    // Reemplazar voto si el usuario ya votó
    const updatedVotes = currentVotes.some((v: { nombre: string }) => v.nombre === userName)
      ? currentVotes.map((v: { nombre: string; voto: number | string }) =>
          v.nombre === userName ? { nombre: userName, voto: vote } : v
        )
      : [...currentVotes, { nombre: userName, voto: vote }]

    // Guardar el nuevo estado en la base de datos
    const { error: updateError } = await supabase
      .from("salas")
      .update({ votos: updatedVotes })
      .eq("id", roomId)

    if (updateError) {
      console.error("❌ Error al actualizar votos:", updateError.message)
    } else {
      console.log("✅ Voto actualizado:", updatedVotes)
      setShowResults(false) // Ocultamos los resultados
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {voteOptions.map((option) => (
          <motion.button
            key={option}
            className={`p-4 text-2xl font-bold rounded-lg flex items-center justify-center ${
              selectedVote === option ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote(option)}
          >
            {option === "☕" ? <Coffee size={24} /> : option}
          </motion.button>
        ))}
      </div>

      {votes.length > 0 && (
        <Button className="mt-4" onClick={() => setShowResults(!showResults)}>
          {showResults ? <EyeOff size={18} className="mr-2" /> : <Eye size={18} className="mr-2" />}
          {showResults ? "Ocultar Votos" : "Revelar Votos"}
        </Button>
      )}

      {showResults && (
        <motion.div
          className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-2">Resultados:</h2>
          <div className="grid grid-cols-5 gap-2">
            {votes.map((voto, index) => (
              <motion.div
                key={index}
                className="p-3 text-xl font-bold bg-gray-300 rounded-lg flex flex-col items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm text-gray-700">{voto.nombre}</span>
                <span>{showResults ? voto.voto : "❓"}</span>
              </motion.div>
            ))}
          </div>
          <Button
          className="mt-4"
          onClick={() => onVoteComplete(votes)}
        >
          <Eye size={18} className="mr-2" />
          "Ver todos los Votos"
        </Button>
        </motion.div>
      )}
    </div>
  )
}