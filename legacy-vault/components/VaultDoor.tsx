"use client";

export default function VaultDoor({ size = 420, color = "#C7C9CE" }: { size?: number; color?: string }) {
  const px = `${size}px`;
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_40px_#00D1B255] pointer-events-none"
      style={{ width: px, height: px, backgroundImage: "linear-gradient(to bottom right,#1F242C,#2B313A)", border: `4px solid ${color}` }}
    />
  );
}
