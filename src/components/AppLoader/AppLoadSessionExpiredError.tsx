import "./AppLoader.css";
import { APP_ROUTES } from "../../constants/routes.constants";
import { Link } from "react-router-dom";

export function AppLoadSessionExpiredError() {
  return (
    <div className="splash-error-container">
      {/* <!-- Error --> */}
      <div className="splash-failed">
        <div className="error-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <line x1="12" y1="16" x2="12" y2="18" />
          </svg>
        </div>

        <h2 className="error-title">Session Expired</h2>
        <p className="error-message">
          Your session has expired for security reasons. Please sign in again to
          continue.
        </p>

        <div className="error-code">ERR_AUTH_EXPIRED</div>

        <div className="error-actions">
          <Link className="btn btn-primary" to={APP_ROUTES.LOGIN.URL}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
