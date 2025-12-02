"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { recoverShamirKey, decryptData } from "@/lib/crypto";
import { RiShieldCheckFill, RiArrowLeftLine, RiSearchLine } from "react-icons/ri";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import EnhancedVaultAnimation from "@/components/EnhancedVaultAnimation";
import EnhancedCinematicLoader from "@/components/EnhancedCinematicLoader";
import Link from "next/link";
import VaultDoor from "@/components/VaultDoor";
import SecurityScanOverlay from "@/components/SecurityScanOverlay";
import ToastContainer from "@/components/Toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type VaultDoc = {
  encrypted_data: string;
  threshold: number;
};
type RawVaultDoc = {
  encrypted_data: string;
  threshold: number;
  created_at?: Timestamp;
};
type VaultOption = {
  id: string;
  encrypted_data: string;
  threshold: number;
  created_at?: Timestamp;
};

export default function UnlockVault() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [vaultData, setVaultData] = useState<VaultDoc | null>(null);
  const [inputShares, setInputShares] = useState<string[]>([]);
  const [shareErrors, setShareErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "selecting_vault" | "collecting_keys" | "decrypting" | "success">("idle");
  const [secretMessage, setSecretMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [vaultOptions, setVaultOptions] = useState<VaultOption[]>([]);

  // Tahap 1: Cari Vault dulu
  const handleFindVault = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailRegex.test(email.trim())) {
      setEmailError(t('validEmail'));
      return;
    }
    
    setStatus("searching");
    setEmailError("");
    
    try {
      const q = query(collection(db, "vaults"), where("user_email", "==", email.trim()));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error(t('vaultNotFound'));
      }
      const options: VaultOption[] = querySnapshot.docs.map((d) => {
        const v = d.data() as RawVaultDoc;
        return {
          id: d.id,
          encrypted_data: v.encrypted_data,
          threshold: v.threshold,
          created_at: v.created_at,
        };
      });
      const sorted = options.sort((a, b) => {
        const ad = a.created_at?.toDate ? a.created_at.toDate().getTime() : 0;
        const bd = b.created_at?.toDate ? b.created_at.toDate().getTime() : 0;
        return bd - ad;
      });
      setVaultOptions(sorted);
      if (sorted.length === 1) {
        const only = sorted[0];
        setVaultData({ encrypted_data: only.encrypted_data, threshold: only.threshold });
        setInputShares(new Array(only.threshold).fill(""));
        setShareErrors(new Array(only.threshold).fill(""));
        setStatus("collecting_keys");
      } else {
        setStatus("selecting_vault");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lv-toast', { detail: { kind: 'error', message } }));
      }
      setStatus("idle");
    }
  };

  // Tahap 2: Proses Penyatuan Kunci
  const handleCombineAndDecrypt = async () => {
    if (!validateShares()) return;
    
    setStatus("decrypting");
    setShowLoader(true);
    setIsUnlocking(true);
    
    try {
      // Add delay for cinematic effect
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const masterKey = await recoverShamirKey(inputShares);
      if (!vaultData) throw new Error("Vault data not found");
      const message = await decryptData(vaultData.encrypted_data, masterKey);
      
      setSecretMessage(message);
      setShowLoader(false);
      setIsUnlocking(false);
      setStatus("success");
    } catch (error) {
      console.error(error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lv-toast', { detail: { kind: 'error', message: t('decryptionFailed') } }));
      }
      setShowLoader(false);
      setIsUnlocking(false);
      setStatus("collecting_keys");
    }
  };

  const validateShares = () => {
    const newErrors = inputShares.map((share) => 
      share.trim().length === 0 ? t('keyRequired') : ""
    );
    setShareErrors(newErrors);
    return newErrors.every((msg) => msg === "");
  };

  const handleShareInput = (index: number, value: string) => {
    const newShares = [...inputShares];
    newShares[index] = value.trim();
    setInputShares(newShares);
    
    // Clear error for this field
    if (shareErrors[index]) {
      const newErrors = [...shareErrors];
      newErrors[index] = "";
      setShareErrors(newErrors);
    }
  };

  return (
    <main className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, var(--iron-black) 0%, var(--antique-steel) 60%, var(--old-vault) 100%)'
    }}>
      <ToastContainer />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-radial from-amber-400/10 via-amber-300/6 to-transparent blur-3xl border border-amber-500/20"></div>
      </div>
      <VaultDoor size={460} />
      <SecurityScanOverlay active={status === "searching"} />
      {/* Language Selector */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-auto">
        <LanguageSelector />
      </div>
      
      {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 pointer-events-auto">
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border border-gray-500 rounded-lg transition-all duration-200 shadow-lg shadow-black/20">
            <RiArrowLeftLine className="text-gray-300" />
            <span className="text-sm text-gray-200">{t('back')}</span>
          </button>
        </Link>
      </div>

      <section className="relative z-20 mx-auto flex max-w-5xl flex-col gap-8 sm:gap-10 p-4 sm:p-12 pt-16 sm:pt-20">
        <div className="text-center">
          <div className="relative mb-2 pb-4 sm:pb-6 cinematic-entrance">
            <div className="scale-90 sm:scale-100">
              <EnhancedVaultAnimation 
                size="lg" 
                showMechanism={true}
                isUnlocking={isUnlocking}
                isSuccess={status === "success"}
                minimal={true}
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cinematic-entrance">
            {t('councilUnlock')} 🗝️
          </h1>
        </div>

        {/* VIEW 1: HASIL SUKSES */}
        {status === "success" && (
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-xl border-2 border-green-500 rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-green-900/30 success-explosion">
            <div className="relative mb-6">
              <EnhancedVaultAnimation 
                size="lg" 
                showMechanism={false}
                isSuccess={true}
                minimal={true}
              />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-6 cinematic-entrance">
              {t('consensusReached')}
            </h2>
            <div className="bg-black/70 border border-green-600 p-4 sm:p-6 rounded-xl text-base sm:text-xl font-mono text-white whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto scrollbar-steel cinematic-entrance">
              {secretMessage}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border border-gray-500 rounded-lg text-gray-200 transition-all duration-200 cinematic-entrance"
            >
              {t('reset')}
            </button>
          </div>
        )}

        {/* VIEW 2: FORM PENCARIAN */}
        {(status === "idle" || status === "searching") && (
          <div className="vault-card rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleFindVault} className="space-y-6">
              <div>
                <label className="block vault-label font-medium mb-2">
                  {t('enterOwnerEmail')}
                </label>
                <div className="relative">
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    required 
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    className={`vault-input w-full pl-10 pr-4 py-3 text-sm sm:text-base border ${
                      emailError ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg transition-all duration-200`}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                  />
                </div>
                {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
              </div>
              
              <button 
                type="submit" 
                disabled={status === "searching"} 
                className="w-full py-4 sm:py-5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group gold-btn"
              >
                <span className="relative z-10">
                  {status === "searching" ? t('searching') : t('searchVault')}
                </span>
                {status !== "searching" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
              </button>
            </form>
          </div>
        )}

        {status === "selecting_vault" && (
          <div className="vault-card rounded-2xl p-6 sm:p-8">
            <div className="space-y-4">
              {vaultOptions.map((v) => {
                const dt = v.created_at?.toDate ? v.created_at.toDate() : undefined;
                const label = dt ? dt.toISOString() : "Unknown";
                return (
                  <div key={v.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-4 border border-gray-700 rounded-lg bg-black/30">
                    <div className="text-gray-200">
                      <div className="font-semibold">{label}</div>
                      <div className="text-sm">{t('needKeys', { threshold: v.threshold.toString() })}</div>
                    </div>
                    <button
                      onClick={() => {
                        setVaultData({ encrypted_data: v.encrypted_data, threshold: v.threshold });
                        setInputShares(new Array(v.threshold).fill(""));
                        setShareErrors(new Array(v.threshold).fill(""));
                        setStatus("collecting_keys");
                      }}
                      className="px-4 py-2 rounded-lg gold-btn"
                    >
                      {t('vaultFound')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: FORM INPUT KUNCI */}
        {(status === "collecting_keys" || status === "decrypting") && vaultData && (
          <div className="space-y-5 sm:space-y-6">
            <div className="vault-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <RiShieldCheckFill className="text-green-400 text-xl" />
                <p className="text-sm vault-label">{t('vaultFound')}</p>
              </div>
              <p className="font-bold text-[color:var(--royal-gold-glow)]">
                {t('needKeys', { threshold: vaultData.threshold.toString() })}
              </p>
            </div>

            <div className="vault-card rounded-2xl p-6 sm:p-8">
              <div className="space-y-4 mb-6">
                {inputShares.map((_, index) => (
                  <div key={index}>
                    <label className="block text-sm vault-label font-medium mb-2">
                      {t('guardianKey')} #{index + 1}
                    </label>
                    <input 
                      type="text"
                      value={inputShares[index]}
                      className={`vault-input w-full p-3 text-sm sm:text-base rounded-lg border ${
                        shareErrors[index] ? 'border-red-500' : 'border-gray-700'
                      } font-mono text-sm transition-all duration-200`}
                      placeholder={t('pasteKey', { index: (index + 1).toString() })}
                      onChange={(e) => handleShareInput(index, e.target.value)}
                    />
                    {shareErrors[index] && (
                      <p className="text-red-400 text-sm mt-1">{shareErrors[index]}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleCombineAndDecrypt}
                disabled={status === "decrypting"}
                className="w-full py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg relative overflow-hidden group gold-btn"
              >
                <span className="relative z-10">
                  {status === "decrypting" ? t('combining') : t('combineAndOpen')}
                </span>
                {status !== "decrypting" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Cinematic Loader */}
      <EnhancedCinematicLoader 
        isVisible={showLoader} 
        message={t('combining')}
        onComplete={() => {
          setShowLoader(false);
        }}
      />
    </main>
  );
}
