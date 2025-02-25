import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dancing_Script } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const cursiveFont = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "EstimaPro",
  description: "Una aplicación moderna para estimación de tareas en equipos de desarrollo",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${cursiveFont.className} bg-gradient-to-b from-purple-900 via-purple-700 to-black min-h-screen text-3xl text-white`} 
      >
        {children}
      </body>
    </html>
  );
}