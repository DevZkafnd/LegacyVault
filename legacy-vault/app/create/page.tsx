// src/app/create/page.tsx
"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { generateMasterKey, encryptData, generateShamirShares } from "@/lib/crypto";
import { RiSafe2Fill } from "react-icons/ri";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateVault() {
  const [formData, setFormData] = useState({
    myEmail: "",
    secretMessage: "",
    totalGuardians: 3,
    threshold: 2
  });
  const [loading, setLoading] = useState(false);
  const [shares, setShares] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!emailRegex.test(formData.myEmail.trim())) {
      newErrors.myEmail = "Masukkan email yang valid.";
    }
    if (!formData.secretMessage.trim() || formData.secretMessage.trim().length < 10) {
      newErrors.secretMessage = "Pesan minimal 10 karakter dan tidak boleh kosong.";
    }
    if (formData.totalGuardians < 2 || formData.totalGuardians > 10) {
      newErrors.totalGuardians = "Total penjaga harus 2 - 10.";
    }
    if (formData.threshold < 2) {
      newErrors.threshold = "Threshold minimal 2 penjaga.";
    } else if (formData.threshold > formData.totalGuardians) {
      newErrors.threshold = "Threshold tidak boleh melebihi total penjaga.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const masterKey = await generateMasterKey();
      const { encryptedBlob } = await encryptData(formData.secretMessage.trim(), masterKey);
      const generatedShares = await generateShamirShares(
        masterKey, 
        Number(formData.totalGuardians), 
        Number(formData.threshold)
      );

      await addDoc(collection(db, "vaults"), {
        user_email: formData.myEmail.trim(),
        encrypted_data: encryptedBlob,
        total_shares: formData.totalGuardians,
        threshold: formData.threshold,
        status: "ACTIVE",
        created_at: new Date()
      });

      setShares(generatedShares);
      
    } catch (error) {
      console.error(error);
      alert("Gagal membuat vault.");
    }
    setLoading(false);
  };

  if (shares.length > 0) {
    return (
      <main className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 px-4 py-16 text-white sm:px-8">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute inset-x-0 top-0 mx-auto h-72 w-72 rounded-full bg-green-500/30 blur-[160px]" />
        </div>
        <section className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-green-900/40 backdrop-blur-xl sm:p-12">
          <div className="flex flex-col items-center text-center">
            <RiSafe2Fill className="text-6xl text-green-300 animate-bounce drop-shadow-lg" aria-hidden="true" />
            <h1 className="mt-4 text-3xl font-semibold text-green-100">Vault Council Created! 🛡️</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
              Vault ini membutuhkan <strong>{formData.threshold} dari {formData.totalGuardians} kode</strong> untuk membuka rahasia. 
              Bagikan kode di bawah ini ke para Guardian berbeda.
            </p>
          </div>

          <div className="grid gap-5">
            {shares.map((share, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-inner shadow-black/40">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
                  <span>Guardian #{index + 1}</span>
                  <span>Kode rahasia</span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    value={share}
                    className="flex-1 rounded-xl border border-white/10 bg-black/70 px-3 py-3 font-mono text-sm text-amber-200 focus:outline-none"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(share)}
                    className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-green-900/50 transition hover:bg-green-500"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl border border-white/20 bg-white/10 py-3 font-semibold text-slate-100 transition hover:bg-white/20"
          >
            Buat Vault Baru
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 px-4 py-16 text-white sm:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-blue-600/30 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl shadow-blue-900/40 backdrop-blur-2xl lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
          <div className="flex flex-col gap-6 text-slate-100">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <RiSafe2Fill className="text-5xl text-blue-200" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Phase IV</p>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Create Council Vault
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-300 sm:text-base">
              Enkripsi pesan rahasia menggunakan AES-256 & Shamir's Secret Sharing. 
              Pilih jumlah Guardian dan threshold untuk memastikan hanya pemegang sah yang bisa membuka warisan digital.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-slate-400">True Zero Knowledge</p>
                <p className="text-xl font-semibold text-white">Server tidak simpan kunci</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-slate-400">Guardian Council</p>
                <p className="text-xl font-semibold text-white">Threshold kustom 2-10</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreate} className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/60 space-y-5">
            <div>
              <label className="block text-sm text-slate-300">Email Anda</label>
              <input
                type="email"
                required
                className={`mt-1 w-full rounded-2xl border bg-black/60 px-3 py-3 text-sm text-white outline-none transition ${
                  errors.myEmail ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-blue-400"
                }`}
                onChange={(e) => setFormData({ ...formData, myEmail: e.target.value })}
              />
              {errors.myEmail && <p className="mt-1 text-xs text-red-400">{errors.myEmail}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-slate-300">Total Penjaga</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={formData.totalGuardians}
                  className={`mt-1 w-full rounded-2xl border bg-black/60 px-3 py-3 text-sm text-white outline-none transition ${
                    errors.totalGuardians ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-blue-400"
                  }`}
                  onChange={(e) => setFormData({ ...formData, totalGuardians: Number(e.target.value) })}
                />
                {errors.totalGuardians && <p className="mt-1 text-xs text-red-400">{errors.totalGuardians}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-300">Threshold Minimal</label>
                <input
                  type="number"
                  min="2"
                  max={formData.totalGuardians}
                  value={formData.threshold}
                  className={`mt-1 w-full rounded-2xl border bg-black/60 px-3 py-3 text-sm text-white outline-none transition ${
                    errors.threshold ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-blue-400"
                  }`}
                  onChange={(e) => setFormData({ ...formData, threshold: Number(e.target.value) })}
                />
                {errors.threshold && <p className="mt-1 text-xs text-red-400">{errors.threshold}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300">Pesan Rahasia</label>
              <textarea
                required
                rows={4}
                className={`mt-1 w-full rounded-2xl border bg-black/60 px-3 py-3 font-mono text-sm text-white outline-none transition ${
                  errors.secretMessage ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-blue-400"
                }`}
                onChange={(e) => setFormData({ ...formData, secretMessage: e.target.value })}
              />
              {errors.secretMessage && <p className="mt-1 text-xs text-red-400">{errors.secretMessage}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 py-3 text-base font-semibold shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? "Menghitung Polinomial..." : "Enkripsi & Pecah Kunci"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

