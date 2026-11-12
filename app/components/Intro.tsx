"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntroFinish } from "./MotionProvider";

const KEY = "arq-intro-seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const SOFT = [0.45, 0, 0.25, 1] as const;
const LENGTH = 6600; // ms, first frame to lift-off

/*
 * The pour, in seconds from the first frame:
 * 0.0 to 1.0  the cup and the teapot drift in and settle
 * 1.0 to 1.9  the teapot tilts, slowly
 * 1.7 to 4.4  tea streams into the cup (2.7s), the level rises, ripples spread where it lands
 * 4.4 to 4.8  the stream's tail falls into the cup; the teapot rights itself by 5.3
 * 2.6 onward  steam curls up from the hot cup
 * 4.9         the wordmark settles; 6.6 the screen lifts away
 */
const T = { tilt: 1.0, pour: 1.7, pourEnd: 4.4, back: 5.3, brand: 4.9 };

// Where the spout's lip sits once the pot has tilted 34 degrees about its belly (110, 120).
const STREAM_A = "M211 157 C 213 196 203 232 200 306";
const STREAM_B = "M211 157 C 216 198 200 234 200 306";

// A wave twice the cup's width, so sliding it sideways by one period loops without a seam.
const WAVE =
  "M100 240 q10 -3.5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 L340 330 L100 330 Z";

// Decided once per page load, so React's double-run in development cannot mark it seen before it plays.
let decided: { skip: boolean } | null = null;
function decide() {
  if (decided) return decided;
  let seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === "1";
    sessionStorage.setItem(KEY, "1");
  } catch {}
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  decided = { skip: seen || reduce };
  return decided;
}

