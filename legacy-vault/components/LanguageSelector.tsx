"use client";
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/languages';
import { RiGlobalLine, RiArrowDownSLine, RiSearchLine } from 'react-icons/ri';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);
  
  const filteredLanguages = availableLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const id = setTimeout(() => setHydrated(true), 0);
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearTimeout(id);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border border-gray-500 rounded-lg transition-all duration-200 shadow-lg shadow-black/20"
      >
        <RiGlobalLine className="text-gray-300" />
        <span className="text-sm font-medium text-gray-200" suppressHydrationWarning>
          {hydrated ? `${currentLang?.flag} ${currentLang?.nativeName}` : 'Language'}
        </span>
        <RiArrowDownSLine className={`text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600 rounded-xl shadow-2xl shadow-black/40 z-50 backdrop-blur-sm">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchLanguages')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-150 ${
                    currentLanguage === lang.code 
                      ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 border-l-4 border-blue-500' 
                      : ''
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-200 truncate">
                      {lang.nativeName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {lang.name}
                    </div>
                  </div>
                  {currentLanguage === lang.code && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-400">
                {t('noLanguagesFound')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
