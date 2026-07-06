const EMAIL = "matthew@matthewwillman.co.za";

export default function DigitalContact() {
  return (
    <div className="d-wrap d-wrap--left">
      <h1 className="d-page-title">Contact</h1>
      <div className="d-contact">
        <p className="d-contact__label">Contact:</p>
        <p className="d-contact__email">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
