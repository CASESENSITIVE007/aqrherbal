"use client";

import Image from "next/image";
import { RiseText, Stagger, Item, Reveal, ImageReveal } from "./Reveal";
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

/** The ritual card: the dark ritual photograph beside the brew, set as ruled rows on green ink. */
export default function BrewFigures() {
  return (
    <section className="ritual band--ink" aria-labelledby="brew-title">
      <ImageReveal className="ritual__photo" slot="ritual" alt="A cup of tea on green linen in leaf shadow">
        <Image src="/img/ritual.png" alt="" fill sizes="(min-width: 60rem) 45vw, 100vw" />
      </ImageReveal>
      <div className="ritual__card">
        <RiseText id="brew-title" text="A slow, simple brew." />
        <Reveal as="p" className="lead" delay={0.15}>
          One bag, fresh water, a few quiet minutes.
        </Reveal>
        <Stagger as="dl" className="ritual__rows">
          <Item as="div">
            <dt>Water</dt>
            <dd>
              <span className="ritual__n num"><Count to={240} /> ml</span> for every bag
            </dd>
          </Item>
          <Item as="div">
            <dt>Heat</dt>
            <dd>
              <span className="ritual__n num"><Count to={95} />°C</span> just off the boil
            </dd>
          </Item>
          <Item as="div">
            <dt>Steep</dt>
            <dd>
              <span className="ritual__n num"><Count to={3} /> to <Count to={5} /> min</span> then sip
            </dd>
          </Item>
          <Item as="div">
            <dt>Iced</dt>
            <dd>Use two bags, steep, cool and pour over ice. Squeeze in lemon and Blue Tea turns purple.</dd>
          </Item>
        </Stagger>
        <Reveal delay={0.2}>
          <Link href="/rituals" className="link link--light">See every ritual</Link>
        </Reveal>
      </div>
    </section>
  );
}
