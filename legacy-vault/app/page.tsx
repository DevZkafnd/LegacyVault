"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import EnhancedVaultAnimation from "@/components/EnhancedVaultAnimation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ToastContainer from "@/components/Toast";

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  const [zoomUnlock, setZoomUnlock] = useState(false);
  const [zoomCreate, setZoomCreate] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, var(--iron-black) 0%, var(--antique-steel) 60%, var(--old-vault) 100%)'
    }}>
      <ToastContainer />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-radial from-amber-400/10 via-amber-300/6 to-transparent blur-3xl border border-amber-500/20"></div>
      </div>
      {/* Language Selector */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-auto">
        <LanguageSelector />
      </div>

      {/* Steel Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-radial from-yellow-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-radial from-amber-500/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-radial from-orange-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Steel Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(184, 184, 189, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184, 184, 189, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      <motion.div 
        className="relative z-20 flex w-full max-w-6xl flex-col items-center justify-center min-h-screen mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: zoomUnlock ? 1.15 : zoomCreate ? 1.05 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Steel Vault Icon */}
        <motion.div 
          className="relative mb-8"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "backOut",
            delay: 0.2 
          }}
        >
          <div className="scale-90 sm:scale-100">
            <EnhancedVaultAnimation size="xl" showMechanism={false} minimal={true} />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-[color:var(--royal-gold-glow)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          {t('title')}
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-xl lg:text-2xl text-[color:var(--soft-pewter)] mb-3 sm:mb-4 max-w-4xl leading-relaxed font-serif px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          {'\u201C'}{t('subtitle')}{'\u201D'}
        </motion.p>
        
        <motion.p 
          className="text-sm sm:text-lg text-[color:var(--old-silver)] mb-8 sm:mb-12 max-w-3xl leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
        >
          {t('description')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg px-2 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link href="/create" className="flex-1" prefetch={false}>
            <motion.button 
              className="group w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 relative overflow-hidden gold-btn"
              whileHover={{ 
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                setZoomCreate(true);
                setTimeout(() => router.push("/create"), 400);
              }}
            >
              <span className="relative z-10">{t('createVault')}</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7 }}
              />
            </motion.button>
          </Link>
          <Link href="/unlock" className="flex-1" prefetch={false}>
            <motion.button 
              className="group w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 relative overflow-hidden steel-btn"
              whileHover={{ 
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                setZoomUnlock(true);
                setTimeout(() => router.push("/unlock"), 400);
              }}
            >
              <span className="relative z-10">{t('iAmHeir')}</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7 }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Steel Decorative Elements */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-yellow-600' : i === 1 ? 'bg-amber-500' : 'bg-orange-600'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
