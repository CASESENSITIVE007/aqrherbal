// Facts taken from arqherbal.com (fetched 2026-11-12). Nothing here is invented.

export const SHOP = "https://www.arqherbal.com";
export const WHATSAPP = "https://wa.me/7317372202";
export const COMMUNITY = "https://chat.whatsapp.com/DI09yYelqrY4QjfWZZlUz8";

export type Blend = {
  id: string;
  name: string;
  short: string;
  benefit: string;
  img: string;
  alt: string;
  href: string;
};

export const PRICE = "₹1,099";
export const WAS = "₹1,599";

export const blends: Blend[] = [
  {
    id: "blue",
    name: "Blue Tea",
    short: "Blue",
    benefit: "For healthy, glowing skin",
    img: "/img/blue.png",
    alt: "A glass cup of blue butterfly pea tea beside the navy and gold ARQ Blue Tea tin",
    href: `${SHOP}/products/natural-blue-tea`,
  },
  {
    id: "chamomile",
    name: "Chamomile Tea",
    short: "Chamomile",
    benefit: "For relaxation and rest",
    img: "/img/chamomile.png",
    alt: "Chamomile tea in golden sunlight beside its ARQ tin",
    href: `${SHOP}/products/chamomile-calm`,
  },
  {
    id: "hibiscus",
    name: "Hibiscus Glow Tea",
    short: "Hibiscus",
    benefit: "For everyday immunity",
    img: "/img/hibiscus.png",
    alt: "A ruby cup of hibiscus tea with dried petals and its ARQ tin",
    href: `${SHOP}/products/hibiscus-glow`,
  },
  {
    id: "glow",
    name: "Glowing Skin Tea",
    short: "Glowing skin",
    benefit: "A refreshing herbal cup",
    img: "/img/glow.png",
    alt: "A golden herbal tea in warm light beside the ARQ Glowing Skin tin",
    href: `${SHOP}/products/glow-and-immunity-combo`,
  },
  {
    id: "lavender",
    name: "Lavender Tea",
    short: "Lavender",
    benefit: "For slow evenings",
    img: "/img/lavender.png",
    alt: "Lavender tea with dried lavender sprigs in afternoon sun",
    href: `${SHOP}/products/lavender-dusk`,
  },
  {
    id: "stress",
    name: "Stress Relief Tea",
    short: "Stress relief",
    benefit: "For calmer days",
    img: "/img/stress.png",
    alt: "The ARQ Stress Relief tin with a cup of herbal tea",
    href: `${SHOP}/products/stress-relief-tea`,
  },
];

export const nav = [
  { href: "/#blends", label: "Shop" },
  { href: "/rituals", label: "Rituals" },
  { href: "/about", label: "About" },
  { href: "/consult", label: "Consult" },
];
