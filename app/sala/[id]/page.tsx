"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import VotingSystem from "@/components/VotingSystem"
import VoteResults from "@/components/VoteResults"
import { Button } from "@/components/ui/button"
import InviteModal from "@/components/InviteModal"
import { supabase } from "@/lib/supabaseClient"

export default function Sala() {
  const { id } = useParams()
  const [votingComplete, setVotingComplete] = useState(false)
  const [votes, setVotes] = useState<number[]>([])
  const [userName, setUserName] = useState("")
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  useEffect(() => {
    const fetchSalaData = async () => {
      const { data, error } = await supabase
        .from("salas")
        .select("nombre, votos")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error al obtener la sala:", error.message)
      } else {
        if (data?.nombre) setRoomName(data.nombre)
        if (data?.votos) setVotes(data.votos)
      }
    }

    fetchSalaData()

    const subscription = supabase
      .channel(`sala-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "salas" }, (payload) => {
        if (payload.new.votos) {
          setVotes(payload.new.votos)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [id])

  const handleVoteComplete = async (newVotes: (number | string)[]) => {
    setVotes(newVotes.map(vote => typeof vote === "string" ? parseFloat(vote) : vote))
    setVotingComplete(true)

    await supabase.from("salas").update({ votos: newVotes }).eq("id", id)
  }

  const handleResetVoting = async () => {
    setVotingComplete(false)
    setVotes([])

    const { error } = await supabase.from("salas").update({ votos: [] }).eq("id", id)

    if (error) {
      console.error("Error al resetear los votos:", error.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-black">
      <h1 className="text-5xl font-bold mb-8">Sala: {roomName || "Cargando..."}</h1>
      <p className="text-3xl mb-6">Bienvenido, <strong>{userName}</strong> 👋</p>
      <button
        onClick={() => setShowInviteModal(true)}
        className="mb-6 bg-green-600 text-white text-2xl p-4 rounded-md hover:bg-green-700"
      >
        Invitar jugadores
      </button>

      {!votingComplete ? (
        <VotingSystem onVoteComplete={handleVoteComplete} />
      ) : (
        <div className="flex flex-col items-center">
          {/* Contenedor con scroll horizontal si hay muchos votos */}
          <div className="w-full max-w-3xl overflow-x-auto">
            <div className="flex gap-4 mt-6 whitespace-nowrap">
              {votes.map((vote, index) => (
                <div
                  key={index}
                  className="bg-white text-black text-4xl font-bold p-6 rounded-xl shadow-md w-28 h-28 flex items-center justify-center border border-gray-400"
                >
                  {vote}
                </div>
              ))}
            </div>
          </div>

          <Button className="mt-8 text-3xl p-4" onClick={handleResetVoting}>
            Volver a Votar
          </Button>
        </div>
      )}

      {showInviteModal && <InviteModal roomId={id as string} onClose={() => setShowInviteModal(false)} />}
    </div>
  )
}