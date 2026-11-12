import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import Statement from "../components/Statement";
import { Reveal, Stagger, Item, RiseText, ImageReveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Our story",
  description: "How ARQ Herbals went back to growers, state by state, to put whole leaves and honest origins in the cup.",
};

const road = [
  ["2019", "The first tulsi batch, blended at home."],
  ["2021", "Partnerships with growers across five states."],
  ["2023", "Whole-leaf, lab-tested batches go nationwide."],
  ["2025", "Free expert consults begin."],
];

export default function About() {
  return (
    <>
      <PageHero
        title="Heritage herbal wellness, rooted in India."
        lead="We began with a simple belief, that the oldest wisdom and the freshest leaf belong in the same cup."
        img="/img/about1.png"
        alt="A glass of green herbal tea with fresh leaves on a stone ledge in dappled sun"
        slot="about-hero"
      />

      <section className="section" aria-labelledby="began-title">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="began-title" text="It began with a cup, and a question." />
            <p className="lead">Why were the shelves full of dust and flavouring?</p>
          </Reveal>
          <Reveal>
            <figure className="showcase-fig" style={{ margin: 0 }}>
              <ImageReveal className="showcase" slot="story" alt="ARQ tins on the team's desk">
                <Image src="/img/story.jpg" alt="Six ARQ tins, including Blue Tea, Glowing Skin and Energy Booster, on the team's desk" fill sizes="(min-width: 90rem) 1312px, 100vw" />
              </ImageReveal>
              <figcaption className="caption">The range, on the desk where it is checked.</figcaption>
            </figure>
          </Reveal>
          <Stagger as="div" className="prose-2">
            <Item as="div">
              <p>
                So we went back to the growers, state by state. ARQ connects tea to tea drinkers, not to distributors.
              </p>
            </Item>
            <Item as="div">
              <p>
                Founded by Abu Bakar (Hadi) and Sajid, on authenticity, trust and quality.
              </p>
            </Item>
          </Stagger>
        </div>
      </section>

      <Statement id="mission-title" text="One honest cup at a time.">
        <Reveal delay={0.3}>
          <p className="statement__more">
            Our mission is to bring clean, traceable, heritage herbal wellness into everyday life. We picture a world where
            the wisdom of Indian herbs is trusted, traceable, and quietly part of how people care for themselves.
          </p>
        </Reveal>
      </Statement>

      <section className="section" aria-labelledby="road-title">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="road-title" text="The road so far." />
          </Reveal>
          <Stagger as="ol" className="rows">
            {road.map(([y, t]) => (
              <Item key={y}>
                <span className="rows__key">{y}</span>
                <p className="rows__val">{t}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band band--ink" id="gives" aria-labelledby="gives-h">
        <div className="container pair">
          <ImageReveal className="pair__frame">
            <Image src="/img/education.jpg" alt="Students in a classroom, looking up from their open books" fill sizes="(min-width: 60rem) 40vw, 100vw" />
          </ImageReveal>
          <Reveal className="pair__text" delay={0.1}>
            <RiseText id="gives-h" text="Stronger futures, together." />
            <p>
              2% of every sale goes to children’s education. Every purchase helps bring books, learning and hope to
              children who need it the most.
            </p>
            <p>Thank you for being a part of this change.</p>
          </Reveal>
        </div>
      </section>

      <section className="section close" aria-labelledby="close-title">
        <div className="container close__in">
          <Reveal>
            <RiseText id="close-title" text="Come share a quiet cup with us." />
          </Reveal>
          <Reveal className="actions" delay={0.1}>
            <Link className="btn btn--primary" href="/#blends">
              Shop the blends
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
