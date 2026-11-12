"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, SHOP } from "../data";

/** Banner over a bar: the shipping line slides away once the visitor scrolls down, and returns on the way up. */
export default function SiteNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [tucked, setTucked] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setTucked(y > 120 && y > prev);
  });

  const isActive = (href: string) =>
    href === "/#blends" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      className="site-head"
      animate={{ y: tucked ? "calc(-1 * var(--banner-h))" : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="banner">
        Free shipping on orders over ₹699, and cash on delivery across India
      </p>
      <div className="bar container">
        <Link href="/" className="wordmark" aria-label="ARQ Herbals, home">
          <Image src="/img/logo.png" alt="" width={600} height={206} priority />
        </Link>

        <nav aria-label="Main" className="bar__links">
          <ul>
            {nav.map((n, i) => (
              <motion.li
                key={n.href}
                data-reveal
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.06 }}
              >
                <Link href={n.href} className="bar__link" aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                  {isActive(n.href) && (
                    <motion.span layoutId="nav-mark" className="bar__mark" aria-hidden="true" />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--quiet bar__cart" href={`${SHOP}/cart`}>
          Your cart
        </a>

        <button
          type="button"
          className="btn btn--quiet bar__menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          >
            <ul className="container">
              {[...nav, { href: `${SHOP}/cart`, label: "Your cart" }].map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
