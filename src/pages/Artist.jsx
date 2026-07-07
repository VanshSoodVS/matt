import VisualProcess from "../components/VisualProcess.jsx";

const PORTRAIT = "/wp-content/uploads/2026/04/Portrait-1024x957.jpg";

const bio = [
  "Matthew Willman is a South African fine art photographer whose work exists at the intersection of memory, identity, and legacy. Rooted in a deeply personal creative philosophy, his images transcend documentation, becoming enduring meditations on presence, humanity, and the passage of time.",
  "Emerging from a background in classical ballet, Willman brings a refined sensitivity to form, movement, and emotional resonance—qualities that shape his distinctive visual language. His practice is not bound by the immediacy of reportage, but instead seeks to distil experience into timeless, contemplative works that invite reflection and connection across cultures and generations.",
  "Working across continents for over two and a half decades, Willman has created an expansive body of work that moves fluidly between portraiture, conceptual narrative, and cultural storytelling. His images are marked by an intimate stillness and a deliberate sense of composition, positioning each subject not merely as a moment captured, but as part of a broader human continuum.",
  "A defining dimension of his artistic legacy is his close collaboration with Nelson Mandela, through which Willman was entrusted with documenting not just a life, but a global symbol of dignity, resilience, and transformation. These works now form part of an enduring archive, contributing to the visual heritage of one of the most significant figures in modern history.",
  "At its core, Willman’s practice is an exploration of what it means to see—and to truly witness. His work resists the transient, instead striving to create images that endure: works that hold space for reflection, provoke emotional depth, and stand as lasting testaments to the human spirit.",
];

export default function Artist() {
  return (
    <div className="page artist-page">
      <div className="container">
        <h1 className="artist__title">Artist</h1>

        <div className="artist">
          <div className="artist__body">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <figure className="artist__portrait">
            <img src={PORTRAIT} alt="Matthew Willman" />
          </figure>
        </div>

        <div className="artist__extra">
          <VisualProcess variant="extended" />

          <p className="artist__quote">
            “Matthew is passionately connected to the complexity of his existence and those around
            him. I’m sure of Matthew’s gift, it’s not an issue… he connects with his passion… the
            rest just follows.”
            <br />— Annie Lennox, Musician / Songwriter
          </p>
        </div>
      </div>
    </div>
  );
}
