"use client";

import { RiseText, Reveal } from "./Reveal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// States and herbs exactly as ARQ's own sourcing map labels them; origin = where the pin sits on that map.
const regions = [
  { state: "Kashmir", herbs: "Saffron and lavender", x: 33, y: 13 },
  { state: "Uttarakhand", herbs: "Ashwagandha", x: 47, y: 28 },
  { state: "Assam", herbs: "Tulsi and brahmi", x: 84, y: 40 },
  { state: "Rajasthan", herbs: "Fenugreek", x: 22, y: 43 },
  { state: "Kerala", herbs: "Tulsi and pepper", x: 32, y: 82 },
];

/** Pinned: the map holds still while each state scrolls past, and the map leans in on that state. */
export default function OriginMap() {
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = regions[active];

  return (
    <section className="origin section" aria-labelledby="origin-title">
      <div className="container origin__grid">
        <div className="origin__map">
          <div className="origin__frame" data-kind="product">
            <motion.div
              className="origin__zoom"
              animate={r ? { scale: 1.55, originX: r.x / 100, originY: r.y / 100 } : { scale: 1, originX: 0.5, originY: 0.5 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            >
              <Image
                src="/img/origin.png"
                alt="ARQ's sourcing map of India, with pins on Kashmir, Uttarakhand, Assam, Rajasthan and Kerala"
                fill
                sizes="(min-width: 60rem) 45vw, 100vw"
              />
            </motion.div>
          </div>
        </div>

        <div className="origin__text">
          <RiseText id="origin-title" text="Every herb has a home state." />
          <Reveal as="p" className="lead" delay={0.2}>We trace each leaf and flower to the state it grows in.</Reveal>
          <ol className="origin__list">
            {regions.map((reg, i) => (
              <li
                key={reg.state}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={i === active ? "is-active" : undefined}
              >
                <h3>{reg.state}</h3>
                <p>{reg.herbs}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
