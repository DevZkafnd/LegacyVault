"use client";
import React, { createContext, useContext, useState } from 'react';
import { translations, TranslationKey, Language, languages } from '@/lib/languages';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('legacyvault-language') : null;
    return saved && translations[saved as keyof typeof translations] ? saved : 'id';
  });

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('legacyvault-language', lang);
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    let text = langTranslations[key] || translations.en[key] || key;
    
    // Replace parameters in text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
