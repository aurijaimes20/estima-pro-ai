"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Eye, EyeOff } from "lucide-react" // Agregamos iconos para revelar/ocultar
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button" // Usamos un botón estilizado



// Serie de Fibonacci con un icono al final
const voteOptions = [1, 2, 3, 5, 8, 13, 21, 34, 55, "☕"]

interface VotingSystemProps {
  onVoteComplete: (votes: (number | string)[]) => void
}

export default function VotingSystem({ onVoteComplete }: VotingSystemProps) {
  const [selectedVote, setSelectedVote] = useState<number | string | null>(null)
  const [votes, setVotes] = useState<(number | string)[]>([]) // Estado para los votos
  const [showResults, setShowResults] = useState(false) // Estado para mostrar/ocultar resultados

  const handleVote = async (vote: number | string) => {
    setSelectedVote(vote)

    // Obtener votos actuales
    const { data } = await supabase.from("salas").select("id, votos").single()
    const currentVotes = data?.votos || []

    // Guardar el nuevo voto
    const updatedVotes = [...currentVotes, vote]
    await supabase.from("salas").update({ votos: updatedVotes }).eq("id", data?.id)

    setVotes(updatedVotes) // Guardamos los votos en el estado
    if (showResults){ 
      console.log("showResults", showResults)
      onVoteComplete(updatedVotes)
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
        <Button
          className="mt-4"
          onClick={() => setShowResults(!showResults)}
        >
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
            {votes.map((vote, index) => (
              <motion.div
                key={index}
                className="p-3 text-xl font-bold bg-gray-300 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                {showResults ? vote : "❓"}
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