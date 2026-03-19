import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./ResetPasswordPage.css";

export default function ResetPasswordPage() {
	useDocumentTitle("Reset Password");

	return (
		<div className="reset-page">
			<div className="reset-header">
				<div className="reset-icon-container">
					<div className="reset-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
						</svg>
					</div>
				</div>
				<h1 className="reset-title">Reset Password</h1>
				<p className="reset-subtitle">Create a new secure password for your account</p>
			</div>

			<div className="reset-body">
				<p className="reset-intro-message">
					Enter your new password below. Make sure it&apos;s strong and unique to keep your
					account secure.
				</p>

				<div className="reset-form-card">
					<div className="reset-info-alert">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="16" x2="12" y2="12" />
							<line x1="12" y1="8" x2="12.01" y2="8" />
						</svg>
						<p className="reset-info-alert-text">
							<strong>Create a strong password:</strong> Use at least 8 characters with a mix
							of uppercase, lowercase, numbers, and symbols.
						</p>
					</div>

					<form className="reset-form" onSubmit={(event) => event.preventDefault()} noValidate>
						<div className="reset-form-group">
							<label htmlFor="password" className="reset-form-label">
								New Password
							</label>
							<div className="reset-password-input-wrapper">
								<input
									type="password"
									id="password"
									name="password"
									className="reset-form-input"
									placeholder="Enter your new password"
									autoComplete="new-password"
								/>
								<button type="button" className="reset-toggle-password" aria-label="Toggle password visibility">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
								</button>
							</div>
							<p className="reset-error-message">Password does not meet requirements</p>

							<div className="reset-password-strength" aria-hidden="true">
								<div className="reset-strength-label">Password Strength</div>
								<div className="reset-strength-bar-container">
									<div className="reset-strength-bar weak" />
								</div>
								<span className="reset-strength-text weak">Weak</span>
							</div>

							<ul className="reset-requirements-list" aria-hidden="true">
								<li>At least 8 characters long</li>
								<li>Contains uppercase letter (A-Z)</li>
								<li>Contains lowercase letter (a-z)</li>
								<li>Contains number (0-9)</li>
								<li>Contains special character (!@#$%^&amp;*)</li>
							</ul>
						</div>

						<div className="reset-form-group">
							<label htmlFor="confirmPassword" className="reset-form-label">
								Confirm New Password
							</label>
							<div className="reset-password-input-wrapper">
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									className="reset-form-input"
									placeholder="Re-enter your new password"
									autoComplete="new-password"
								/>
								<button type="button" className="reset-toggle-password" aria-label="Toggle password visibility">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
								</button>
							</div>
							<p className="reset-error-message">Passwords do not match</p>
							<p className="reset-form-hint">Both passwords must match</p>
						</div>

						<button type="submit" className="reset-submit-button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Reset Password
						</button>
					</form>
				</div>
			</div>

			<div className="reset-footer">
				<p className="reset-footer-text">
					Need help?{" "}
					<a href="mailto:support@buckety.app" className="reset-footer-link">
						Contact our support team
					</a>{" "}
					•{" "}
					<NavLink to={APP_ROUTES.LOGIN.URL} className="reset-footer-link">
						Back to Login
					</NavLink>
				</p>
			</div>
		</div>
	);
}
