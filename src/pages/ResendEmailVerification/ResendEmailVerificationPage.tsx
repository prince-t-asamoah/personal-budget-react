import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes.constants";
import "./ResendEmailVerificationPage.css";

export default function ResendEmailVerificationPage() {
  return (
    <div className="resend-container">
      {/* Header */}
      <div className="resend-header">
        <div className="icon-container">
          <div className="resend-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
        </div>
        <h1 className="resend-title">Resend Verification</h1>
        <p className="resend-subtitle">Get a new verification link sent to your email</p>
      </div>

      {/* Body */}
      <div className="resend-body">
        <p className="intro-message">
          Enter your email address below and we&apos;ll send you a fresh verification link that will be valid for the next 24 hours.
        </p>

        {/* Form Card */}
        <div className="form-card">
          <form id="resendForm" onSubmit={(event) => event.preventDefault()}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="john.doe@example.com"
                required
              />
              <p className="error-message" id="emailError">Please enter a valid email address</p>
              <p className="form-hint">We&apos;ll send the verification link to this email address</p>
            </div>

            <button type="submit" className="submit-button" id="submitButton">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Send Verification Email
            </button>
          </form>

          {/* Success Message */}
          <div className="success-card" id="successCard">
            <div className="success-header">
              <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h3 className="success-title">Email Sent Successfully!</h3>
            </div>
            <p className="success-text">
              We&apos;ve sent a verification link to <strong id="sentEmail"></strong>. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          {/* Countdown */}
          <div className="countdown" id="countdown">
            <p className="countdown-text">
              You can request another email in <strong id="timer">60</strong> seconds
            </p>
          </div>

          {/* Info Alert */}
          <div className="info-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="info-alert-text">
              <strong>Didn&apos;t receive the email?</strong> Check your spam folder or make sure you entered the correct email address. Still having issues? <a href="mailto:support@buckety.app" className="footer-link">Contact support</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="resend-footer">
        <p className="footer-text">
          Need help? <a href="mailto:support@buckety.app" className="footer-link">Contact our support team</a> •
          <Link to={APP_ROUTES.HOME.URL} className="footer-link"> Return to Home</Link>
        </p>
      </div>
    </div>
  );
}