import Link from "next/link";
import BlendCounter from "./components/BlendCounter";
import OriginMap from "./components/OriginMap";
import Statement from "./components/Statement";
import Ingredients from "./components/Ingredients";
import BrewFigures from "./components/BrewFigures";
import BlendRail from "./components/BlendRail";
import { DiffTable, ConsultBand } from "./components/HomeBlocks";
import { Reveal } from "./components/Reveal";

export default function Home() {
  return (
    <>
      <BlendCounter />
      <DiffTable />
      <OriginMap />
      <Statement id="gives-title" text="2% of every sale goes to a child’s education.">
        <Reveal delay={0.4}>
          <p className="statement__more">
            Books, learning and hope for children who need it most.{" "}
            <Link href="/about#gives" className="link link--light">
              How the 2% works
            </Link>
          </p>
        </Reveal>
      </Statement>
      <Ingredients />
      <BrewFigures />
      <ConsultBand />
      <BlendRail />
    </>
  );
}
