"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedCinematicLoaderProps {
  isVisible: boolean;
  message?: string;
  onComplete?: () => void;
}

export default function EnhancedCinematicLoader({ isVisible, message, onComplete }: EnhancedCinematicLoaderProps) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message || t('vaultOpening'));
  const [supportsConic, setSupportsConic] = useState(true);
  const scanLines = useMemo(() => Array.from({length: 8}, (_, i) => ({ id: i, delay: i * 0.2 })), []);
  const loadingMessages = useMemo(() => ([
    t('securityProtocol'),
    t('encryptionActive'),
    t('vaultOpening'),
    t('accessGranted')
  ]), [t]);

  useEffect(() => {
    try {
      const ok = typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('background', 'conic-gradient(from 0deg, #000 0deg, transparent 0deg)');
      setTimeout(() => setSupportsConic(!!ok), 0);
    } catch {
      setTimeout(() => setSupportsConic(false), 0);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 12 + 3;
        
        // Change message based on progress
        if (newProgress > 25 && newProgress < 50) {
          setCurrentMessage(loadingMessages[1]);
        } else if (newProgress > 50 && newProgress < 75) {
          setCurrentMessage(loadingMessages[2]);
        } else if (newProgress > 75) {
          setCurrentMessage(loadingMessages[3]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 1500);
          return 100;
        }
        
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isVisible, onComplete, loadingMessages]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-8 sm:space-y-12 px-4">
          {/* Enhanced Vault Door Animation */}
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto relative">
              {/* Outer Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-${i * 2} border-2 rounded-full`}
                  style={{
                    borderColor: i === 0 ? '#eab308' : i === 1 ? '#f59e0b' : '#d97706'
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.3
                    }
                  }}
                />
              ))}
              
              {/* Progress Ring */}
              <motion.div 
                className="absolute inset-4 rounded-full overflow-hidden"
                style={supportsConic ? {
                  background: `conic-gradient(from 0deg, #eab308 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
                } : {
                  border: '2px solid rgba(234,179,8,0.5)'
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px #eab308)",
                    "drop-shadow(0 0 20px #f59e0b)",
                    "drop-shadow(0 0 10px #eab308)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Center Mechanism */}
              <motion.div 
                className="absolute inset-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full border-2 border-yellow-600/50 flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(234, 179, 8, 0.3)",
                    "inset 0 0 40px rgba(245, 158, 11, 0.5)",
                    "inset 0 0 20px rgba(234, 179, 8, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.div 
                  className="w-12 h-12 border-2 border-yellow-400 rounded-full relative"
                  animate={{
                    rotate: progress * 3.6
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className="w-1 h-6 bg-yellow-400 mx-auto"></div>
                  <motion.div
                    className="absolute inset-0 border border-yellow-300 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Enhanced Light Beams */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent via-yellow-400/60 to-transparent"
                  style={{
                    height: '200px',
                    transformOrigin: 'center bottom'
                  }}
                  initial={{
                    rotate: i * 45,
                    scaleY: 0,
                    opacity: 0,
                    x: '-50%',
                    y: '-100%'
                  }}
                  animate={{
                    rotate: i * 45,
                    scaleY: progress > i * 12.5 ? 1 : 0,
                    opacity: progress > i * 12.5 ? [0, 1, 0.7] : 0,
                    x: '-50%',
                    y: '-100%'
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    repeat: progress > i * 12.5 ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{ top: '50%', left: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 0.3, scale: 0.5 }}
                  animate={{
                    x: Math.cos(i * 30 * Math.PI / 180) * 80,
                    y: Math.sin(i * 30 * Math.PI / 180) * 80,
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Progress Bar */}
          <motion.div 
            className="w-72 sm:w-96 mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-600 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 relative"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mt-2 sm:mt-3">
              <span>0%</span>
              <motion.span 
                className="font-mono text-yellow-400"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {Math.round(progress)}%
              </motion.span>
              <span>100%</span>
            </div>
          </motion.div>

          {/* Enhanced Status Message */}
          <motion.div 
            className="space-y-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                className="text-yellow-400 font-medium text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {currentMessage}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  |
                </motion.span>
              </motion.p>
            </AnimatePresence>
            
            {/* Scanning Lines Effect */}
            <div className="relative w-72 sm:w-96 h-2 mx-auto bg-gray-800 rounded overflow-hidden">
              {scanLines.map((line) => (
                <motion.div
                  key={line.id}
                  className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                  initial={{ x: -32 }}
                  animate={{ x: 400 }}
                  transition={{
                    duration: 3,
                    delay: line.delay,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Security Indicators */}
          <motion.div 
            className="flex justify-center space-x-6 sm:space-x-8 text-xs sm:text-sm"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { name: t('aes256'), threshold: 20 },
              { name: t('shamirSSS'), threshold: 50 },
              { name: t('zeroKnowledge'), threshold: 80 }
            ].map((item) => (
              <motion.div
                key={item.name}
                className={`flex items-center space-x-2 ${
                  progress > item.threshold ? 'text-green-400' : 'text-gray-500'
                }`}
                animate={{
                  scale: progress > item.threshold ? [1, 1.1, 1] : 1
                }}
                transition={{
                  duration: 0.5,
                  repeat: progress > item.threshold ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <motion.div 
                  className={`w-3 h-3 rounded-full border-2 ${
                    progress > item.threshold 
                      ? 'bg-green-400 border-green-400' 
                      : 'bg-transparent border-gray-500'
                  }`}
                  animate={{
                    boxShadow: progress > item.threshold 
                      ? ["0 0 5px #22c55e", "0 0 15px #16a34a", "0 0 5px #22c55e"]
                      : "none"
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
