import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 via-purple-700 to-black p-6">
      <div className="bg-white w-[500px] h-60 p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">EstimaPro</h1> {/* Aumenté a text-5xl */}
        <div className="flex gap-6">
          <Link href="/crear-sala" className="bg-purple-600 hover:bg-purple-800 text-white font-bold text-2xl py-3 px-8 rounded"> {/* Aumenté a text-2xl */}
            Crear Sala
          </Link>
          <Link href="/unirme" className="bg-purple-600 hover:bg-purple-800 text-white font-bold text-2xl py-3 px-8 rounded"> {/* Aumenté a text-2xl */}
            Unirme
          </Link>
        </div>
      </div>
    </main>
  );
}