/** The opening screen: a gold teapot pours hot tea into a glass cup over a calm, drifting field. */
export default function Intro() {
  const finish = useIntroFinish();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const { skip } = decide();
    const root = document.documentElement;
    if (skip) finish();
    else root.classList.add("intro-lock");
    const t = window.setTimeout(() => setShow(false), skip ? 0 : LENGTH);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("intro-lock");
    };
  }, [finish]);

  const done = () => {
    document.documentElement.classList.remove("intro-lock");
    finish();
  };

  const pourSpan = T.pourEnd - T.pour + 0.4; // draw, hold, then the tail falls

  return (
    <AnimatePresence onExitComplete={done}>
      {show && (
        <motion.div
          className="intro"
          role="region"
          aria-label="Welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: SOFT } }}
        >
          {/* A calm field: the brand's leaf-shadow photograph, drifting slowly under a green scrim. */}
          <motion.div
            className="intro__bg"
            aria-hidden="true"
            initial={{ scale: 1.14, x: "-2%", y: "1%" }}
            animate={{ scale: 1.03, x: "1%", y: "0%" }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <Image src="/img/ritual.png" alt="" fill priority sizes="100vw" />
          </motion.div>
          <div className="intro__scrim" aria-hidden="true" />

          <motion.div
            className="intro__stage"
            exit={{ scale: 0.96, y: -20, transition: { duration: 0.9, ease: SOFT } }}
          >
            <svg className="intro__art" viewBox="0 0 400 360" role="img" aria-label="A teapot pouring hot tea into a glass cup">
              <defs>
                <clipPath id="cup-inside">
                  <path d="M147 232 L253 232 L244 298 Q242 308 232 308 L168 308 Q158 308 156 298 Z" />
                </clipPath>
                <linearGradient id="tea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--intro-tea-top)" />
                  <stop offset="1" stopColor="var(--intro-tea)" />
                </linearGradient>
                <linearGradient id="stream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--intro-tea)" />
                  <stop offset="1" stopColor="var(--intro-tea-top)" />
                </linearGradient>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--intro-gold-light)" />
                  <stop offset="1" stopColor="var(--intro-gold)" />
                </linearGradient>
                <filter id="soft" x="-50%" y="-20%" width="200%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" />
                </filter>
              </defs>

              {/* the cup and saucer settle up into place */}
              <motion.g
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              >
                <ellipse cx="200" cy="326" rx="108" ry="10" fill="var(--intro-shadow)" filter="url(#soft)" />
                <ellipse cx="200" cy="318" rx="96" ry="13" fill="var(--intro-saucer)" />
                <ellipse cx="200" cy="314" rx="70" ry="7" fill="var(--intro-saucer-in)" />
                <ellipse cx="200" cy="230" rx="57" ry="6" fill="var(--intro-glass-back)" />
              </motion.g>

              {/* the stream: an outer glow and a core, drawn down from the spout, then its tail falls in */}
              {[
                { w: 9, stroke: "var(--intro-tea-glow)" },
                { w: 4.5, stroke: "url(#stream)" },
              ].map((s, i) => (
                <motion.path
                  key={i}
                  d={STREAM_A}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth={s.w}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1, 0],
                    pathOffset: [0, 0, 0, 1],
                    opacity: [0, 1, 1, 0],
                    d: [STREAM_A, STREAM_B, STREAM_A, STREAM_B, STREAM_A, STREAM_B],
                  }}
                  transition={{
                    delay: T.pour,
                    pathLength: { delay: T.pour, duration: pourSpan, times: [0, 0.13, 0.87, 1], ease: ["easeOut", "linear", "easeIn"] },
                    pathOffset: { delay: T.pour, duration: pourSpan, times: [0, 0.13, 0.87, 1], ease: ["linear", "linear", "easeIn"] },
                    opacity: { delay: T.pour, duration: pourSpan, times: [0, 0.04, 0.9, 1], ease: ["linear", "linear", "easeIn"] },
                    d: { delay: T.pour, duration: pourSpan, ease: "easeInOut" },
                  }}
                />
              ))}

              {/* the tea: a gently moving surface that rises as the cup fills, with ripples where the stream lands */}
              <g clipPath="url(#cup-inside)">
                <motion.g
                  initial={{ y: 76 }}
                  animate={{ y: 0 }}
                  transition={{ delay: T.pour + 0.25, duration: T.pourEnd - T.pour, ease: [0.3, 0.1, 0.3, 1] }}
                >
                  <motion.path
                    d={WAVE}
                    fill="url(#tea)"
                    initial={{ x: 0 }}
                    animate={{ x: -40 }}
                    transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                  />
                  {[0, 1, 2, 3].map((k) => (
                    <motion.ellipse
                      key={k}
                      cx="200"
                      cy="240"
                      fill="none"
                      stroke="var(--intro-ripple)"
                      strokeWidth="1.5"
                      initial={{ rx: 2, ry: 0.8, opacity: 0 }}
                      animate={{ rx: [2, 30], ry: [0.8, 4], opacity: [0, 0.7, 0] }}
                      transition={{ delay: T.pour + 0.4 + k * 0.55, duration: 1.1, ease: "easeOut", repeat: 0 }}
                    />
                  ))}
                </motion.g>
              </g>

              {/* the glass, drawn over the tea */}
              <motion.g
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              >
                <path
                  d="M141 228 L259 228 L250 300 Q248 314 234 314 L166 314 Q152 314 150 300 Z"
                  fill="var(--intro-glass)"
                  stroke="var(--intro-glass-edge)"
                  strokeWidth="3"
                />
                <path d="M152 240 L158 296" stroke="var(--intro-shine)" strokeWidth="5" strokeLinecap="round" />
                <path
                  d="M257 246 Q292 246 288 270 Q284 292 250 292"
                  fill="none"
                  stroke="var(--intro-glass-edge)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <ellipse cx="200" cy="228" rx="59" ry="6" fill="none" stroke="var(--intro-glass-edge)" strokeWidth="2.5" />
              </motion.g>

              {/* the teapot drifts in, bobs once, tilts slowly to pour, holds, and rights itself */}
              <motion.g
                initial={{ opacity: 0, x: -50, y: -24 }}
                animate={{ opacity: 1, x: 0, y: [-24, 3, 0] }}
                transition={{ duration: 1.1, ease: EASE, y: { duration: 1.1, times: [0, 0.7, 1], ease: "easeOut" } }}
              >
                <motion.g
                  style={{ originX: "110px", originY: "120px", transformBox: "view-box" }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 34, 34, 0] }}
                  transition={{
                    delay: T.tilt,
                    duration: T.back - T.tilt,
                    times: [0, 0.21, 0.79, 1],
                    ease: ["easeInOut", "linear", "easeInOut"],
                  }}
                >
                  <path d="M52 98 Q14 120 50 154" fill="none" stroke="url(#gold)" strokeWidth="11" strokeLinecap="round" />
                  <path d="M164 122 Q196 116 210 90 L219 95 Q207 130 168 146 Z" fill="url(#gold)" />
                  <ellipse cx="110" cy="122" rx="64" ry="52" fill="url(#gold)" />
                  <path d="M60 128 Q110 150 160 128" fill="none" stroke="var(--intro-gold-band)" strokeWidth="5" />
                  <ellipse cx="110" cy="74" rx="34" ry="9" fill="var(--intro-gold)" />
                  <circle cx="110" cy="62" r="8" fill="var(--intro-gold-light)" />
                  <ellipse cx="88" cy="104" rx="14" ry="22" fill="var(--intro-shine)" />
                </motion.g>
              </motion.g>

              {/* steam: soft wisps that keep curling up from the hot cup */}
              <g filter="url(#soft)">
                {[
                  { d: "M182 222 C 170 202 194 192 182 172 C 172 156 190 146 182 128", at: 0 },
                  { d: "M204 222 C 194 200 216 190 204 168 C 194 152 214 142 206 122", at: 0.5 },
                  { d: "M226 222 C 216 204 238 194 226 174 C 216 160 234 150 226 132", at: 1.0 },
                  { d: "M194 222 C 186 206 204 196 196 180 C 188 166 202 158 196 144", at: 1.5 },
                ].map((w, i) => (
                  <motion.path
                    key={i}
                    d={w.d}
                    fill="none"
                    stroke="var(--intro-steam)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0, y: 10 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [10, -6, -26] }}
                    transition={{ delay: 2.6 + w.at, duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 0.2 }}
                  />
                ))}
              </g>
            </svg>

            <motion.div
              className="intro__brand"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: T.brand }}
            >
              <Image src="/img/logo.png" alt="ARQ Herbals" width={600} height={206} className="intro__logo" />
              <p>A heritage of healing in every sip.</p>
            </motion.div>
          </motion.div>

          <button type="button" className="intro__skip" onClick={() => setShow(false)}>
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
