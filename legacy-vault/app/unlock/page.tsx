"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { recoverShamirKey, decryptData } from "@/lib/crypto";
import { RiSafe2Fill } from "react-icons/ri";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UnlockVault() {
  const [email, setEmail] = useState("");
  const [vaultData, setVaultData] = useState<any>(null);
  const [inputShares, setInputShares] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "searching" | "collecting_keys" | "decrypting" | "success">("idle");
  const [secretMessage, setSecretMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [shareErrors, setShareErrors] = useState<string[]>([]);

  const handleFindVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email.trim())) {
      setEmailError("Masukkan email pemilik yang valid.");
      return;
    }
    setEmailError("");
    setStatus("searching");
    try {
      const q = query(collection(db, "vaults"), where("user_email", "==", email.trim()));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) throw new Error("Vault tidak ditemukan.");
      const data = querySnapshot.docs[0].data();
      setVaultData(data);
      setInputShares(new Array(data.threshold).fill(""));
      setShareErrors(new Array(data.threshold).fill(""));
      setStatus("collecting_keys");
    } catch (error) {
      alert("Email tidak ditemukan atau belum membuat vault.");
      setStatus("idle");
    }
  };

  const validateShares = () => {
    if (!vaultData) return false;
    const newErrors = inputShares.map((share) => share.trim().length === 0 ? "Kunci wajib diisi." : "");
    setShareErrors(newErrors);
    return newErrors.every((msg) => msg === "");
  };

  const handleCombineAndDecrypt = async () => {
    if (!validateShares()) return;
    setStatus("decrypting");
    try {
      const masterKey = await recoverShamirKey(inputShares.map((share) => share.trim()));
      const message = await decryptData(vaultData.encrypted_data, masterKey);
      setSecretMessage(message);
      setStatus("success");
    } catch (error) {
      console.error(error);
      alert("Gagal! Periksa kembali kombinasi kunci yang dimasukkan.");
      setStatus("collecting_keys");
    }
  };

  const handleShareInput = (index: number, value: string) => {
    const sanitized = value.trim();
    const newShares = [...inputShares];
    newShares[index] = sanitized;
    setInputShares(newShares);
    const newErrors = [...shareErrors];
    newErrors[index] = sanitized ? "" : "Kunci wajib diisi.";
    setShareErrors(newErrors);
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 px-4 py-16 text-white sm:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/40 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/30 blur-[150px]" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <RiSafe2Fill className="text-6xl text-purple-300 animate-bounce drop-shadow-lg" aria-hidden="true" />
          <h1 className="text-3xl font-semibold tracking-tight text-purple-100 sm:text-4xl">The Council Unlock</h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Masukkan email pemilik vault, kumpulkan kunci dari guardian, lalu gabungkan untuk membuka pesan rahasia.
          </p>
        </div>

        {status === "success" && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-8 text-center shadow-2xl shadow-emerald-900/40 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-emerald-200">CONSENSUS REACHED ✅</h2>
            <p className="mt-2 text-sm text-emerald-100">Legacy message:</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/60 p-6 text-left font-mono text-lg text-white whitespace-pre-wrap">
              {secretMessage}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-2xl border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Reset Session
            </button>
          </div>
        )}

        {(status === "idle" || status === "searching") && (
          <form onSubmit={handleFindVault} className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/70 space-y-4">
            <label className="text-sm text-slate-300">Email Pemilik Vault</label>
            <input
              type="email"
              required
              placeholder="email@contoh.com"
              className={`w-full rounded-2xl border bg-black/60 px-4 py-3 text-sm text-white outline-none transition ${
                emailError ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-purple-400"
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-xs text-red-400">{emailError}</p>}
            <button
              type="submit"
              disabled={status === "searching"}
              className="w-full rounded-2xl bg-purple-600 py-3 text-base font-semibold shadow-lg shadow-purple-700/40 transition hover:-translate-y-0.5 hover:bg-purple-500 disabled:opacity-60"
            >
              {status === "searching" ? "Mencari..." : "Cari Vault"}
            </button>
          </form>
        )}

        {(status === "collecting_keys" || status === "decrypting") && vaultData && (
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/60 backdrop-blur-lg">
            <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4 text-center text-sm text-purple-100">
              Vault ditemukan. Dibutuhkan <strong>{vaultData.threshold}</strong> dari <strong>{vaultData.total_shares}</strong> kunci Guardian.
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {inputShares.map((share, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-slate-300">
                    Guardian #{index + 1}
                  </label>
                  <input
                    type="text"
                    value={share}
                    className={`mt-2 w-full rounded-2xl border bg-black/60 px-3 py-3 font-mono text-xs text-yellow-200 outline-none transition ${
                      shareErrors[index] ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-green-400"
                    }`}
                    placeholder={`Paste kode kunci ke-${index + 1}`}
                    onChange={(e) => handleShareInput(index, e.target.value)}
                  />
                  {shareErrors[index] && <p className="mt-1 text-xs text-red-400">{shareErrors[index]}</p>}
                </div>
              ))}
            </div>
            <button
              onClick={handleCombineAndDecrypt}
              disabled={status === "decrypting"}
              className="w-full rounded-2xl bg-green-500 py-4 text-lg font-semibold text-gray-900 shadow-xl shadow-green-900/50 transition hover:-translate-y-0.5 hover:bg-green-400 disabled:opacity-70"
            >
              {status === "decrypting" ? "Menggabungkan Kunci..." : "Gabungkan & Buka"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}


