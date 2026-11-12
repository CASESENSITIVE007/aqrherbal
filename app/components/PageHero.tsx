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
  children,
}: {
  title: string;
  lead: string;
  img?: string;
  alt?: string;
  slot?: string;
  focus?: string;
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
