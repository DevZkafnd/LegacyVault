// src/lib/crypto.ts

import * as secrets from "secrets.js-grempe";

// 1. Generate Random Master Key
export async function generateMasterKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// 2. Encrypt Data (Sama seperti sebelumnya)
export async function encryptData(text: string, key: CryptoKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); 
  
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data
  );
  const encryptedArray = new Uint8Array(encryptedBuffer);
  return {
    encryptedBlob: buf2hex(iv) + ":" + buf2hex(encryptedArray)
  };
}

// 3. SHAMIR SPLIT: Memecah Kunci menjadi N bagian, butuh T untuk membuka
export async function generateShamirShares(key: CryptoKey, sharesAmount: number, threshold: number) {
  // A. Export CryptoKey ke format Hex String (Raw)
  const rawKey = await window.crypto.subtle.exportKey("raw", key);
  const keyHex = buf2hex(new Uint8Array(rawKey));

  // B. Gunakan Shamir's Secret Sharing
  const shares = secrets.share(keyHex, sharesAmount, threshold);
  return shares; // Array of strings (hex codes)
}

// 4. SHAMIR RECOVER: Menggabungkan beberapa share menjadi 1 Key
export async function recoverShamirKey(shares: string[]): Promise<CryptoKey> {
  // A. Gabungkan shares menggunakan matematika Shamir
  const recoveredHex = secrets.combine(shares);
  // B. Convert Hex kembali ke Buffer
  const keyBytes = hex2buf(recoveredHex);
  // C. Import kembali menjadi objek CryptoKey
  return window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
}

// 5. Decrypt Data (Sama seperti sebelumnya)
export async function decryptData(encryptedBlob: string, key: CryptoKey) {
  const [ivHex, dataHex] = encryptedBlob.split(":");
  if (!ivHex || !dataHex) throw new Error("Format data rusak");
  const iv = hex2buf(ivHex);
  const data = hex2buf(dataHex);
  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      data
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch {
    throw new Error("Kunci salah atau kombinasi share tidak valid!");
  }
}

// Helpers
function buf2hex(buffer: Uint8Array) {
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}
function hex2buf(hexString: string) {
  return new Uint8Array(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
}
