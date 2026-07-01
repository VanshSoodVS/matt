import { visualProcess } from "../data/collections.js";

// Shared closing "visual process" note used on several collection pages.
export default function VisualProcess({ variant = "short" }) {
  const paras = visualProcess[variant] || visualProcess.short;
  return (
    <section className="visual-process">
      <h3>The visual process:</h3>
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
