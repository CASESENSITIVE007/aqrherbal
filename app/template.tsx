"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let navigated = false;

/**
 * Pages settle in with a short fade when the visitor moves between them.
 * The first load is never hidden, so the hero paints at once.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animateIn] = useState(() => typeof window !== "undefined" && navigated);
  useEffect(() => {
    navigated = true;
  }, []);
  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
