"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { useIntroReady } from "./MotionProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The page's one reveal: content rises 16px and fades in once, the first time it enters view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "figure" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const group: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.08 } } };
export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** One child of a Stagger, usable from server components. */
export function Item({
  children,
  className,
  as = "li",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "li" | "div";
}) {
  const Tag = motion[as];
  return (
    <Tag data-reveal variants={item} className={className}>
      {children}
    </Tag>
  );
}

/** A list whose children (motion elements using `item`) arrive one after another. */
export function Stagger({
  children,
  className,
  as = "ul",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div" | "dl";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={group}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Tag>
  );
}

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  shown: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: EASE } },
};

/**
 * A heading whose words rise out of their own line, one after another.
 * mode "mount" plays on load (heroes); "view" plays the first time it scrolls into view.
 */
export function RiseText({
  text,
  as = "h2",
  id,
  className,
  delay = 0,
  mode = "view",
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
  mode?: "mount" | "view";
}) {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const Tag = motion[as];
  const group: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: delay } } };
  const play =
    mode === "mount"
      ? { initial: "hidden", animate: ready ? "shown" : "hidden" }
      : { initial: reduce ? false : "hidden", whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } };
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} variants={group} {...play}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="rise">
            <motion.span data-reveal className="rise__w" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** A photograph that unveils from a narrow band to its full frame while the picture settles from a slight zoom. */
export function ImageReveal({
  children,
  className,
  slot,
  alt,
}: {
  children: React.ReactNode;
  className?: string;
  slot?: string;
  alt?: string;
}) {
  const reduce = useReducedMotion();
  const once = { once: true, margin: "0px 0px -10% 0px" };
  return (
    <motion.div
      data-reveal
      data-slot={slot}
      data-alt={alt}
      className={className}
      initial={reduce ? false : { clipPath: "inset(14% 6% 14% 6%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={once}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div
        data-reveal
        className="ir__inner"
        initial={reduce ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={once}
        transition={{ duration: 1.5, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A hairline of gold at the top of the window that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}
