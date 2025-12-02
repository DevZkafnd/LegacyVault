"use client";
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CinematicLoaderProps {
  isVisible: boolean;
  message?: string;
  onComplete?: () => void;
}

export default function CinematicLoader({ isVisible, message, onComplete }: CinematicLoaderProps) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message || t('vaultOpening'));
  
  const loadingMessages = useMemo(() => ([
    t('securityProtocol'),
    t('encryptionActive'),
    t('vaultOpening'),
    t('accessGranted')
  ]), [t]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
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
          }, 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, onComplete, loadingMessages]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="text-center space-y-8">
        {/* Vault Door Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-yellow-600/30 rounded-full"></div>
            
            {/* Progress Ring */}
            <div 
              className="absolute inset-0 border-4 border-yellow-500 rounded-full transition-all duration-300"
              style={{
                background: `conic-gradient(from 0deg, #eab308 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
              }}
            ></div>
            
            {/* Center Mechanism */}
            <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-yellow-600/50 flex items-center justify-center">
              <div 
                className="w-8 h-8 border-2 border-yellow-400 rounded-full"
                style={{
                  transform: `rotate(${progress * 3.6}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="w-1 h-4 bg-yellow-400 mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Light Beams */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-t from-transparent via-yellow-400/50 to-transparent"
                style={{
                  height: '150px',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                  opacity: progress > i * 16.67 ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-600">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 to-amber-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span>
            <span className="font-mono">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="space-y-2">
          <p className="text-yellow-400 font-medium text-lg typing-cursor">
            {currentMessage}
          </p>
          
          {/* Scanning Lines Effect */}
          <div className="relative w-80 h-1 mx-auto bg-gray-800 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-pulse"></div>
            <div 
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              style={{
                animation: 'steel-shimmer 2s infinite',
                transform: `translateX(${(progress / 100) * 300}px)`
              }}
            ></div>
          </div>
        </div>

        {/* Security Indicators */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className={`flex items-center space-x-1 ${progress > 20 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span>{t('aes256')}</span>
          </div>
          <div className={`flex items-center space-x-1 ${progress > 50 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span>{t('shamirSSS')}</span>
          </div>
          <div className={`flex items-center space-x-1 ${progress > 80 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span>{t('zeroKnowledge')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
