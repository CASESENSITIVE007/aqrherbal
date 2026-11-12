import Image from "next/image";
import Link from "next/link";
import { SHOP, WHATSAPP } from "../data";
import { Stagger, Item } from "./Reveal";

/** Colophon block: the wordmark, the Sanskrit line the brand opens with, and the real links in one paragraph-like run. */
export default function SiteFooter() {
  return (
    <footer className="foot">
      <Stagger as="div" className="container foot__grid">
        <Item as="div" className="foot__mast">
          <Image src="/img/logo.png" alt="ARQ Herbals" width={600} height={206} className="foot__logo" />
          <p className="foot__sanskrit" lang="sa">
            सुखसंज्ञकमारोग्यं विकारो दुःखमेव च ।
          </p>
          <p className="foot__gloss">Happiness nurtures health, while sadness can quietly weaken it.</p>
        </Item>

        <Item as="div" className="foot__colophon">
          Whole leaf, caffeine free and lab tested, made in India. Questions go to{" "}
          <a href={WHATSAPP}>WhatsApp, +91 731 737 2202</a>.
        </Item>

        <Item as="div">
        <nav aria-label="Footer" className="foot__links">
          <ul>
            <li><Link href="/#blends">Shop</Link></li>
            <li><Link href="/rituals">Rituals</Link></li>
            <li><Link href="/about">Our story</Link></li>
            <li><Link href="/consult">Consult</Link></li>
            <li><a href={`${SHOP}/blogs/news`}>Journal</a></li>
            <li><a href={`${SHOP}/pages/contact`}>Contact</a></li>
          </ul>
          <ul>
            <li><a href="https://www.instagram.com/arqherbals">Instagram</a></li>
            <li><a href="https://www.facebook.com/share/1DQCSYgyWo/">Facebook</a></li>
            <li><a href="https://youtube.com/@arqmeme">YouTube</a></li>
            <li><a href={`${SHOP}/pages/privacy-page`}>Privacy</a></li>
            <li><a href={`${SHOP}/pages/refund`}>Refunds</a></li>
            <li><a href={`${SHOP}/pages/shipping`}>Shipping</a></li>
          </ul>
        </nav>
        </Item>
      </Stagger>
      <div className="container foot__legal">
        <small>© 2026 ARQ Herbals</small>
        <small><a href={`${SHOP}/pages/terms-and-condition`}>Terms</a></small>
      </div>
    </footer>
  );
}
