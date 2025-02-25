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
  const chartInstanceRef = useRef<Chart | null>(null) // Guardamos la instancia del gráfico

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        // Destruir el gráfico anterior si existe
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy()
        }

        // Crear nuevo gráfico
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: voteOptions.map(String),
            datasets: [
              {
                label: "Votos",
                data: voteOptions.map((option) => votes.filter((v) => v === option).length),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
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

    // Cleanup: destruir el gráfico al desmontar el componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [votes])

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Resultados de la Votación</h2>
      <canvas ref={chartRef}></canvas>

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