import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EDITIONS, editionBySlug, formatZAR, formatUSD } from "../data/editions.js";

// Checkout: collect the buyer's details, then POST to the PHP endpoint which
// signs the request server-side and hands off to PayFast. The form is a NATIVE
// post (action=/pay/initiate.php) so it works without fetch/CORS; React only
// drives quantity so the displayed total updates.
export default function Checkout() {
  const [params] = useSearchParams();
  const edition = editionBySlug(params.get("edition"));
  const [qty, setQty] = useState(1);

  // No / unknown edition — let the visitor choose one.
  if (!edition) {
    return (
      <div className="checkout">
        <div className="checkout__wrap">
          <h1 className="checkout__title">Pre-order</h1>
          <p className="checkout__lead">Please choose an edition to pre-order:</p>
          <div className="checkout__choose">
            {EDITIONS.map((e) => (
              <Link key={e.slug} className="edition__submit" to={`/checkout?edition=${e.slug}`}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const total = edition.priceZAR * qty;

  return (
    <div className="checkout">
      <div className="checkout__wrap">
        <h1 className="checkout__title">Pre-order</h1>

        <div className="checkout__grid">
          {/* ---- Order summary ---- */}
          <aside className="checkout__summary">
            <img className="checkout__img" src={edition.image} alt={edition.name} />
            <h2 className="checkout__ed-name">{edition.name}</h2>
            {edition.note && <p className="checkout__ed-note">{edition.note}</p>}
            {edition.limit && <p className="checkout__ed-note">{edition.limit}</p>}
            <p className="checkout__ed-note">FedEx priority shipping included</p>

            <dl className="checkout__totals">
              <div>
                <dt>Price</dt>
                <dd>{formatZAR(edition.priceZAR)}</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>{qty}</dd>
              </div>
              <div className="checkout__total-row">
                <dt>Total</dt>
                <dd>{formatZAR(total)}</dd>
              </div>
            </dl>

            <p className="checkout__fx">
              You’ll be charged {formatZAR(total)} in South African Rand. International
              cards are accepted and converted by your bank; the{" "}
              {formatUSD(edition.priceUSD)} figure is an approximate guide only.
            </p>
          </aside>

          {/* ---- Buyer details -> PayFast ---- */}
          <form className="checkout__form" action="/pay/initiate.php" method="post">
            <input type="hidden" name="edition" value={edition.slug} />

            <label className="field">
              <span className="field__label">Full name</span>
              <input className="field__input" type="text" name="full_name" required autoComplete="name" />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field__label">Email</span>
                <input className="field__input" type="email" name="email" required autoComplete="email" />
              </label>
              <label className="field">
                <span className="field__label">Phone</span>
                <input className="field__input" type="tel" name="phone" autoComplete="tel" />
              </label>
            </div>

            <label className="field">
              <span className="field__label">Delivery address</span>
              <input className="field__input" type="text" name="address_line1" placeholder="Street address" required autoComplete="address-line1" />
            </label>
            <label className="field">
              <span className="field__label field__label--hidden">Address line 2</span>
              <input className="field__input" type="text" name="address_line2" placeholder="Apartment, suite, etc. (optional)" autoComplete="address-line2" />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field__label">City</span>
                <input className="field__input" type="text" name="city" required autoComplete="address-level2" />
              </label>
              <label className="field">
                <span className="field__label">Province / State</span>
                <input className="field__input" type="text" name="province" autoComplete="address-level1" />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span className="field__label">Postal code</span>
                <input className="field__input" type="text" name="postal_code" required autoComplete="postal-code" />
              </label>
              <label className="field">
                <span className="field__label">Country</span>
                <input className="field__input" type="text" name="country" defaultValue="South Africa" required autoComplete="country-name" />
              </label>
            </div>

            <label className="field">
              <span className="field__label">Quantity</span>
              <select
                className="field__input"
                name="quantity"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>

            <label className="checkout__terms">
              <input type="checkbox" required />
              <span>
                I have read and agree to the{" "}
                <Link to="/terms" target="_blank">Terms &amp; Conditions</Link> and{" "}
                <Link to="/shipping" target="_blank">Shipping &amp; Delivery Policy</Link>.
              </span>
            </label>

            <button type="submit" className="checkout__pay">
              Pay {formatZAR(total)} with PayFast
            </button>
            <p className="checkout__secure">
              You’ll be redirected to PayFast’s secure payment page to complete your order.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
