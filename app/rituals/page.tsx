import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import BrewSwitch from "../components/BrewSwitch";
import { Reveal, Stagger, Item, RiseText } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Rituals",
  description: "How to brew ARQ herbal tea, hot or iced, with a tip for each blend and three recipes beyond the cup.",
};

const tips = [
  ["Blue Tea", "Watch the colour change", "Squeeze in lemon and the blue cup turns purple."],
  ["Chamomile Calm", "Keep the steep short", "A short steep keeps the flower soft and sweet."],
  ["Hibiscus Glow", "Give it longer", "A longer steep brings out the tart red petal."],
  ["Giloy Guard", "Add honey", "A spoon of honey rounds it out."],
];

const recipes = [
  ["Blue lemon cooler", "Brew two Blue Tea bags in 240 ml for five minutes. Pour over ice and add lemon."],
  ["Hibiscus spritz", "Chill a strong hibiscus brew, then top with soda water and a slice of orange."],
  ["Chamomile honey iced", "Steep chamomile for three minutes, stir in honey, cool, and add mint."],
];

export default function Rituals() {
  return (
    <>
      <PageHero
        title="The art of a simple cup."
        lead="Good tea asks very little of you: fresh water, a quiet few minutes, and a leaf worth waiting for."
        img="/img/ritual.png"
        alt="A stoneware cup of tea on green linen, with the shadow of leaves on the wall"
        slot="ritual-hero"
      />

      <section className="section" aria-labelledby="brew-h">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="brew-h" text="Brew it hot or iced." />
            <p className="lead">The same three steps, with two small changes for a cold glass.</p>
          </Reveal>
          <BrewSwitch />
        </div>
      </section>

      <section className="section" aria-labelledby="tips-h">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="tips-h" text="One tip for each blend." />
          </Reveal>
          <Stagger as="ul" className="rows">
            {tips.map(([name, tip, line]) => (
              <Item key={name}>
                <span className="rows__key rows__key--title">{name}</span>
                <p className="rows__val">
                  <b>{tip}</b>
                  {line}
                </p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band band--paper" aria-labelledby="recipes-h">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="recipes-h" text="Three glasses beyond the cup." />
          </Reveal>
          <Stagger as="ol" className="trio">
            {recipes.map(([t, d], i) => (
              <Item key={t}>
                <span className="trio__n" aria-hidden="true">{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="small-h" style={{ paddingTop: "var(--section-gap-l)" }}>
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="small-h" text="Small things that matter." />
          </Reveal>
          <Stagger as="div" className="dodont">
            <Item as="div">
              <h3>Do</h3>
              <ul>
                <li>Use fresh, just-boiled water</li>
                <li>Store the tin in a cool, dry place</li>
              </ul>
            </Item>
            <Item as="div">
              <h3>Do not</h3>
              <ul>
                <li>Store it near spices</li>
              </ul>
            </Item>
          </Stagger>
        </div>
      </section>

      <section className="section close" aria-labelledby="close-title">
        <div className="container close__in">
          <Reveal>
            <RiseText id="close-title" text="Ready to brew?" />
          </Reveal>
          <Reveal className="actions" delay={0.1}>
            <Link className="btn btn--primary" href="/#blends">
              Shop the blends
            </Link>
            <Link className="link" href="/consult">
              Ask which blend suits you
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
