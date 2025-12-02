// lib/languages.ts
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', flag: '🇮🇩' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
];

export const translations = {
  id: {
    // Navigation
    back: "Kembali",
    home: "Beranda",
    
    // Home Page
    title: "LegacyVault",
    subtitle: "Jangan Biarkan Data Anda Mati Bersama Anda",
    description: "Sistem pewarisan aset digital otomatis dengan keamanan Zero-Knowledge.",
    createVault: "Buat Vault Baru",
    iAmHeir: "Saya Ahli Waris",
    
    // Create Page
    createCouncil: "Buat Council Vault",
    shamirProtocol: "Protokol Shamir's Secret Sharing",
    yourEmail: "Email Anda",
    totalGuardians: "Total Penjaga",
    thresholdNeeded: "Butuh Berapa?",
    secretMessage: "Pesan Rahasia",
    encryptAndSplit: "Enkripsi & Pecah Kunci",
    calculating: "Menghitung Polinomial...",
    secretPlaceholder: "Masukkan pesan rahasia, private key, atau informasi penting...",
    charactersCount: "karakter",
    
    // Success Page
    vaultCreated: "Vault Council Berhasil Dibuat!",
    shareInstructions: "Vault ini membutuhkan {threshold} dari {total} kode untuk dibuka.",
    distributeShares: "Bagikan kode di bawah ini ke {total} orang berbeda (Guardians).",
    guardian: "Guardian",
    copy: "Salin",
    copied: "Tersalin!",
    createAnother: "Buat Lagi",
    
    // Unlock Page
    councilUnlock: "Pembukaan Council",
    enterOwnerEmail: "Masukkan Email Pemilik Vault",
    searchVault: "Cari Vault",
    searching: "Mencari...",
    vaultFound: "Vault Ditemukan!",
    needKeys: "Butuh {threshold} Kunci Guardian.",
    guardianKey: "Kunci Guardian",
    pasteKey: "Paste kode kunci ke-{index}",
    combineAndOpen: "GABUNGKAN & BUKA",
    combining: "Menggabungkan Kunci...",
    consensusReached: "KONSENSUS TERCAPAI!",
    reset: "Reset",
    
    // Validation
    validEmail: "Masukkan email yang valid.",
    messageRequired: "Pesan rahasia wajib diisi.",
    minLength: "Minimal {min} karakter.",
    maxLength: "Maksimal {max} karakter.",
    thresholdError: "Threshold tidak boleh lebih besar dari total guardians!",
    keyRequired: "Kunci wajib diisi.",
    validGuardiansRange: "Total guardian harus antara 2-10.",
    vaultNotFound: "Vault tidak ditemukan untuk email ini.",
    decryptionFailed: "Gagal! Kunci yang dimasukkan salah atau tidak cocok.",
    
    // Animations & Effects
    vaultOpening: "Membuka Vault...",
    accessGranted: "Akses Diberikan",
    securityProtocol: "Protokol Keamanan Aktif",
    encryptionActive: "Enkripsi Aktif",
    emailPlaceholder: "email@contoh.com",
    searchLanguages: "Cari bahasa...",
    noLanguagesFound: "Tidak ada bahasa ditemukan",
    aes256: "AES-256",
    shamirSSS: "Shamir SSS",
    zeroKnowledge: "Zero-Knowledge",
    failedCreateVault: "Gagal membuat vault."
  },
  
  en: {
    // Navigation
    back: "Back",
    home: "Home",
    
    // Home Page
    title: "LegacyVault",
    subtitle: "Don't Let Your Data Die With You",
    description: "Automated digital asset inheritance system with Zero-Knowledge security.",
    createVault: "Create New Vault",
    iAmHeir: "I Am Heir",
    
    // Create Page
    createCouncil: "Create Council Vault",
    shamirProtocol: "Shamir's Secret Sharing Protocol",
    yourEmail: "Your Email",
    totalGuardians: "Total Guardians",
    thresholdNeeded: "How Many Needed?",
    secretMessage: "Secret Message",
    encryptAndSplit: "Encrypt & Split Key",
    calculating: "Calculating Polynomial...",
    secretPlaceholder: "Enter your secret message, private keys, or important information...",
    charactersCount: "characters",
    
    // Success Page
    vaultCreated: "Vault Council Created!",
    shareInstructions: "This vault requires {threshold} out of {total} codes to unlock.",
    distributeShares: "Distribute the codes below to {total} different people (Guardians).",
    guardian: "Guardian",
    copy: "Copy",
    copied: "Copied!",
    createAnother: "Create Another",
    
    // Unlock Page
    councilUnlock: "Council Unlock",
    enterOwnerEmail: "Enter Vault Owner Email",
    searchVault: "Search Vault",
    searching: "Searching...",
    vaultFound: "Vault Found!",
    needKeys: "Need {threshold} Guardian Keys.",
    guardianKey: "Guardian Key",
    pasteKey: "Paste key code #{index}",
    combineAndOpen: "COMBINE & OPEN",
    combining: "Combining Keys...",
    consensusReached: "CONSENSUS REACHED!",
    reset: "Reset",
    
    // Validation
    validEmail: "Enter a valid email.",
    messageRequired: "Secret message is required.",
    minLength: "Minimum {min} characters.",
    maxLength: "Maximum {max} characters.",
    thresholdError: "Threshold cannot be greater than total guardians!",
    keyRequired: "Key is required.",
    validGuardiansRange: "Total guardians must be between 2-10.",
    vaultNotFound: "Vault not found for this email.",
    decryptionFailed: "Failed! The entered keys are wrong or don't match.",
    
    // Animations & Effects
    vaultOpening: "Opening Vault...",
    accessGranted: "Access Granted",
    securityProtocol: "Security Protocol Active",
    encryptionActive: "Encryption Active",
    emailPlaceholder: "email@example.com",
    searchLanguages: "Search languages...",
    noLanguagesFound: "No languages found",
    aes256: "AES-256",
    shamirSSS: "Shamir SSS",
    zeroKnowledge: "Zero-Knowledge",
    failedCreateVault: "Failed to create vault."
  },

  zh: {
    // Navigation
    back: "返回",
    home: "首页",
    
    // Home Page
    title: "LegacyVault",
    subtitle: "不要让您的数据随您而逝",
    description: "具有零知识安全性的自动数字资产继承系统。",
    createVault: "创建新保险库",
    iAmHeir: "我是继承人",
    
    // Create Page
    createCouncil: "创建议会保险库",
    shamirProtocol: "Shamir秘密共享协议",
    yourEmail: "您的邮箱",
    totalGuardians: "守护者总数",
    thresholdNeeded: "需要多少个？",
    secretMessage: "秘密消息",
    encryptAndSplit: "加密并分割密钥",
    calculating: "计算多项式中...",
    secretPlaceholder: "输入您的秘密消息、私钥或重要信息...",
    charactersCount: "字符",
    
    // Success Page
    vaultCreated: "保险库议会已创建！",
    shareInstructions: "此保险库需要 {threshold} 个（共 {total} 个）代码才能解锁。",
    distributeShares: "将以下代码分发给 {total} 个不同的人（守护者）。",
    guardian: "守护者",
    copy: "复制",
    copied: "已复制！",
    createAnother: "创建另一个",
    
    // Unlock Page
    councilUnlock: "议会解锁",
    enterOwnerEmail: "输入保险库所有者邮箱",
    searchVault: "搜索保险库",
    searching: "搜索中...",
    vaultFound: "找到保险库！",
    needKeys: "需要 {threshold} 个守护者密钥。",
    guardianKey: "守护者密钥",
    pasteKey: "粘贴密钥代码 #{index}",
    combineAndOpen: "合并并打开",
    combining: "合并密钥中...",
    consensusReached: "达成共识！",
    reset: "重置",
    
    // Validation
    validEmail: "请输入有效的邮箱。",
    messageRequired: "秘密消息是必需的。",
    minLength: "最少 {min} 个字符。",
    maxLength: "最多 {max} 个字符。",
    thresholdError: "阈值不能大于守护者总数！",
    keyRequired: "密钥是必需的。",
    validGuardiansRange: "守护者总数必须在 2-10 之间。",
    vaultNotFound: "未找到此邮箱的保险库。",
    decryptionFailed: "失败！输入的密钥错误或不匹配。",
    
    // Animations & Effects
    vaultOpening: "正在打开保险库...",
    accessGranted: "访问已授权",
    securityProtocol: "安全协议激活",
    encryptionActive: "加密激活",
    emailPlaceholder: "email@example.com",
    searchLanguages: "搜索语言...",
    noLanguagesFound: "未找到语言",
    aes256: "AES-256",
    shamirSSS: "Shamir SSS",
    zeroKnowledge: "零知识",
    failedCreateVault: "创建保险库失败。"
  },

  es: {
    // Navigation
    back: "Atrás",
    home: "Inicio",
    
    // Home Page
    title: "LegacyVault",
    subtitle: "No Dejes Que Tus Datos Mueran Contigo",
    description: "Sistema automatizado de herencia de activos digitales con seguridad Zero-Knowledge.",
    createVault: "Crear Nueva Bóveda",
    iAmHeir: "Soy Heredero",
    
    // Create Page
    createCouncil: "Crear Bóveda del Consejo",
    shamirProtocol: "Protocolo de Compartición Secreta de Shamir",
    yourEmail: "Tu Email",
    totalGuardians: "Total de Guardianes",
    thresholdNeeded: "¿Cuántos Necesarios?",
    secretMessage: "Mensaje Secreto",
    encryptAndSplit: "Encriptar y Dividir Clave",
    calculating: "Calculando Polinomio...",
    secretPlaceholder: "Ingresa tu mensaje secreto, claves privadas o información importante...",
    charactersCount: "caracteres",
    
    // Success Page
    vaultCreated: "¡Consejo de Bóveda Creado!",
    shareInstructions: "Esta bóveda requiere {threshold} de {total} códigos para desbloquear.",
    distributeShares: "Distribuye los códigos de abajo a {total} personas diferentes (Guardianes).",
    guardian: "Guardián",
    copy: "Copiar",
    copied: "¡Copiado!",
    createAnother: "Crear Otro",
    
    // Unlock Page
    councilUnlock: "Desbloqueo del Consejo",
    enterOwnerEmail: "Ingresa Email del Propietario de la Bóveda",
    searchVault: "Buscar Bóveda",
    searching: "Buscando...",
    vaultFound: "¡Bóveda Encontrada!",
    needKeys: "Necesita {threshold} Claves de Guardián.",
    guardianKey: "Clave de Guardián",
    pasteKey: "Pega el código de clave #{index}",
    combineAndOpen: "COMBINAR Y ABRIR",
    combining: "Combinando Claves...",
    consensusReached: "¡CONSENSO ALCANZADO!",
    reset: "Reiniciar",
    
    // Validation
    validEmail: "Ingresa un email válido.",
    messageRequired: "El mensaje secreto es requerido.",
    minLength: "Mínimo {min} caracteres.",
    maxLength: "Máximo {max} caracteres.",
    thresholdError: "¡El umbral no puede ser mayor que el total de guardianes!",
    keyRequired: "La clave es requerida.",
    validGuardiansRange: "El total de guardianes debe estar entre 2-10.",
    vaultNotFound: "Bóveda no encontrada para este email.",
    decryptionFailed: "¡Falló! Las claves ingresadas están mal o no coinciden.",
    
    // Animations & Effects
    vaultOpening: "Abriendo Bóveda...",
    accessGranted: "Acceso Concedido",
    securityProtocol: "Protocolo de Seguridad Activo",
    encryptionActive: "Encriptación Activa",
    emailPlaceholder: "correo@ejemplo.com",
    searchLanguages: "Buscar idiomas...",
    noLanguagesFound: "No se encontraron idiomas",
    aes256: "AES-256",
    shamirSSS: "Shamir SSS",
    zeroKnowledge: "Conocimiento Cero",
    failedCreateVault: "Error al crear la bóveda."
  }
};

export type TranslationKey = keyof typeof translations.id;
