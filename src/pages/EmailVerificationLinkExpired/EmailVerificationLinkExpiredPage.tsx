import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes.constants";
import "./EmailVerificationLinkExpiredPage.css";

export default function EmailVerificationLinkExpiredPage() {
  return (
    <div className="error-container">
      {/* Header */}
      <div className="error-header">
        <div className="icon-container">
          <div className="error-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
        <h1 className="error-title">Link Expired</h1>
        <p className="error-subtitle">
          This verification link is no longer valid
        </p>
      </div>

      {/* Body */}
      <div className="error-body">
        <p className="error-message">
          Your email verification link has expired. For security reasons,
          verification links are only valid for <strong>24 hours</strong> after
          they&apos;re sent.
        </p>

        {/* Info Box */}
        <div className="info-box">
          <div className="info-box-header">
            <svg
              className="info-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <h3 className="info-title">Why did this happen?</h3>
          </div>
          <p className="info-text">
            Verification links expire to keep your account secure. This link may
            have expired because:
          </p>
          <ul className="info-list">
            <li>More than 24 hours have passed since the email was sent</li>
            <li>
              You&apos;ve already used this link to verify your email address
            </li>
            <li>
              A newer verification email has been requested for your account
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Need a New Link?</h2>
          <p className="cta-subtitle">
            No problem! We can send you a fresh verification link that will be
            valid for the next 24 hours.
          </p>
          <Link to={APP_ROUTES.RESEND_VERIFICATION.URL} className="cta-button">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Request New Verification Link
          </Link>
        </div>

        {/* Alternative Actions */}
        <div className="alternative-actions">
          <p className="alternative-title">Other Options</p>
          <div className="action-links">
            <Link to={APP_ROUTES.HOME.URL} className="action-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return to Home
            </Link>
            <a href="mailto:support@buckety.app" className="action-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Contact Support
            </a>
            <Link to={APP_ROUTES.HELP_SUPPORT.URL} className="action-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="error-footer">
        <Link to={APP_ROUTES.HOME.URL} className="footer-logo">
          <div className="footer-logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </div>
          <span className="footer-logo-text">Buckety</span>
        </Link>
        <p className="footer-text">
          Smart Envelope Budgeting - Take control of your money, one envelope at
          a time.
        </p>
        <div className="footer-links">
          <Link to={APP_ROUTES.HOME.URL} className="footer-link">
            Home
          </Link>
          <span className="footer-separator">•</span>
          <Link to={APP_ROUTES.HOME.URL} className="footer-link">
            Features
          </Link>
          <span className="footer-separator">•</span>
          <Link to={APP_ROUTES.HELP_SUPPORT.URL} className="footer-link">
            Help Center
          </Link>
          <span className="footer-separator">•</span>
          <Link to={APP_ROUTES.HOME.URL} className="footer-link">
            Privacy
          </Link>
        </div>
        <p
          className="footer-text"
          style={{ marginTop: "var(--space-4)", fontSize: "var(--text-xs)" }}
        >
          © 2026 Buckety. All rights reserved.
        </p>
      </div>
    </div>
  );
}
