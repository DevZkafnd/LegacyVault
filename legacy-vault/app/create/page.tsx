// src/app/create/page.tsx
"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { generateMasterKey, encryptData, generateShamirShares } from "@/lib/crypto";
import { RiUserAddFill, RiArrowLeftLine, RiFileCopyLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import EnhancedVaultAnimation from "@/components/EnhancedVaultAnimation";
import EnhancedCinematicLoader from "@/components/EnhancedCinematicLoader";
import Link from "next/link";
import VaultDoor from "@/components/VaultDoor";
import ToastContainer from "@/components/Toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateVault() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    myEmail: "",
    secretMessage: "",
    totalGuardians: 3,
    threshold: 2
  });
  const [loading, setLoading] = useState(false);
  const [shares, setShares] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLoader, setShowLoader] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!emailRegex.test(formData.myEmail.trim())) {
      newErrors.myEmail = t('validEmail');
    }
    
    if (formData.secretMessage.trim().length === 0) {
      newErrors.secretMessage = t('messageRequired');
    } else if (formData.secretMessage.trim().length < 10) {
      newErrors.secretMessage = t('minLength', { min: '10' });
    } else if (formData.secretMessage.trim().length > 2000) {
      newErrors.secretMessage = t('maxLength', { max: '2000' });
    }
    
    if (formData.totalGuardians < 2 || formData.totalGuardians > 10) {
      newErrors.totalGuardians = t('validGuardiansRange');
    }
    
    if (formData.threshold < 2 || formData.threshold > formData.totalGuardians) {
      newErrors.threshold = t('thresholdError');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setShowLoader(true);

    try {
      // 1. Generate & Enkripsi
      const masterKey = await generateMasterKey();
      const { encryptedBlob } = await encryptData(formData.secretMessage, masterKey);
      
      // 2. SHAMIR SPLIT (Algoritma Baru)
      const generatedShares = await generateShamirShares(
        masterKey, 
        formData.totalGuardians, 
        formData.threshold
      );

      // 3. Simpan ke Firebase (True Zero Knowledge)
      await addDoc(collection(db, "vaults"), {
        user_email: formData.myEmail,
        encrypted_data: encryptedBlob,
        total_shares: formData.totalGuardians,
        threshold: formData.threshold,
        status: "ACTIVE",
        created_at: new Date()
      });

      // 4. Tampilkan Shares ke User
      setTimeout(() => {
        setShares(generatedShares);
        setShowLoader(false);
        setLoading(false);
      }, 3000);
      
    } catch (error) {
      console.error(error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lv-toast', { detail: { kind: 'error', message: t('failedCreateVault') } }));
      }
      setLoading(false);
      setShowLoader(false);
    }
  };

  if (shares.length > 0) {
    return (
      <main className="min-h-screen relative" style={{
        background: 'linear-gradient(135deg, var(--iron-black) 0%, var(--antique-steel) 60%, var(--old-vault) 100%)'
      }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 -translate-y-12 sm:-translate-y-14">
          <div className="w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-radial from-amber-400/10 via-amber-300/6 to-transparent blur-3xl border border-amber-500/20"></div>
        </div>
        <VaultDoor size={460} color="#D4AF37" />
        {/* Language Selector */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSelector />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border border-gray-500 rounded-lg transition-all duration-200 shadow-lg shadow-black/20">
              <RiArrowLeftLine className="text-gray-300" />
              <span className="text-sm text-gray-200">{t('back')}</span>
            </button>
          </Link>
        </div>
        
        <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 p-6 sm:p-12 pt-20">
          <div className="text-center">
            <div className="relative mb-8 sm:mb-10 cinematic-entrance">
              <EnhancedVaultAnimation isSuccess={true} size="lg" showMechanism={true} />
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl mb-4 bg-gradient-to-r from-yellow-500 to-amber-400 bg-clip-text text-transparent cinematic-entrance">
              {t('vaultCreated')}
            </h1>
          </div>

          <div className="vault-card rounded-2xl p-8 mt-6 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-sm">
            <p className="mb-6 text-gray-300 text-center leading-relaxed">
              {t('shareInstructions', { threshold: formData.threshold.toString(), total: formData.totalGuardians.toString() })}
              <br/>
              {t('distributeShares', { total: formData.totalGuardians.toString() })}
            </p>
            
            <div className="grid gap-4">
              {shares.map((share, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-600 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <RiUserAddFill className="text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-400">
                      {t('guardian')} #{index + 1}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      readOnly 
                      value={share}
                      className="flex-1 bg-black/70 border border-gray-700 p-3 rounded-lg font-mono text-yellow-400 text-sm focus:outline-none focus:border-yellow-500"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(share);
                        setCopiedIndex(index);
                        setTimeout(() => setCopiedIndex(null), 2000);
                      }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg ${
                        copiedIndex === index 
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-900/50' 
                          : 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white shadow-green-900/30'
                      }`}
                    >
                      <RiFileCopyLine />
                      {copiedIndex === index ? t('copied') : t('copy')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              className="mt-8 w-full py-4 steel-btn rounded-xl font-medium transition-all duration-200"
            >
              {t('createAnother')}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, var(--iron-black) 0%, var(--antique-steel) 60%, var(--old-vault) 100%)'
    }}>
      <ToastContainer />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 -translate-y-8 sm:-translate-y-10">
        <div className="w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-radial from-amber-400/10 via-amber-300/6 to-transparent blur-3xl border border-amber-500/20"></div>
      </div>
      <VaultDoor size={460} color="#D4AF37" />
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

      <motion.section className="relative z-20 mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8 p-4 sm:p-12 pt-20 sm:pt-24"
        initial={{ x: '-100%', opacity: 0.9 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="text-center">
          <div className="mb-6 sm:mb-8 cinematic-entrance">
            <div className="scale-90 sm:scale-100">
              <EnhancedVaultAnimation size="lg" showMechanism={false} minimal={true} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-amber-400 bg-clip-text text-transparent cinematic-entrance">
            {t('createCouncil')}
          </h1>
          <p className="text-gray-400 mb-8 cinematic-entrance">{t('shamirProtocol')}</p>
        </div>
        
        <motion.form 
          onSubmit={handleCreate} 
          className="w-full max-w-md space-y-5 sm:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div>
            <label className="block text-sm mb-2 text-gray-300 font-medium">{t('yourEmail')}</label>
            <input 
              type="email" 
              required
              value={formData.myEmail}
              className={`w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border ${
                errors.myEmail ? 'border-red-500' : 'border-gray-600'
              } text-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200`}
              onChange={(e) => {
                setFormData({...formData, myEmail: e.target.value});
                if (errors.myEmail) setErrors({...errors, myEmail: ''});
              }}
            />
            {errors.myEmail && <p className="text-red-400 text-sm mt-1">{errors.myEmail}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-300 font-medium">{t('totalGuardians')}</label>
              <input 
                type="number" 
                min="2" 
                max="10" 
                value={formData.totalGuardians}
                className={`w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border ${
                  errors.totalGuardians ? 'border-red-500' : 'border-gray-600'
                } text-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200`}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({...formData, totalGuardians: value});
                  if (errors.totalGuardians) setErrors({...errors, totalGuardians: ''});
                }}
              />
              {errors.totalGuardians && <p className="text-red-400 text-sm mt-1">{errors.totalGuardians}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300 font-medium">{t('thresholdNeeded')}</label>
              <input 
                type="number" 
                min="2" 
                max={formData.totalGuardians} 
                value={formData.threshold}
                className={`w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border ${
                  errors.threshold ? 'border-red-500' : 'border-gray-600'
                } text-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200`}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({...formData, threshold: value});
                  if (errors.threshold) setErrors({...errors, threshold: ''});
                }}
              />
              {errors.threshold && <p className="text-red-400 text-sm mt-1">{errors.threshold}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300 font-medium">{t('secretMessage')}</label>
            <textarea 
              required 
              rows={5}
              value={formData.secretMessage}
              className={`w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border ${
                errors.secretMessage ? 'border-red-500' : 'border-gray-600'
              } text-gray-200 font-mono focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200 resize-none`}
              placeholder={t('secretPlaceholder')}
              onChange={(e) => {
                setFormData({...formData, secretMessage: e.target.value});
                if (errors.secretMessage) setErrors({...errors, secretMessage: ''});
              }}
            />
            {errors.secretMessage && <p className="text-red-400 text-sm mt-1">{errors.secretMessage}</p>}
            <p className="text-gray-500 text-xs mt-1">{formData.secretMessage.length}/2000 {t('charactersCount')}</p>
          </div>

          <motion.button 
            type="submit" 
            disabled={loading}
          className="w-full gold-btn font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
            whileHover={!loading ? { 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(217, 119, 6, 0.4)"
            } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            animate={loading ? {
              scale: [1, 1.02, 1],
            } : {}}
            transition={loading ? {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            } : {}}
          >
            <span className="relative z-10">
              {loading ? t('calculating') : t('encryptAndSplit')}
            </span>
            {!loading && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7 }}
              />
            )}
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Cinematic Loader */}
      <EnhancedCinematicLoader 
        isVisible={showLoader} 
        message={t('calculating')}
        onComplete={() => {
          setShowLoader(false);
        }}
      />
    </main>
  );
}
