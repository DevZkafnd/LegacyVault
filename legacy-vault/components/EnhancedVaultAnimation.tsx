"use client";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RiSafe2Fill, RiShieldKeyholeFill, RiLockFill, RiLockUnlockFill, RiKeyFill } from 'react-icons/ri';

interface EnhancedVaultAnimationProps {
  isUnlocking?: boolean;
  isSuccess?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMechanism?: boolean;
}

export default function EnhancedVaultAnimation({ 
  isUnlocking = false, 
  isSuccess = false, 
  size = 'lg',
  showMechanism = true 
}: EnhancedVaultAnimationProps) {
  const { t } = useLanguage();
  const [reduceMotion, setReduceMotion] = useState(false);
  const animationPhase: 'idle' | 'unlocking' | 'success' = isSuccess ? 'success' : isUnlocking ? 'unlocking' : 'idle';
  const particles = useMemo(() => {
    if (animationPhase !== 'success') return [] as Array<{id: number, x: number, y: number}>;
    return Array.from({length: reduceMotion ? 8 : 20}, (_, i) => ({
      id: i,
      x: ((i * 73) % 401) - 200,
      y: ((i * 127) % 401) - 200
    }));
  }, [animationPhase, reduceMotion]);
  
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl', 
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const vaultVariants: Variants = {
    idle: {
      scale: 1,
      rotate: 0,
      filter: "hue-rotate(0deg) brightness(1)",
      transition: {
        duration: reduceMotion ? 0.8 : 2,
        repeat: reduceMotion ? 0 : Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    unlocking: {
      scale: [1, 1.1, 1.2, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      filter: [
        "hue-rotate(0deg) brightness(1)",
        "hue-rotate(90deg) brightness(1.2)",
        "hue-rotate(180deg) brightness(1.4)",
        "hue-rotate(270deg) brightness(1.2)",
        "hue-rotate(360deg) brightness(1)"
      ],
      transition: {
        duration: reduceMotion ? 1.5 : 3,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    },
    success: {
      scale: [1, 1.3, 1],
      rotate: 360,
      filter: "hue-rotate(120deg) brightness(1.5)",
      transition: {
        duration: reduceMotion ? 1 : 2,
        ease: "backOut"
      }
    }
  };

  const mechanismVariants: Variants = {
    idle: {
      rotate: 0,
      scale: 1,
      opacity: 0.8
    },
    unlocking: {
      rotate: 360,
      scale: [1, 1.2, 1],
      opacity: 1,
      transition: {
        rotate: {
          duration: reduceMotion ? 1.2 : 3,
          ease: "linear",
          repeat: reduceMotion ? 0 : Infinity
        },
        scale: {
          duration: reduceMotion ? 0.3 : 0.5,
          repeat: reduceMotion ? 0 : Infinity,
          repeatType: "reverse" as const
        }
      }
    },
    success: {
      rotate: 0,
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  

  return (
    <div className="relative flex items-center justify-center">
      {/* Main Vault Icon with Enhanced Animation */}
      <motion.div 
        className={`relative ${sizeClasses[size]} transition-all duration-1000`}
        variants={vaultVariants}
        animate={animationPhase}
        initial="idle"
      >
        <motion.div
          animate={{
            textShadow: animationPhase === 'success' 
              ? ["0 0 20px #fbbf24", "0 0 40px #f59e0b", "0 0 20px #fbbf24"]
              : animationPhase === 'unlocking'
              ? ["0 0 10px #fbbf24", "0 0 30px #f59e0b", "0 0 10px #fbbf24"]
              : "0 0 10px #fbbf24"
          }}
          transition={{
            duration: reduceMotion ? 0.8 : 2,
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: "reverse"
          }}
        >
          <RiSafe2Fill 
            className={`
              ${animationPhase === 'idle' ? 'text-yellow-600' : ''}
              ${animationPhase === 'unlocking' ? 'text-amber-500' : ''}
              ${animationPhase === 'success' ? 'text-green-400' : ''}
            `}
          />
        </motion.div>
        
        {/* Enhanced Lock Mechanism */}
        {showMechanism && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={mechanismVariants}
            animate={animationPhase}
            initial="idle"
          >
            <AnimatePresence mode="wait">
              {animationPhase === 'unlocking' && (
                <motion.div
                  key="unlocking"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <RiShieldKeyholeFill className="text-2xl text-amber-400" />
                </motion.div>
              )}
              {animationPhase === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <RiLockUnlockFill className="text-2xl text-green-400" />
                </motion.div>
              )}
              {animationPhase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <RiLockFill className="text-2xl text-red-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Light Rays */}
      <AnimatePresence>
        {animationPhase === 'success' && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent via-yellow-400 to-transparent"
                style={{
                  height: '200px',
                  transformOrigin: 'center bottom'
                }}
                initial={{
                  rotate: i * 30,
                  scaleY: 0,
                  opacity: 0,
                  x: '-50%',
                  y: '-100%'
                }}
                animate={{
                  rotate: i * 30,
                  scaleY: 1,
                  opacity: [0, 1, 0.7, 1, 0],
                  x: '-50%',
                  y: '-100%'
                }}
                transition={{
                  duration: reduceMotion ? 1.2 : 3,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Particle Effects */}
      <AnimatePresence>
        {animationPhase === 'success' && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                style={{
                  top: '50%',
                  left: '50%'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, particle.x],
                  y: [0, particle.y]
                }}
                transition={{
                  duration: reduceMotion ? 1 : 2,
                  ease: 'easeOut'
                }}
                exit={{ scale: 0, opacity: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Keys Animation */}
      <AnimatePresence>
        {animationPhase === 'unlocking' && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 100,
                  y: Math.sin(i * 60 * Math.PI / 180) * 100,
                  opacity: 0,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 150,
                  y: Math.sin(i * 60 * Math.PI / 180) * 150,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: reduceMotion ? 0.8 : 2,
                  delay: i * 0.2,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <RiKeyFill className="text-xl text-amber-400" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Status Indicator */}
      <motion.div 
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className={`
            px-4 py-2 rounded-full text-sm font-medium border-2 backdrop-blur-sm
            ${animationPhase === 'idle' ? 'bg-gray-800/80 text-gray-300 border-gray-600' : ''}
            ${animationPhase === 'unlocking' ? 'bg-yellow-800/80 text-yellow-200 border-yellow-600' : ''}
            ${animationPhase === 'success' ? 'bg-green-800/80 text-green-200 border-green-600' : ''}
          `}
          animate={{
            scale: animationPhase === 'unlocking' ? [1, 1.05, 1] : 1,
            boxShadow: animationPhase === 'success' 
              ? ["0 0 20px rgba(34, 197, 94, 0.5)", "0 0 40px rgba(34, 197, 94, 0.8)", "0 0 20px rgba(34, 197, 94, 0.5)"]
              : "0 0 10px rgba(0, 0, 0, 0.3)"
          }}
          transition={{
            duration: reduceMotion ? 0.6 : 1,
            repeat: animationPhase === 'unlocking' ? (reduceMotion ? 0 : Infinity) : 0,
            repeatType: "reverse"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={animationPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {animationPhase === 'idle' && `🔒 ${t('securityProtocol')}`}
              {animationPhase === 'unlocking' && `🔓 ${t('vaultOpening')}`}
              {animationPhase === 'success' && `✅ ${t('accessGranted')}`}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Ripple Effect */}
      <AnimatePresence>
        {animationPhase === 'success' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 border-2 border-green-400 rounded-full"
                initial={{
                  width: 0,
                  height: 0,
                  x: '-50%',
                  y: '-50%',
                  opacity: 1
                }}
                animate={{
                  width: 300 + i * 100,
                  height: 300 + i * 100,
                  x: '-50%',
                  y: '-50%',
                  opacity: 0
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
