// Shared shell for the legal / policy pages: consistent title, meta line and
// a readable prose column. Content is passed in as children.
export default function LegalPage({ title, effectiveDate, children }) {
  return (
    <div className="legal">
      <div className="legal__wrap">
        <h1 className="legal__title">{title}</h1>
        <p className="legal__meta">
          Website:{" "}
          <a href="https://www.matthewwillman.com">www.matthewwillman.com</a>
          <br />
          Effective Date: {effectiveDate}
        </p>
        {children}
      </div>
    </div>
  );
}
