import { RiseText } from "./Reveal";

/** A statement on green ink whose words rise into place once, left to right. */
export default function Statement({
  text,
  children,
  id,
}: {
  text: string;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="band band--ink" aria-labelledby={id}>
      <div className="container statement">
        <RiseText id={id} className="statement__text" text={text} />
        {children}
      </div>
    </section>
  );
}
