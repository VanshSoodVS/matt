import { Link } from "react-router-dom";
import { books } from "../data/books.js";

export default function Books() {
  return (
    <div className="d-wrap">
      <div className="d-books">
        {books.map((book) => (
          <article
            className={`d-book${book.tag ? " d-book--featured" : ""}`}
            key={book.title}
          >
            {book.tag && <span className="d-book__tag">{book.tag}</span>}
            <div className="d-book__cover">
              <img src={book.cover} alt={book.title} loading="lazy" />
            </div>
            <div className="d-book__body">
              <h2 className="d-book__title">{book.title}</h2>
              {book.paragraphs.map((p, i) =>
                p.startsWith("**") ? (
                  <p key={i}>
                    <strong>{p.slice(2)}</strong>
                  </p>
                ) : (
                  <p key={i}>{p}</p>
                )
              )}
              {book.link && (
                <Link className="d-book__link" to={book.link}>
                  Order &amp; View
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
