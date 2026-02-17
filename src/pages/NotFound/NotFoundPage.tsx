import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import { APP_ROUTES } from "../../constants/routes.constants";

export default function NotFoundPage() {
  return (
    <div className="error-container">
      {/* <!-- 404 Illustration --> */}
      <div className="error-illustration">
        {/* <!-- Floating envelope icons --> */}
        <div className="floating-envelopes">
          <svg
            className="envelope-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path
              d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>

          <svg
            className="envelope-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path
              d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>

          <svg
            className="envelope-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path
              d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>

          <svg
            className="envelope-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path
              d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* <!-- 404 Number --> */}
        <div className="error-number">404</div>
      </div>

      {/* <!-- Error Content --> */}
      <div className="error-content">
        <h1 className="error-title">Oops! Page not found</h1>
        <p className="error-description">
          We couldn't find the page you're looking for. It might have been
          moved, deleted, or perhaps it never existed. Let's get you back on
          track!
        </p>
      </div>

      {/* <!-- Action Buttons --> */}
      <div className="error-actions">
        <Link to={APP_ROUTES.DASHBOARD.URL} className="btn btn-primary">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go to Dashboard
        </Link>

        <Link to={APP_ROUTES.HOME.URL} className="btn btn-secondary">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* <!-- Search Box --> */}
      {/* <div className="search-box">
        <form className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a page..."
            id="searchInput"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div> */}

      {/* <!-- Helpful Links --> */}
      <div className="helpful-links">
        <div className="helpful-links-title">Quick Links</div>
        <div className="links-grid">
          {/* <Link to="index.html" className="helpful-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            </svg>
            <span>Envelopes</span>
          </Link> */}

          <Link to="/login" className="helpful-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span>Login</span>
          </Link>

          <Link to="/signup" className="helpful-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <span>Sign Up</span>
          </Link>

          <Link
            to={`${APP_ROUTES.HOME.URL}/#features`}
            className="helpful-link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
