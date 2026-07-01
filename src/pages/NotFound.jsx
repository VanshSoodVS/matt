import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="page__title">Page not found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <p>
          <Link to="/" className="portal-tile__button">
            Return home
          </Link>
        </p>
      </div>
    </div>
  );
}
