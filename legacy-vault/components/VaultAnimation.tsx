"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import { RiSafe2Fill, RiShieldKeyholeFill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri';

interface VaultAnimationProps {
  isUnlocking?: boolean;
  isSuccess?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMechanism?: boolean;
}

export default function VaultAnimation({ 
  isUnlocking = false, 
  isSuccess = false, 
  size = 'lg',
  showMechanism = true 
}: VaultAnimationProps) {
  const { t } = useLanguage();
  const animationPhase: 'idle' | 'unlocking' | 'success' = isSuccess ? 'success' : isUnlocking ? 'unlocking' : 'idle';
  
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl', 
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  

  return (
    <div className="relative flex items-center justify-center pt-6 pb-12">
      {/* Main Vault Icon */}
      <div className={`relative z-10 ${sizeClasses[size]} transition-all duration-1000`}>
        <RiSafe2Fill 
          className={`
            text-yellow-600 transition-all duration-1000
            ${animationPhase === 'idle' ? 'vault-glow vault-breathing' : ''}
            ${animationPhase === 'unlocking' ? 'vault-unlocking' : ''}
            ${animationPhase === 'success' ? 'success-explosion text-green-400' : ''}
          `}
        />
        
        {/* Lock Mechanism */}
        {showMechanism && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {animationPhase === 'unlocking' ? (
              <RiShieldKeyholeFill 
                className={`text-2xl text-amber-400 vault-mechanism-spinning`}
              />
            ) : animationPhase === 'success' ? (
              <RiLockUnlockFill 
                className="text-2xl text-green-400 animate-bounce"
              />
            ) : (
              <RiLockFill 
                className="text-2xl text-red-400 animate-pulse"
              />
            )}
          </div>
        )}
      </div>

      {/* Cinematic Light Rays */}
      {animationPhase === 'success' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-70"
              style={{
                height: '200px',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                transformOrigin: 'center',
                animation: `vault-glow 2s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Particle Effects */}
      {animationPhase === 'success' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-80"
              style={{
                top: '50%',
                left: '50%',
                animation: `success-explosion 2s ease-out infinite ${i * 0.1}s`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${50 + i * 10}px)`
              }}
            />
          ))}
        </div>
      )}

      {/* Status Indicator */}
      <div className="mt-4 relative z-20">
        <div className={` mx-auto text-center
          px-3 py-1 rounded-full text-xs font-medium transition-all duration-500
          ${animationPhase === 'idle' ? 'bg-gray-700 text-gray-300' : ''}
          ${animationPhase === 'unlocking' ? 'bg-yellow-700 text-yellow-200 animate-pulse' : ''}
          ${animationPhase === 'success' ? 'bg-green-700 text-green-200' : ''}
        `}>
          {animationPhase === 'idle' && `🔒 ${t('securityProtocol')}`}
          {animationPhase === 'unlocking' && `🔓 ${t('vaultOpening')}`}
          {animationPhase === 'success' && `✅ ${t('accessGranted')}`}
        </div>
      </div>
    </div>
  );
}
