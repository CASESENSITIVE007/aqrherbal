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

// The chosen tin wipes in from the side the visitor moved toward; the old one waits beneath, then fades.
const swap: Variants = {
  enter: (dir: number) => ({
    zIndex: 2,
    clipPath: dir >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    scale: 1.08,
  }),
  center: { zIndex: 2, clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 0.8, ease: EASE } },
  exit: { zIndex: 1, opacity: 0, transition: { delay: 0.5, duration: 0.3 } },
};

const chips: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.05, delayChildren: 0.55 } } };
const chip: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Ledge hero: the sunlit range fills the first screen; the offer rests at its base on a paper plate.
 * Pick a blend and its tin wipes into the plate, the caption, the buy link and the bar below follow.
 */
export default function BlendCounter() {
  const [[idx, dir], setSel] = useState<[number, number]>([0, 0]);
  const blend = blends[idx];
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "-35% 0px 0px 0px" });
  const [closeInView, setCloseInView] = useState(false);

  // As the hero leaves, the photograph sinks slowly and the plate lifts away.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const close = document.getElementById("blends");
    if (!close) return;
    const io = new IntersectionObserver(([e]) => setCloseInView(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(close);
    return () => io.disconnect();
  }, []);

  const choose = (i: number) => setSel(([prev]) => [i, i === prev ? 0 : i > prev ? 1 : -1]);
  const showBar = !heroInView && !closeInView;
  const enter = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.2 : 0.7, ease: EASE, delay: reduce ? 0 : d },
  });

  return (
    <>
      <section className="ledge" ref={heroRef} aria-labelledby="hero-title">
        <motion.div
          className="ledge__field"
          data-slot="hero"
          data-alt="The ARQ range in afternoon sun"
          data-reveal
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <motion.div className="ledge__img" style={reduce ? undefined : { y: fieldY, scale: fieldScale }}>
            <Image
              src="/img/collection.png"
              alt="ARQ Chamomile, Lungs Detox, Glowing Skin and Stress Relief tins on stone blocks in afternoon sun"
              fill
              priority
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        <div className="container ledge__in">
          <motion.div
            className="plate"
            data-reveal
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            style={reduce ? undefined : { y: plateY }}
          >
            <RiseText as="h1" id="hero-title" text="Herbal tea, traced to where it grows." mode="mount" delay={0.35} />
            <motion.p className="lead" data-reveal {...enter(0.6)}>
              Whole leaf and caffeine free, from growers across five Indian states.
            </motion.p>

            <form className="counter" onSubmit={(e) => e.preventDefault()} aria-label="Choose a blend to buy">
              <fieldset className="choose">
                <motion.legend data-reveal {...enter(0.65)}>
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

              <motion.div className="offer" data-reveal {...enter(0.95)}>
                <figure className="offer__tin">
                  <div className="offer__frame">
                    <AnimatePresence initial={false} custom={dir}>
                      <motion.div
                        key={blend.id}
                        className="offer__img"
                        custom={dir}
                        variants={swap}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <Image src={blend.img} alt={blend.alt} fill sizes="128px" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </figure>
                <div className="offer__buy">
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
                  <p className="caption">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={blend.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      >
                        {blend.name}, {blend.benefit.toLowerCase()}.
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
              </motion.div>
            </form>
          </motion.div>
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
