import { Link, useSearchParams } from "react-router-dom";

// PayFast return_url landing. This is a courtesy thank-you only — payment is
// confirmed server-side via the ITN webhook, not by the buyer reaching here.
export default function OrderComplete() {
  const [params] = useSearchParams();
  const ref = params.get("m_payment_id");

  return (
    <div className="order-status">
      <div className="order-status__wrap">
        <h1 className="order-status__title">Thank you for your pre-order</h1>
        <p className="order-status__lead">
          Your order has been received. Once your payment is confirmed you’ll get a
          confirmation email, and we’ll be in touch about dispatch.
        </p>
        {ref && (
          <p className="order-status__ref">
            Order reference<br />
            <strong>{ref}</strong>
          </p>
        )}
        <p className="order-status__note">
          If payment didn’t complete, you can{" "}
          <Link to="/">return to the home page</Link> and try again. Questions?
          Email <a href="mailto:matthew@matthewwillman.co.za">matthew@matthewwillman.co.za</a>.
        </p>
        <Link className="edition__submit" to="/">Back to home</Link>
      </div>
    </div>
  );
}
