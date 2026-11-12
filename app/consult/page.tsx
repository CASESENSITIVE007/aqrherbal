import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { Reveal, Stagger, Item, RiseText } from "../components/Reveal";
import { WHATSAPP, COMMUNITY } from "../data";

export const metadata: Metadata = {
  title: "Talk to a herbal expert",
  description: "Free WhatsApp community, a ₹99 one-on-one consultation, or a ₹799 monthly wellness programme with ARQ's herbal experts.",
};

export default function Consult() {
  return (
    <>
      <PageHero
        title="Not sure what suits you?"
        lead="Honest guidance from a herbal expert, free with your first order and never a hard sell."
        img="/img/reading.png"
        alt="A grandmother and her granddaughter reading together, a cup of herbal tea on the table"
        slot="consult-hero"
        focus="28% 50%"
      >
        <a className="btn btn--primary" href={WHATSAPP}>
          Book a free consult
        </a>
        <a className="link" href={COMMUNITY}>
          Join the community channel
        </a>
      </PageHero>

      <section className="section" aria-labelledby="how-h">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="how-h" text="Three steps to your blend." />
            <p className="lead">With Dr. Aishwarya Nair, BAMS, and Kavya Menon, clinical herbalist.</p>
          </Reveal>
          <Stagger as="ol" className="steps">
            <Item>
              <h3>Share your goal</h3>
              <p>Sleep, calm, skin, digestion: tell us how you want to feel.</p>
            </Item>
            <Item>
              <h3>Get a recommendation</h3>
              <p>An expert suggests the blend and the ritual that fit.</p>
            </Item>
            <Item>
              <h3>Start your ritual</h3>
              <p>Brew it, then check back in on how it is going.</p>
            </Item>
          </Stagger>
        </div>
      </section>

      <section className="band band--paper" aria-labelledby="tiers-h">
        <div className="container">
          <Reveal className="head-split">
            <RiseText id="tiers-h" text="Choose how much help you want." />
          </Reveal>
          <Stagger as="ul" className="tiers">
            <Item>
              <h3>Free WhatsApp health community</h3>
              <p className="tiers__price">Free</p>
              <ul>
                <li>Access to doctors and wellness experts</li>
                <li>For general education only</li>
              </ul>
              <a className="btn" href={COMMUNITY}>
                Join the community
              </a>
            </Item>
            <Item>
              <h3>Personal herbal consultation</h3>
              <p className="tiers__price">
                ₹99<small>one session</small>
              </p>
              <ul>
                <li>One-on-one with a wellness doctor</li>
              </ul>
              <a className="btn" href={WHATSAPP}>
                Book for ₹99
              </a>
            </Item>
            <Item>
              <h3>Monthly wellness programme</h3>
              <p className="tiers__price">
                ₹799<small>a month</small>
              </p>
              <ul>
                <li>A consultation every month</li>
                <li>A diet plan made for you</li>
                <li>Progress tracking and follow-ups</li>
              </ul>
              <a className="btn" href={WHATSAPP}>
                Start the programme
              </a>
              <p className="tiers__note">Cancel any time. No lock-in.</p>
            </Item>
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="close-title" style={{ paddingTop: "var(--section-gap-l)" }}>
        <div className="container close__in">
          <Reveal>
            <RiseText id="close-title" text="We are here whenever you are ready." />
          </Reveal>
          <Reveal className="actions" delay={0.1}>
            <a className="btn btn--quiet" href={WHATSAPP}>
              Message us on WhatsApp
            </a>
          </Reveal>
        </div>
        <div className="container">
          <Reveal>
            <p className="note" style={{ marginTop: "var(--space-2xl)" }}>
              An ARQ consult is wellness guidance to help you choose a blend, not a substitute for medical advice. If you
              are pregnant, nursing or on medication, please consult your doctor first.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
