import { Link } from "react-router-dom";
import { EDITIONS, formatZAR, formatUSD } from "../data/editions.js";

const IMG = "/wp-content/uploads/homme-images";
const BOX = "/wp-content/uploads/landing-images";

// The five fine-art plates from the HOMME collection (assets already censored).
const PLATES = ["44.jpg", "31.jpg", "46.jpg", "95.jpg", "5.jpg"];

const [ED_SLIPCASE, ED_FIRST] = EDITIONS;

// Quote: centered, one entry per line.
const QUOTE = [
  "“It is immediately apparent",
  "that this project represents",
  "an extraordinary commitment of",
  "time, vision, and craftsmanship.",
  "The photographs are beautifully executed, and the quality of both the work",
  "and the production is of the highest order.”",
];

const SPECS = [
  ["Format", "12 x 10 inch / 31 x 24.5 cm"],
  ["Pages", "208 pages"],
  ["Paper", "200gsm garda premium matte museum-quality Italian fine-art paper"],
  ["Cover", "Wibalin Buckram Graphite hard cover"],
  ["Dust Jacket", "200gsm garda premium paper with satin lamination finish."],
  ["ISBN", "978-1-0483-0117-5 (hard cover)"],
];

export default function Homme() {
  return (
    <div className="homme">
      <div className="homme__wrap">
        <img
          className="homme__hero"
          src={`${IMG}/6.jpg`}
          alt="HOMME - Form. Strength. Simplicity. by Matthew Willman"
        />

        <div className="homme__text">
          <blockquote className="homme__quote">
            {QUOTE.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </blockquote>

          <p className="homme__cite">
            Robert Klein
            <br />
            Robert Klein Gallery
            <br />
            Boston, USA
          </p>

          <div className="homme__body">
            <p>
              ‘HOMME’ is a celebration of the male form as fine art. An exploration of strength,
              vulnerability, movement, and quiet humanity through the language of photography. Over
              ten years, photographer Matthew Willman created a body of work that moves beyond the
              traditional nude to reveal something more enduring: the emotional presence of the
              individual.
            </p>
            <p>
              Working with dancers, athletes, and models, he uses light, composition, and the
              natural landscape to create images that are both sculptural and deeply intimate.
              Drawing inspiration from the rich history of classical art while embracing a
              contemporary vision of masculinity, HOMME invites the viewer to see the body not as an
              object, but as a living expression of identity, grace, and resilience. Each photograph
              is an invitation to pause, to look more closely, and to appreciate the extraordinary
              beauty found in authenticity.
            </p>
            <p>
              ‘HOMME’ is a masterpiece of photography. Willman’s rich history as a former ballet
              dancer and today a significant voice in balletic photography around the world. ‘HOMME’
              is a seminal collection printed by the finest Italian printers in Verona, Italy. A true
              find for any fine-art photography book collector.
            </p>
            <p>A limited-edition book collection.</p>
            <p>Printed in Verona, Italy</p>

            <dl className="homme__specs">
              {SPECS.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <p className="homme__launch">Launch Date: October 2026</p>
          </div>
        </div>

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
            <p className="homme-edition__price">South Africa&nbsp;&nbsp;{formatZAR(ED_SLIPCASE.priceZAR)}</p>
            <p className="homme-edition__price">International {formatUSD(ED_SLIPCASE.priceUSD)}</p>
            <p className="homme-edition__price">FedEx priority included</p>
            <Link className="homme-edition__cta" to={`/checkout?edition=${ED_SLIPCASE.slug}`}>
              PRE-ORDER NOW
            </Link>
          </div>

          <div className="homme-edition">
            <div className="homme-edition__img">
              <img src={`${BOX}/homme-box-2.jpg`} alt="Signed First Edition" />
            </div>
            <h3 className="homme-edition__title">SIGNED FIRST EDITION</h3>
            <p className="homme-edition__note">Limited to 600 only</p>
            <p className="homme-edition__price">South Africa&nbsp;&nbsp;{formatZAR(ED_FIRST.priceZAR)}</p>
            <p className="homme-edition__price">International {formatUSD(ED_FIRST.priceUSD)}</p>
            <p className="homme-edition__price">FedEx priority included</p>
            <Link className="homme-edition__cta" to={`/checkout?edition=${ED_FIRST.slug}`}>
              PRE-ORDER NOW
            </Link>
          </div>
        </div>

        <p className="homme__register">
          Secure checkout - pay by card or Instant EFT via PayFast.
        </p>

        <div className="homme__gallery">
          {PLATES.map((f) => (
            <img key={f} src={`${IMG}/${f}`} alt="HOMME - fine-art photograph by Matthew Willman" loading="lazy" />
          ))}
        </div>

        <p className="homme__copyright">All images Copyright © Matthew Willman</p>
      </div>
    </div>
  );
}
