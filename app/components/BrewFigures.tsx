"use client";

import { RiseText, Stagger, Item, Reveal } from "./Reveal";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** A number that counts up once from zero when it scrolls into view. The real value is in the markup. */
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{to}</span>;
}

/** Figures in old-style numerals: the hot brew, straight from ARQ's ritual card. */
export default function BrewFigures() {
  return (
    <section className="brew section" aria-labelledby="brew-title">
      <div className="container">
        <div className="brew__head">
          <RiseText id="brew-title" text="A slow, simple brew." />
          <p className="lead">
            One bag, fresh water, a few quiet minutes. <Link href="/rituals" className="link">See every ritual</Link>
          </p>
        </div>
        <Stagger as="ol" className="brew__figs">
          <Item>
            <p className="figure">
              <Count to={240} />
              <small>ml</small>
            </p>
            <p>Water for every bag</p>
          </Item>
          <Item>
            <p className="figure">
              <Count to={95} />
              <small>°C</small>
            </p>
            <p>Just off the boil</p>
          </Item>
          <Item>
            <p className="figure">
              <Count to={3} />
              <span className="figure__to">to</span>
              <Count to={5} />
              <small>min</small>
            </p>
            <p>Steep, then sip</p>
          </Item>
        </Stagger>
        <Reveal as="p" className="brew__iced">
          Iced, use two bags, steep, cool and pour over ice. Squeeze in lemon and Blue Tea turns purple.
        </Reveal>
      </div>
    </section>
  );
}
