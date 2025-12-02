"use client";
import { motion } from "framer-motion";

export default function SecurityScanOverlay({ active = false }: { active?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {active && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-24 w-full"
            style={{ background: "linear-gradient(to bottom, rgba(250,231,178,0.0), rgba(250,231,178,0.28), rgba(250,231,178,0.0))" }}
            initial={{ y: -80 }}
            animate={{ y: [ -80, 760, -80 ] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ boxShadow: "0 0 120px 40px rgba(198,166,103,0.18) inset" }}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}
    </div>
  );
}
