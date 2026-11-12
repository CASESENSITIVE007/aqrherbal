"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { blends, PRICE, WAS } from "../data";
import { RiseText } from "./Reveal";
import { useIntroReady } from "./MotionProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

// The new photograph wipes in from the side the visitor moved toward; the old one waits beneath, then fades.
const swap: Variants = {
  enter: (dir: number) => ({
    zIndex: 2,
    clipPath: dir >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    scale: 1.08,
  }),
  center: {
    zIndex: 2,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
  exit: { zIndex: 1, opacity: 0, transition: { delay: 0.55, duration: 0.3 } },
};

const chips: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.05, delayChildren: 0.45 } } };
const chip: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/**
 * The hero is the buy box (Counter posture): pick a blend, the tin and cup change beside it,
 * and the price and the buy link follow. Once the hero scrolls away, a slim bar keeps the choice in reach.
 */
export default function BlendCounter() {
  const [[idx, dir], setSel] = useState<[number, number]>([0, 0]);
  const blend = blends[idx];
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "-35% 0px 0px 0px" });
  const [closeInView, setCloseInView] = useState(false);

  // As the hero leaves, the photograph eases back and the words drift up and fade.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const close = document.getElementById("blends");
    if (!close) return;
    const io = new IntersectionObserver(([e]) => setCloseInView(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(close);
    return () => io.disconnect();
  }, []);

  const choose = (i: number) => setSel(([prev]) => [i, i === prev ? 0 : i > prev ? 1 : -1]);
  const showBar = !heroInView && !closeInView;
  // Always animate to visible; MotionConfig turns the rise off under reduced motion.
  const enter = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.2 : 0.7, ease: EASE, delay: reduce ? 0 : d },
  });

  return (
    <>
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="container hero__grid">
          <motion.div className="hero__text" style={reduce ? undefined : { y: textY, opacity: textFade }}>
            <RiseText as="h1" id="hero-title" text="Herbal tea, traced to where it grows." mode="mount" delay={0.1} />
            <motion.p className="lead" data-reveal {...enter(0.35)}>
              Whole leaf and caffeine free, from growers across five Indian states.
            </motion.p>

            <form className="counter" onSubmit={(e) => e.preventDefault()} aria-label="Choose a blend to buy">
              <fieldset className="choose">
                <motion.legend data-reveal {...enter(0.4)}>
                  Choose a blend
                </motion.legend>
                <motion.div className="choose__grid" variants={chips} initial="hidden" animate={ready ? "shown" : "hidden"}>
                  {blends.map((b, i) => (
                    <motion.span key={b.id} className="choose__opt" data-reveal variants={chip} whileTap={{ scale: 0.96 }}>
                      <input
                        type="radio"
                        name="blend"
                        id={`blend-${b.id}`}
                        value={b.id}
                        checked={i === idx}
                        onChange={() => choose(i)}
                      />
                      <label htmlFor={`blend-${b.id}`}>
                        {i === idx && (
                          <motion.span
                            layoutId="choose-fill"
                            className="choose__fill"
                            aria-hidden="true"
                            transition={{ type: "spring", stiffness: 420, damping: 38 }}
                          />
                        )}
                        <span className="choose__label">{b.short}</span>
                      </label>
                    </motion.span>
                  ))}
                </motion.div>
              </fieldset>

              <motion.div className="counter__buy" data-reveal {...enter(0.8)}>
                <p className="price">
                  <span className="price__now num">{PRICE}</span>
                  <s className="price__was num">{WAS}</s>
                  <span className="price__save">You save 31%</span>
                </p>
                <motion.a className="btn btn--primary btn--shine" href={blend.href} whileTap={{ scale: 0.97 }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={blend.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
                      transition={{ duration: 0.25 }}
                    >
                      Buy {blend.name}
                    </motion.span>
                  </AnimatePresence>
                </motion.a>
              </motion.div>
            </form>
          </motion.div>

          <motion.figure
            className="hero__visual"
            data-reveal
            initial={{ opacity: 0, clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(10% 10% 10% 10%)" }}
            animate={ready ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            style={reduce ? { originY: 0 } : { scale: imgScale, originY: 0 }}
          >
            <motion.div
              className="hero__frame"
              data-slot="hero"
              data-alt="The chosen ARQ blend: its tin beside a brewed cup"
            >
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={blend.id}
                  className="hero__img"
                  custom={dir}
                  variants={swap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Image
                    src={blend.img}
                    alt={blend.alt}
                    fill
                    sizes="(min-width: 60rem) 54vw, 100vw"
                    priority={idx === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <figcaption className="caption">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={blend.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                  {blend.name}, {blend.benefit.toLowerCase()}. A tin of whole-leaf blend.
                </motion.span>
              </AnimatePresence>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <AnimatePresence>
        {showBar && (
          <motion.aside
            className="buybar"
            aria-label="Your chosen blend"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%", transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="container buybar__in">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={blend.id}
                  className="buybar__thumbwrap"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Image src={blend.img} alt="" width={56} height={56} className="buybar__thumb" />
                </motion.span>
              </AnimatePresence>
              <p className="buybar__name">
                {blend.name}
                <span className="num">{PRICE}</span>
              </p>
              <a href="#hero-title" className="buybar__change">
                Change blend
              </a>
              <a className="btn btn--primary btn--shine" href={blend.href}>
                Buy now
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
