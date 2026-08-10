import LegalPage from "../../components/LegalPage.jsx";

const DELIVERY_TIMES = [
  ["South Africa", "2–7 business days"],
  ["Southern Africa", "5–10 business days"],
  ["Europe", "5–10 business days"],
  ["United Kingdom", "5–10 business days"],
  ["North America", "5–12 business days"],
  ["Australia & New Zealand", "7–14 business days"],
  ["Rest of the World", "7–15 business days"],
];

export default function Shipping() {
  return (
    <LegalPage title="Shipping & Delivery Policy" effectiveDate="1 August 2026">
      <p>Thank you for purchasing from Matthew Willman Photography.</p>
      <p>
        We are committed to ensuring that every order is carefully prepared, securely packaged and
        delivered safely to its destination.
      </p>
      <p>
        This Shipping &amp; Delivery Policy explains how orders are processed, shipped and
        delivered.
      </p>

      <h2>1. Order Processing</h2>
      <p>Orders are processed once full payment has been successfully received.</p>
      <p>
        Orders are generally processed within 2–5 business days, excluding weekends and South
        African public holidays.
      </p>
      <p>
        During periods of high demand, new product launches or promotional campaigns, processing
        times may be slightly longer. If there are any significant delays, we will notify you using
        the contact details provided with your order.
      </p>

      <h2>2. Shipping Destinations</h2>
      <p>We ship throughout South Africa and to selected international destinations.</p>
      <p>
        If your country is not available during checkout, please contact us and we will advise
        whether shipping can be arranged.
      </p>

      <h2>3. Delivery Methods</h2>
      <p>Orders are shipped using reputable courier partners selected according to the destination.</p>
      <p>Depending on your location, deliveries may be made by:</p>
      <ul>
        <li>National courier services</li>
        <li>International courier services</li>
        <li>Express courier services (where available)</li>
      </ul>
      <p>
        A tracking number will be provided once your order has been dispatched, allowing you to
        monitor the progress of your shipment.
      </p>

      <h2>4. Estimated Delivery Times</h2>
      <p>
        The following delivery times are estimates only and may vary depending on courier
        operations, customs processing and local conditions.
      </p>
      <div className="legal__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Estimated Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY_TIMES.map(([region, time]) => (
              <tr key={region}>
                <td>{region}</td>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Delivery times begin once your order has been dispatched and should not be interpreted as
        guaranteed delivery dates.
      </p>

      <h2>5. Shipping Charges</h2>
      <p>Shipping costs are calculated during checkout based on factors such as:</p>
      <ul>
        <li>destination;</li>
        <li>package weight and dimensions;</li>
        <li>courier rates;</li>
        <li>selected shipping service.</li>
      </ul>
      <p>The final shipping cost will be displayed before payment is completed.</p>

      <h2>6. Packaging</h2>
      <p>
        Every book is carefully inspected before dispatch and packaged using high-quality
        protective materials designed to minimise the risk of damage during transit.
      </p>
      <p>
        Where appropriate, limited editions and collector’s publications may receive enhanced
        protective packaging.
      </p>

      <h2>7. Delivery Address</h2>
      <p>
        Customers are responsible for ensuring that all delivery information is complete and
        accurate.
      </p>
      <p>
        We cannot accept responsibility for delays, failed deliveries or additional courier charges
        resulting from incorrect or incomplete delivery details.
      </p>
      <p>
        If a parcel is returned to us because of an incorrect address or repeated unsuccessful
        delivery attempts, additional shipping charges may apply before the order is resent.
      </p>

      <h2>8. International Orders</h2>
      <p>
        International customers are responsible for complying with the import requirements of their
        destination country.
      </p>
      <p>Any applicable:</p>
      <ul>
        <li>customs duties;</li>
        <li>import taxes;</li>
        <li>value-added tax (VAT);</li>
        <li>brokerage fees;</li>
        <li>customs clearance charges; or</li>
        <li>other government-imposed fees</li>
      </ul>
      <p>
        are the sole responsibility of the customer unless expressly stated otherwise during
        checkout.
      </p>
      <p>These charges are not included in the purchase price or shipping fee.</p>

      <h2>9. Customs Delays</h2>
      <p>International shipments may be delayed due to customs inspections or border processing.</p>
      <p>
        Such delays are beyond our control, and we cannot guarantee delivery times once a shipment
        has entered customs.
      </p>

      <h2>10. Delivery Confirmation</h2>
      <p>
        A delivery is considered complete when the courier records the parcel as delivered to the
        address provided by the customer.
      </p>
      <p>
        Where permitted by the courier, delivery may be made to another adult present at the
        delivery address.
      </p>
      <p>
        Customers are encouraged to monitor shipment tracking and make arrangements to receive
        deliveries promptly.
      </p>

      <h2>11. Damaged Deliveries</h2>
      <p>If your parcel arrives visibly damaged:</p>
      <ul>
        <li>photograph the package before opening it;</li>
        <li>retain all packaging materials;</li>
        <li>inspect the contents immediately; and</li>
        <li>notify us within 48 hours of delivery.</li>
      </ul>
      <p>Please include:</p>
      <ul>
        <li>your order number;</li>
        <li>photographs of the packaging;</li>
        <li>photographs of the damaged item(s); and</li>
        <li>a brief description of the damage.</li>
      </ul>
      <p>
        We will work with the courier to investigate the matter and, where appropriate, arrange a
        replacement or refund in accordance with our Refund &amp; Returns Policy.
      </p>

      <h2>12. Lost Shipments</h2>
      <p>
        If tracking indicates that a shipment has been lost in transit, please contact us promptly.
      </p>
      <p>We will liaise with the courier to investigate the matter.</p>
      <p>If the shipment is confirmed as lost, we will, at our discretion:</p>
      <ul>
        <li>send a replacement (subject to stock availability); or</li>
        <li>issue a full refund.</li>
      </ul>

      <h2>13. Failed Deliveries</h2>
      <p>If a delivery cannot be completed because:</p>
      <ul>
        <li>no one is available to receive the parcel;</li>
        <li>the delivery address is incorrect;</li>
        <li>delivery instructions are insufficient; or</li>
        <li>
          the parcel is not collected from a designated collection point within the required
          timeframe,
        </li>
      </ul>
      <p>the parcel may be returned to us.</p>
      <p>Additional shipping charges may apply before the order is resent.</p>

      <h2>14. Force Majeure</h2>
      <p>
        We are not responsible for delays caused by circumstances beyond our reasonable control,
        including but not limited to:
      </p>
      <ul>
        <li>severe weather conditions;</li>
        <li>natural disasters;</li>
        <li>strikes or labour disputes;</li>
        <li>civil unrest;</li>
        <li>customs inspections;</li>
        <li>transport disruptions;</li>
        <li>government restrictions;</li>
        <li>pandemics;</li>
        <li>power outages; or</li>
        <li>other unforeseen events.</li>
      </ul>

      <h2>15. Pre-Orders</h2>
      <p>From time to time, we may offer books for pre-order.</p>
      <p>Where a product is purchased on a pre-order basis:</p>
      <ul>
        <li>the estimated shipping date will be displayed on the product page;</li>
        <li>payment is taken at the time the order is placed unless otherwise stated;</li>
        <li>delivery timeframes commence only once the order has been dispatched.</li>
      </ul>
      <p>If the release date changes, customers will be notified as soon as reasonably practicable.</p>

      <h2>16. Limited Edition Publications</h2>
      <p>Certain books are produced in strictly limited quantities.</p>
      <p>Every reasonable effort will be made to fulfil confirmed orders.</p>
      <p>
        Should circumstances beyond our control prevent fulfilment, customers will receive a full
        refund.
      </p>

      <h2>17. Contact Us</h2>
      <p>If you have any questions regarding shipping or delivery, please contact:</p>
      <p className="legal__contact">
        Matthew Willman Photography
        <br />
        Website: <a href="https://www.matthewwillman.com">www.matthewwillman.com</a>
        <br />
        Email: <a href="mailto:matthew@matthewwillman.co.za">matthew@matthewwillman.co.za</a>
        <br />
        Telephone: +27 82 836 5787
        <br />
        Business Address: PO BOX 761, Kloof 3640
      </p>
    </LegalPage>
  );
}
