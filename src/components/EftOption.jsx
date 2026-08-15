import { BANKING, ORDERS_EMAIL } from "../data/banking.js";
import { formatZAR } from "../data/editions.js";

// EFT / bank-transfer alternative shown under the card button on checkout.
// EFT is South-Africa-only and charged at the SA Rand price (no card involved),
// so the buyer transfers the amount below and emails proof of payment.
export default function EftOption({ edition, qty }) {
  const amount = edition ? edition.priceZAR * qty : 0;

  const subject = `HOMME EFT pre-order - ${edition ? edition.name : ""}`;
  const body =
    "I have paid by EFT for my HOMME pre-order (proof of payment attached).\n\n" +
    (edition ? `Edition: ${edition.name}\n` : "") +
    `Quantity: ${qty}\n` +
    `Amount paid: ${formatZAR(amount)}\n\n` +
    "Full name:\n" +
    "Delivery address:\n" +
    "Contact number:\n";
  const mailtoProof = `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const rows = [
    ["Amount to pay", formatZAR(amount)],
    ["Account holder", BANKING.accountHolder],
    ["Bank", BANKING.bank],
    ["Account number", BANKING.accountNumber],
    ["Branch code", BANKING.branchCode],
    ["Account type", BANKING.accountType],
    ["Reference", BANKING.reference],
  ];

  return (
    <section className="eft">
      <div className="eft__divider">
        <span>or</span>
      </div>

      <h3 className="eft__title">
        Prefer to pay by EFT? <span className="eft__title-note">South Africa only</span>
      </h3>

      <p className="eft__lead">
        South African customers can pay by direct bank transfer (EFT) instead of by card.
        Transfer the amount below to our account, using your <strong>full name</strong> as
        the payment reference. Then email your <strong>proof of payment</strong> - together
        with your name, the edition and quantity, and the delivery address of your nearest <b>PostNet</b> - to{" "}
        <a href={`mailto:${ORDERS_EMAIL}`}>{ORDERS_EMAIL}</a>, and we’ll confirm your order
        and reserve your copy. EFT is available for South African orders only; international
        orders should use the card payment above.
      </p>

      <dl className="eft__details">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <a className="eft__email-btn" href={mailtoProof}>
        Email your proof of payment
      </a>
    </section>
  );
}
