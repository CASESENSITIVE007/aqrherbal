"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const modes = [
  {
    id: "hot",
    label: "Hot",
    steps: [
      ["One bag per cup", "Or one heaped teaspoon of loose blend for every 240 ml."],
      ["Fresh boiled water", "Around 95°C. For floral blends, let it settle a moment first."],
      ["Steep 3 to 5 minutes", "Shorter for a soft cup, longer for a deeper one."],
    ],
  },
  {
    id: "iced",
    label: "Iced",
    steps: [
      ["Two bags, double strength", "The ice will soften it, so brew it bold."],
      ["Steep, then cool", "Let the cup come down to room temperature."],
      ["Pour over ice", "Add lemon to Blue Tea and watch it turn purple."],
    ],
  },
];

/** Switcher between the hot and the iced brew. Arrow keys move between the two tabs. */
export default function BrewSwitch() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = modes[sel];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = sel === 0 ? 1 : 0;
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div className="seg" role="tablist" aria-label="Brew" onKeyDown={onKey}>
        {modes.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`brew-tab-${x.id}`}
            aria-selected={i === sel}
            aria-controls={`brew-panel-${x.id}`}
            tabIndex={i === sel ? 0 : -1}
            onClick={() => setSel(i)}
          >
            {i === sel && (
              <motion.span
                layoutId="brew-fill"
                className="seg__fill"
                aria-hidden="true"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            {x.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ol
          key={m.id}
          role="tabpanel"
          id={`brew-panel-${m.id}`}
          aria-labelledby={`brew-tab-${m.id}`}
          className="steps"
          initial="hidden"
          animate="shown"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
        >
          {m.steps.map(([t, d]) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
