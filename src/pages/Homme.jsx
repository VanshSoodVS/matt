const IMG = "/wp-content/uploads/homme-images";
const BOX = "/wp-content/uploads/landing-images";

// The five fine-art plates from the HOMME collection (assets already censored).
const PLATES = ["5.jpg", "31.jpg", "46.jpg", "44.jpg", "95.jpg"];

// NOTE: the body copy, production details and quote attribution below are
// placeholders — the exact wording wasn't legible in the reference. Replace
// with the final copy when available.
export default function Homme() {
  return (
    <div className="homme">
      <div className="homme__wrap">
        <img
          className="homme__hero"
          src={`${IMG}/6.jpg`}
          alt="HOMME — Form. Strength. Simplicity. by Matthew Willman"
        />

        <blockquote className="homme__quote">
          “It is immensely apparent that this project represents an extraordinary commitment of
          time, vision, and craftsmanship. The photographs are beautifully executed, and the scale
          of both the work and the production is of the highest order.”
          <cite>— Robert Fear</cite>
        </blockquote>

        <div className="homme__intro">
          <p>
            HOMME is a study of the male form — an exploration of strength, restraint and
            vulnerability rendered through Matthew Willman’s signature black-and-white language.
            Photographed over several years, the collection distils the body to its essential
            lines: form, tension, and stillness.
          </p>
          <p>
            Printed and bound to the highest archival standards, HOMME is both a photographic
            monograph and a collector’s object — a limited, numbered edition intended to endure.
          </p>
        </div>

        <dl className="homme__specs">
          <div><dt>Format</dt><dd>Hardcover, cloth-bound with foil detailing</dd></div>
          <div><dt>Pages</dt><dd>224</dd></div>
          <div><dt>Plates</dt><dd>110 duotone photographs</dd></div>
          <div><dt>Paper</dt><dd>200gsm matt art</dd></div>
          <div><dt>Size</dt><dd>300 × 360 mm</dd></div>
          <div><dt>Print</dt><dd>Offset lithography, produced under the artist’s supervision</dd></div>
        </dl>

        <img
          className="homme__feature"
          src={`${IMG}/8.jpg`}
          alt="HOMME limited edition book"
        />

        <h2 className="homme__offerings">
          The HOMME Limited Edition Collection book
          <br />
          is available in two offerings:
        </h2>

        <div className="homme__editions">
          <div className="homme-edition">
            <div className="homme-edition__img">
              <img src={`${BOX}/homme-box-1.jpg`} alt="Collector’s Slipcase Edition" />
            </div>
            <h3 className="homme-edition__title">COLLECTOR’S SLIPCASE EDITION</h3>
            <p className="homme-edition__note">
              Including original giclee signed print &amp; certificate
              <br />
              Limited to 150 only
            </p>
            <p className="homme-edition__price">South Africa&nbsp;&nbsp;R3 950</p>
            <p className="homme-edition__price">International US$ 380</p>
            <p className="homme-edition__price">FedEx priority included</p>
          </div>

          <div className="homme-edition">
            <div className="homme-edition__img">
              <img src={`${BOX}/homme-box-2.jpg`} alt="Signed First Edition" />
            </div>
            <h3 className="homme-edition__title">SIGNED FIRST EDITION</h3>
            <p className="homme-edition__note">Limited to 600 only</p>
            <p className="homme-edition__price">South Africa&nbsp;&nbsp;R2 950</p>
            <p className="homme-edition__price">International US$ 280</p>
            <p className="homme-edition__price">FedEx priority included</p>
          </div>
        </div>

        <div className="homme__gallery">
          {PLATES.map((f) => (
            <img key={f} src={`${IMG}/${f}`} alt="HOMME — fine-art photograph by Matthew Willman" loading="lazy" />
          ))}
        </div>

        <p className="homme__copyright">All images Copyright © Matthew Willman</p>
      </div>
    </div>
  );
}
