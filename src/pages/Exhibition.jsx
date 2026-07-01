const BANNER = "/wp-content/uploads/2026/04/Exhibitions-2.jpg";

const venues = [
  "The National Underground Railroad Freedom Center – Cincinnati, Ohio, USA",
  "The Bill Clinton Presidential Library – Little Rock, Arkansas USA",
  "The Heritage Collection – The Vlinderpaleis, Antwerp Belgium",
  "Bonhams SA Art Exhibition & Auction – London, UK",
  "Finding Hope – Conner Prairie, Indianapolis, USA",
  "Areteos Gallery, Central, Hong Kong",
  "World Human Rights Day – South African High Commission, London, UK",
  "Oxfam International – Perth, Sydney, Melbourne, Canberra, Australia",
  "The Robben Island Collection – Cardiff, Wales",
  "The Thon Dittmar Palais – Regensburg, Germany",
  "The South African Embassy – Berlin, Germany",
  "Retrospective Series - DEG Bank – Cologne, Germany",
  "A Peoples Hope - World Congress on HIV & Aids – Mexico City, Mexico",
  "The Willman Collection – CHIVA Africa Exhibition – Pall Mall, London, UK",
  "‘Prisoner in the Garden’ – The Nelson Mandela Foundation – Houghton, South Africa",
  "Vukukhanye: Rising Up – Tromso, Norway",
  "‘In our Hands’ Mandela & Rhino – Bowral, New South Wales, Australia",
  "Mosi-oa-Tunya – The Royal Livingstone, Victoria Falls Collection – Livingstone, Zambia",
  "Solo Exhibition - Spier Arts Trust – Cape Town",
  "BLACK – The Hamilton Gallery – Cape Town",
  "Caudan Art Centre – Port Louis – Mauritius",
  "Street Life – Soho Gallery – London",
  "PRIVATE SPACE – Cape Town",
];

export default function Exhibition() {
  return (
    <div className="page">
      <div className="container">
        <figure className="exhibition__banner">
          <img src={BANNER} alt="Matthew Willman exhibitions" />
        </figure>

        <p className="exhibition__quote">
          “Matthew has the ability to see and creatively narrate the essence of life where it is
          found, his work is seminal in its vision and iconic by its very nature” —{" "}
          <strong>former chairman of Walt Disney, John Pepper</strong>
        </p>

        <h2
          className="page__title"
          style={{ fontSize: "1.3rem", textAlign: "left", maxWidth: "820px", margin: "0 0 0.8em" }}
        >
          Selection of Museums, Galleries &amp; Exhibitions where Willman’s work has exhibited and
          housed.
        </h2>

        <ul className="exhibition__list">
          {venues.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
