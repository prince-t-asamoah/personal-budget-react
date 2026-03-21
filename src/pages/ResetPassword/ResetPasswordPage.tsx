import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { APP_ROUTES } from "../../constants/routes.constants";
import { NAVIGATION_TIMEOUT } from "../../constants/ui.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useNotification from "../../hooks/useNotification";
import type { ErrorApiResponse, SuccessApiResponse } from "../../models/api.model";
import type { ResetPasswordFormData } from "../../models/auth.model";
import { resetPassword, validateResetToken } from "../../services/apis/authApi.service";
import "./ResetPasswordPage.css";

type PasswordRequirements = {
	length: boolean;
	hasUppercase: boolean;
	hasLowercase: boolean;
	hasNumber: boolean;
	hasSpecialCharacter: boolean;
};

type PasswordStrengthLevel = "weak" | "medium" | "strong";

const getPasswordRequirements = (password: string): PasswordRequirements => {
	return {
		length: password.length >= 12,
		hasUppercase: /[A-Z]/.test(password),
		hasLowercase: /[a-z]/.test(password),
		hasNumber: /\d/.test(password),
		hasSpecialCharacter: /[^A-Za-z0-9]/.test(password),
	};
};

export default function ResetPasswordPage() {
	useDocumentTitle("Reset Password");
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const notification = useNotification();
	const token = searchParams.get("token") ?? "";
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isTokenValid, setIsTokenValid] = useState(false);
	const validationAttempted = useRef(false);

	const getStrengthLevel = (score: number): PasswordStrengthLevel => {
		if (score <= 2) {
			return "weak";
		}

		if (score <= 4) {
			return "medium";
		}

		return "strong";
	};

	const getStrengthLabel = (strengthLevel: PasswordStrengthLevel): string => {
		if (strengthLevel === "weak") {
			return "Weak";
		}

		if (strengthLevel === "medium") {
			return "Medium";
		}

		return "Strong";
	};

	const getStrengthState = (hasPasswordInput: boolean, strengthScore: number) => {
		if (!hasPasswordInput) {
			return {
				strengthLevel: null,
				strengthLabel: "",
			};
		}

		const strengthLevel = getStrengthLevel(strengthScore);

		return {
			strengthLevel,
			strengthLabel: getStrengthLabel(strengthLevel),
		};
	};

	const getSubmitButtonText = (currentSubmittingState: boolean): string => {
		if (currentSubmittingState) {
			return "Resetting...";
		}

		return "Reset Password";
	};

	const getVisibilityClass = (isVisible: boolean): string => {
		if (isVisible) {
			return "show";
		}

		return "";
	};

	const getErrorMessage = (error: unknown): string => {
		if (error instanceof Error) {
			return error.message;
		}

		if (error && typeof error === "object" && "message" in error) {
			return String((error as Record<string, unknown>).message);
		}

		return "Failed to reset password. Please try again.";
	};

	const getFieldStateClass = (hasError: boolean, isTouchedAndValid: boolean): string => {
		if (hasError) {
			return "error";
		}

		if (isTouchedAndValid) {
			return "success";
		}

		return "";
	};

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<ResetPasswordFormData>({
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const newPassword = useWatch({ control, name: "newPassword" }) ?? "";
	const confirmNewPassword = useWatch({ control, name: "confirmNewPassword" }) ?? "";
	const hasMissingToken = token.trim().length === 0;
	const hasPasswordInput = newPassword.length > 0;

	const passwordRequirements = useMemo(() => getPasswordRequirements(newPassword), [newPassword]);
	const strengthScore = Object.values(passwordRequirements).filter(Boolean).length;
	const { strengthLevel, strengthLabel } = getStrengthState(hasPasswordInput, strengthScore);
	const newPasswordInputClass = `reset-form-input ${getFieldStateClass(
		Boolean(errors.newPassword),
		Boolean(touchedFields.newPassword && newPassword),
	)}`.trim();
	const confirmPasswordInputClass = `reset-form-input ${getFieldStateClass(
		Boolean(errors.confirmNewPassword),
		Boolean(touchedFields.confirmNewPassword && confirmNewPassword && confirmNewPassword === newPassword),
	)}`.trim();
	const newPasswordErrorClass = `reset-error-message ${errors.newPassword ? "show" : ""}`.trim();
	const confirmPasswordErrorClass = `reset-error-message ${errors.confirmNewPassword ? "show" : ""}`.trim();
	const submitButtonText = getSubmitButtonText(isSubmitting);
	const strengthBarClass = `reset-strength-bar ${strengthLevel ?? ""}`.trim();
	const strengthTextClass = `reset-strength-text ${strengthLevel ?? ""}`.trim();
	const missingTokenMessageClass = `reset-error-message ${getVisibilityClass(hasMissingToken)}`.trim();

	useEffect(() => {
		if (hasMissingToken) {
			notification.error({
				title: "Invalid Reset Link",
				message: "Reset token is missing. Redirecting you to request a new reset link.",
			});

			const redirectTimer = globalThis.setTimeout(() => {
				navigate(APP_ROUTES.FORGOT_PASSWORD.URL, { replace: true });
			}, NAVIGATION_TIMEOUT);

			return () => {
				globalThis.clearTimeout(redirectTimer);
			};
		}

		if (validationAttempted.current) {
			return;
		}

		validationAttempted.current = true;

		validateResetToken(token)
			.then(async (response) => {
				if (!response.ok) throw new Error("Invalid reset link");

				setIsTokenValid(true);
				globalThis.history.replaceState(null, "", globalThis.location.pathname);
			})
			.catch(() => {
				notification.error({
					title: "Invalid Reset Link",
					message: "Reset token is invalid or expired. Redirecting...",
				});
				setTimeout(() => {
					navigate(APP_ROUTES.FORGOT_PASSWORD.URL, { replace: true });
				}, NAVIGATION_TIMEOUT);
			});
	}, [token, hasMissingToken, navigate, notification]);

	const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
		setIsSubmitting(true);

		resetPassword({
			newPassword: data.newPassword,
			confirmNewPassword: data.confirmNewPassword,
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorResponse = (await response.json()) as ErrorApiResponse;
					throw new Error(errorResponse.message);
				}

				return (await response.json()) as SuccessApiResponse<null>;
			})
			.then((successResponse) => {
				notification.success({
					title: "Password Updated",
					message: successResponse.message || "Your password has been reset successfully.",
				});

				setTimeout(() => {
					navigate(APP_ROUTES.LOGIN.URL, { replace: true });
				}, NAVIGATION_TIMEOUT);
			})
			.catch((error: unknown) => {
				const errorMessage = getErrorMessage(error);
				console.error("Reset Password Error: ", errorMessage);
				notification.error({
					title: "Reset Failed",
					message: errorMessage,
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

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
							<strong>Create a strong password:</strong> Use at least 12 characters with a mix
							of uppercase, lowercase, numbers, and symbols.
						</p>
					</div>

					<p className={missingTokenMessageClass}>
						Invalid or missing reset token. Please request a new password reset link.
					</p>

				<form className="reset-form" onSubmit={handleSubmit(onSubmit)} noValidate>					<input type="email" autoComplete="email" style={{ display: "none" }} tabIndex={-1} />
						<div className="reset-form-group">
							<label htmlFor="newPassword" className="reset-form-label">
								New Password
							</label>
							<div className="reset-password-input-wrapper">
								<input
									type={showNewPassword ? "text" : "password"}
									id="newPassword"
									className={newPasswordInputClass}
									placeholder="Enter your new password"
									autoComplete="new-password"
									disabled={isSubmitting || hasMissingToken}
									{...register("newPassword", {
										required: "New password is required",
										minLength: {
											value: 12,
											message: "Password must be at least 12 characters",
										},
										validate: {
											hasUppercase: (value) => /[A-Z]/.test(value) || "Include at least one uppercase letter",
											hasLowercase: (value) => /[a-z]/.test(value) || "Include at least one lowercase letter",
											hasNumber: (value) => /\d/.test(value) || "Include at least one number",
											hasSpecialCharacter: (value) => /[^A-Za-z0-9]/.test(value) || "Include at least one special character",
										},
									})}
								/>
								<button
									type="button"
									className="reset-toggle-password"
									onClick={() => setShowNewPassword((previousState) => !previousState)}
									aria-label={showNewPassword ? "Hide password" : "Show password"}
								>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
								</button>
							</div>
							<p className={newPasswordErrorClass}>
								{errors.newPassword?.message}
							</p>

							<div className="reset-password-strength" aria-hidden="true">
								<div className="reset-strength-label">Password Strength</div>
								<div className="reset-strength-bar-container">
									<div className={strengthBarClass} />
								</div>
								<span className={strengthTextClass}>{strengthLabel}</span>
							</div>

							<ul className="reset-requirements-list" aria-hidden="true">
								<li className={passwordRequirements.length ? "met" : ""}>At least 12 characters long</li>
								<li className={passwordRequirements.hasUppercase ? "met" : ""}>Contains uppercase letter (A-Z)</li>
								<li className={passwordRequirements.hasLowercase ? "met" : ""}>Contains lowercase letter (a-z)</li>
								<li className={passwordRequirements.hasNumber ? "met" : ""}>Contains number (0-9)</li>
								<li className={passwordRequirements.hasSpecialCharacter ? "met" : ""}>Contains special character (!@#$%^&amp;*)</li>
							</ul>
						</div>

						<div className="reset-form-group">
							<label htmlFor="confirmNewPassword" className="reset-form-label">
								Confirm New Password
							</label>
							<div className="reset-password-input-wrapper">
								<input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmNewPassword"
									className={confirmPasswordInputClass}
									placeholder="Re-enter your new password"
									autoComplete="new-password"
									disabled={isSubmitting || !isTokenValid}
									{...register("confirmNewPassword", {
										required: "Confirm your new password",
										validate: (value) => value === newPassword || "Passwords do not match",
									})}
								/>
								<button
									type="button"
									className="reset-toggle-password"
									onClick={() => setShowConfirmPassword((previousState) => !previousState)}
									aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
								>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
								</button>
							</div>
							<p className={confirmPasswordErrorClass}>
								{errors.confirmNewPassword?.message}
							</p>
							<p className="reset-form-hint">Both passwords must match</p>
						</div>

						<button type="submit" className="reset-submit-button" disabled={isSubmitting || !isTokenValid}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							{submitButtonText}
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
