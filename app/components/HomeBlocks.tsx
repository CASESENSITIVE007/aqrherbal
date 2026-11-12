"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, item, RiseText } from "./Reveal";
import { WHATSAPP, COMMUNITY } from "../data";

const EASE = [0.16, 1, 0.3, 1] as const;

const difference = [
  ["Freshness", "Small batches, blended to order", "Mass produced, long on the shelf"],
  ["Origin", "Single origin, traced to the state", "Blended from unnamed sources"],
  ["Quality", "Lab tested, no additives", "Artificial flavour and fillers"],
  ["In the tin", "Whole leaf and whole flower", "Dust and broken fannings"],
  ["Growers", "Fair partnerships with growers", "Opaque supply chains"],
];

/** Table: ARQ against shelf tea, rows arriving one after another with a hairline drawn under each. */
export function DiffTable() {
  const reduce = useReducedMotion();
  return (
    <section className="diff section" aria-labelledby="diff-title">
      <div className="container">
        <Reveal className="diff__head">
          <RiseText id="diff-title" text="Whole flowers in the tin, never dust." />
        </Reveal>
        <table className="diff__table">
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">What we compare</span>
              </th>
              <th scope="col">ARQ Herbals</th>
              <th scope="col">Most shelf tea</th>
            </tr>
          </thead>
          <tbody>
            {difference.map(([k, ours, theirs], i) => (
              <motion.tr
                key={k}
                data-reveal
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                <th scope="row">{k}</th>
                <td className="diff__ours">{ours}</td>
                <td className="diff__theirs">{theirs}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Band on the second paper: the two named experts and the free consult. */
export function ConsultBand() {
  return (
    <section className="band band--paper consult-band" aria-labelledby="consult-title">
      <div className="container consult-band__in">
        <Reveal>
          <RiseText id="consult-title" text="Not sure which blend suits you?" />
        </Reveal>
        <Stagger as="div" className="consult-band__body">
          <motion.p variants={item} data-reveal className="lead">
            Ask Dr. Aishwarya Nair, BAMS, or Kavya Menon, clinical herbalist. Free with your first order.
          </motion.p>
          <motion.div variants={item} data-reveal className="actions">
            <a className="btn btn--quiet" href={WHATSAPP}>
              Book a free consult
            </a>
            <a className="link" href={COMMUNITY}>
              Join the WhatsApp community
            </a>
          </motion.div>
        </Stagger>
      </div>
    </section>
  );
}
