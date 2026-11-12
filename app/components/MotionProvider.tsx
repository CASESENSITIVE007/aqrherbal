"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { MotionConfig } from "framer-motion";

type Intro = { ready: boolean; finish: () => void };
const IntroContext = createContext<Intro>({ ready: true, finish: () => {} });

/** True once the opening tea-pour has finished (or was skipped); hero entrances wait for it. */
export const useIntroReady = () => useContext(IntroContext).ready;
export const useIntroFinish = () => useContext(IntroContext).finish;

/** Honour the visitor's reduced-motion setting for every Framer Motion animation on the site. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => setReady(true), []);
  return (
    <IntroContext.Provider value={{ ready, finish }}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </IntroContext.Provider>
  );
}
