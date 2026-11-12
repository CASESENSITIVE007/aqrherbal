import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import Intro from "./components/Intro";
import { ScrollProgress } from "./components/Reveal";

const display = Cormorant_Garamond({ variable: "--ff-display", subsets: ["latin"], weight: ["500"], display: "swap" });
const body = Hanken_Grotesk({ variable: "--ff-body", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const outlier = Newsreader({ variable: "--ff-outlier", subsets: ["latin"], weight: ["400"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "ARQ Herbals | Whole-leaf herbal tea, traced to its state",
    template: "%s | ARQ Herbals",
  },
  description:
    "Caffeine-free, whole-leaf herbal tea blends from growers across India. Free shipping over ₹699.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${outlier.variable}`}
    >
      <body>
        {/* Motion starts hidden only when scripts run; without them everything shows. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.intro{display:none!important}`}</style>
        </noscript>
        {/* Returning visitors in this session skip the tea-pour before the first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("arq-intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`,
          }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Intro />
          <ScrollProgress />
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
