"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useIntroReady } from "./MotionProvider";
import { RiseText } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Inner-page hero: the text settles in once; the photograph unveils from the bottom edge. */
export default function PageHero({
  title,
  lead,
  img,
  alt,
  slot,
  focus,
  variant = "split",
  children,
}: {
  title: string;
  lead: string;
  img?: string;
  alt?: string;
  slot?: string;
  focus?: string;
  /** "poster": the photograph fills the first screen and the text rests on a paper plate at its base. */
  variant?: "split" | "poster";
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  // Always animate to visible; MotionConfig turns the rise off under reduced motion.
  const enter = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.2 : 0.7, ease: EASE, delay: reduce ? 0 : d },
  });

  if (img && variant === "poster") {
    return (
      <section className="ledge ledge--page" aria-labelledby="page-title">
        <motion.div
          className="ledge__field"
          data-slot={slot}
          data-alt={alt}
          data-reveal
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <div className="ledge__img">
            <Image src={img} alt={alt ?? ""} fill priority sizes="100vw" style={focus ? { objectPosition: focus } : undefined} />
          </div>
        </motion.div>
        <div className="container ledge__in">
          <motion.div
            className="plate"
            data-reveal
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <RiseText as="h1" id="page-title" text={title} mode="mount" delay={0.35} />
            <motion.p className="lead" data-reveal {...enter(0.6)}>
              {lead}
            </motion.p>
            {children && (
              <motion.div className="actions" data-reveal {...enter(0.75)}>
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`page-hero${img ? "" : " page-hero--corridor"}`} aria-labelledby="page-title">
      <div className={`container${img ? " page-hero__grid" : ""}`}>
        <div className="page-hero__text">
          <RiseText as="h1" id="page-title" text={title} mode="mount" />
          <motion.p className="lead" data-reveal {...enter(0.3)}>
            {lead}
          </motion.p>
          {children && (
            <motion.div className="actions" data-reveal {...enter(0.45)}>
              {children}
            </motion.div>
          )}
        </div>
        {img && (
          <motion.div
            className="page-hero__frame"
            data-slot={slot}
            data-alt={alt}
            data-reveal
            initial={{ opacity: 0, clipPath: reduce ? "inset(0% 0 0 0)" : "inset(18% 0 0 0)" }}
            animate={ready ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : undefined}
            transition={{ duration: 1, ease: EASE }}
          >
            <Image src={img} alt={alt ?? ""} fill priority sizes="(min-width: 60rem) 50vw, 100vw" style={focus ? { objectPosition: focus } : undefined} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
