import Link from "next/link";
import { RiSafe2Fill } from "react-icons/ri";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 px-4 py-16 text-white sm:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-purple-600/30 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-600/30 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 rounded-3xl bg-white/5 p-10 text-center shadow-2xl shadow-blue-950/40 backdrop-blur-xl md:p-16">
        <RiSafe2Fill className="text-6xl text-blue-300 drop-shadow-lg md:text-7xl" aria-hidden="true" />
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            LegacyVault
          </span>
        </h1>
        <p className="text-base text-slate-200 md:text-xl">
          "Don't Let Your Data Die With You." <br className="hidden sm:block" />
          Sistem pewarisan aset digital otomatis dengan keamanan Zero-Knowledge dan kontrol penuh di tangan Anda.
        </p>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/create" className="flex-1">
            <button className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 hover:bg-blue-500">
              Buat Vault Baru
            </button>
          </Link>
          <Link href="/unlock" className="flex-1">
            <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:bg-white/20">
              Saya Ahli Waris
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
