import { Link } from "react-router-dom";

// PayFast cancel_url landing - the buyer backed out before paying.
export default function OrderCancelled() {
  return (
    <div className="order-status">
      <div className="order-status__wrap">
        <h1 className="order-status__title">Payment cancelled</h1>
        <p className="order-status__lead">
          Your payment was cancelled and you have not been charged. Your pre-order
          was not placed.
        </p>
        <p className="order-status__note">
          Changed your mind by accident? You can start again from the home page.
          Questions? Email{" "}
          <a href="mailto:matthew@matthewwillman.co.za">matthew@matthewwillman.co.za</a>.
        </p>
        <Link className="edition__submit" to="/">Back to home</Link>
      </div>
    </div>
  );
}
