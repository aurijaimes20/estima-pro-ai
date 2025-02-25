"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface VoteResultsProps {
  votes: (number | string)[]
}

// Serie de Fibonacci + icono de café
const voteOptions = [1, 2, 3, 5, 8, 13, 21, 34, 55, "☕"]

export default function VoteResults({ votes }: VoteResultsProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy()
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: voteOptions.map(String),
            datasets: [
              {
                label: "Votos",
                data: voteOptions.map((option) => votes.filter((v) => v === option).length),
                backgroundColor: "rgba(102, 51, 153, 0.5)", // Cambio a morado semi-transparente
                borderColor: "rgba(102, 51, 153, 1)", // Borde morado
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [votes])

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Resultados de la Votación</h2>

      {/* Nueva distribución horizontal de los votos */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {voteOptions.map((option) => {
          const count = votes.filter((v) => v === option).length
          return (
            <div
              key={option}
              className="bg-white text-black text-2xl font-bold p-4 rounded-2xl shadow-md w-16 h-16 flex items-center justify-center"
            >
              {option}
            </div>
          )
        })}
      </div>

      {/* Tabla de votos */}
      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Opción</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad de Votos</th>
          </tr>
        </thead>
        <tbody>
          {voteOptions.map((option) => {
            const count = votes.filter((v) => v === option).length
            return (
              <tr key={option} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{option}</td>
                <td className="border border-gray-300 px-4 py-2">{count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}