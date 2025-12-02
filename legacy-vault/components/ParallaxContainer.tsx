"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useCallback } from "react";

export default function ParallaxContainer({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    x.set(e.clientX - window.innerWidth / 2);
    y.set(e.clientY - window.innerHeight / 2);
  }, [x, y]);

  return (
    <motion.div
      className="w-full h-screen overflow-hidden relative"
      style={{ background: "linear-gradient(135deg,#0D1117,#06070A)" }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

