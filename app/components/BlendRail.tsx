"use client";

import { RiseText } from "./Reveal";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { blends, PRICE, WAS } from "../data";

/** The close: the whole range as a rail, the next tin cut by the edge, each one a link to buy. */
export default function BlendRail() {
  const reduce = useReducedMotion();
  return (
    <section className="range section" id="blends" aria-labelledby="range-title">
      <div className="container range__head">
        <RiseText id="range-title" text="Six blends, one price." />
        <p className="lead">
          Each tin is <span className="num">{PRICE}</span>, down from <s className="num">{WAS}</s>.
        </p>
      </div>
      <ul className="rail" tabIndex={0} aria-label="All six ARQ blends">
        {blends.map((b, i) => (
          <motion.li
            key={b.id}
            data-reveal
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 4) * 0.07 }}
          >
            <motion.a
              href={b.href}
              className="tin"
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <span className="tin__img">
                <motion.span
                  className="ir__inner"
                  data-reveal
                  initial={reduce ? false : { scale: 1.18 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 4) * 0.07 }}
                >
                  <Image src={b.img} alt={b.alt} fill sizes="(min-width: 60rem) 22vw, 70vw" />
                </motion.span>
              </span>
              <span className="tin__name">{b.name}</span>
              <span className="tin__line">{b.benefit}</span>
              <span className="tin__buy">Buy {b.short.toLowerCase()}</span>
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
