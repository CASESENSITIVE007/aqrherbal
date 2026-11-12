"use client";

import { RiseText } from "./Reveal";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blends } from "../data";

const herbs = [
  {
    id: "chamomile",
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    role: "For unwinding",
    text: "A soft, apple-sweet flower for the last cup of the day.",
    blend: blends[1],
  },
  {
    id: "bluepea",
    name: "Blue pea",
    latin: "Clitoria ternatea",
    role: "For antioxidants",
    text: "Butterfly pea flower, which pours a vivid blue cup.",
    blend: blends[0],
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    latin: "Hibiscus sabdariffa",
    role: "For everyday immunity",
    text: "A bright, tart red petal, rich in vitamin C.",
    blend: blends[2],
  },
];

/** Switcher: three herbs behind one control; the name slides, the panel settles. Every panel is real. */
export default function Ingredients() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const h = herbs[sel];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (sel + dir + herbs.length) % herbs.length;
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="herbs section" aria-labelledby="herbs-title">
      <div className="container herbs__grid">
        <div className="herbs__side">
          <RiseText id="herbs-title" text="Know your herbs by what they bring." />
          <div className="herbs__tabs" role="tablist" aria-label="Herbs" aria-orientation="vertical" onKeyDown={onKey}>
            {herbs.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={i === sel}
                aria-controls={`panel-${x.id}`}
                tabIndex={i === sel ? 0 : -1}
                className="herbs__tab"
                onClick={() => setSel(i)}
              >
                {i === sel && <motion.span layoutId="herb-rule" className="herbs__rule" aria-hidden="true" />}
                {x.name}
              </button>
            ))}
          </div>
        </div>

        <div className="herbs__stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={h.id}
              role="tabpanel"
              id={`panel-${h.id}`}
              aria-labelledby={`tab-${h.id}`}
              className="herbs__panel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="herbs__copy">
              <p className="herbs__name" aria-hidden="true">
                {/* the name sets itself letter by letter */}
                {h.name.split("").map((ch, i) => (
                  <span key={i} className="rise">
                    <motion.span
                      className="rise__w"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.035 }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  </span>
                ))}
              </p>
              <dl className="herbs__facts">
                <div>
                  <dt>Botanical name</dt>
                  <dd>
                    <i>{h.latin}</i>
                  </dd>
                </div>
                <div>
                  <dt>Drink it</dt>
                  <dd>{h.role.replace("For ", "for ")}</dd>
                </div>
              </dl>
              <p className="herbs__text">{h.text}</p>
              <a className="link" href={h.blend.href}>
                Shop {h.blend.name}
              </a>
              </div>
              <motion.div
                className="herbs__photo"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <Image src={h.blend.img} alt={h.blend.alt} fill sizes="(min-width: 60rem) 24vw, 80vw" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
