# Design: ARQ Herbals

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Photographic (Ledge hero: the range fills the screen, the offer rests on a paper plate at its base)
- Theme: Garden, brand-locked to ARQ Herbals (spec in `.hallmark/brand-spec.md`)
- Axes: light/roman-serif/chromatic-green · posture: committed
- Hero per route: Ledge (/), Poster plate (/about, /rituals), Stage split (/consult)

## Tokens
`app/tokens.css` is the source of truth; `app/globals.css` `:root` sets the redesign's type scale and radii. The roles:
```css
:root {
  --color-paper: oklch(95.8% 0.024 90);  --color-paper-2: oklch(92.6% 0.030 90);  --color-paper-3: oklch(89% 0.034 90);
  --color-ink: oklch(23% 0.050 152);  --color-ink-2: oklch(33% 0.048 150);  --color-muted: oklch(46% 0.034 142);  --color-rule: oklch(83% 0.024 112);
  --color-accent: oklch(38% 0.085 152);  --color-accent-2: oklch(80% 0.085 85);  --color-accent-ink: oklch(97% 0.015 95);  --color-focus: oklch(42% 0.12 150);
  --color-band: oklch(26% 0.045 155);  --color-band-ink: oklch(94% 0.025 90);  --color-seal: oklch(66% 0.095 80);
  --font-display: "Cormorant Garamond" 500, Georgia, serif;  --font-body: "Hanken Grotesk", system-ui, sans-serif;  --font-outlier: "Newsreader" (captions only);
  --radius-card: 2px;  --radius-pill: 2px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, easings and durations are the scaffold's and live in `tokens.css`.

## Controls
- Primary: forest green fill (`--color-accent`), oat text, 2px radius, 48px tall, a soft light sweep on hover
- Secondary: 1px `--color-rule-2` outline, same radius and height; links underline in ink, an accent line grows on hover

## Motion
- Character: calm. Framer Motion, by the owner's request: the tea-pour intro once per session, headings rise word by word, photographs unveil, one stagger per list. Transform and opacity only; under reduced motion everything ends at once and the intro is skipped.

## Exports
`app/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
