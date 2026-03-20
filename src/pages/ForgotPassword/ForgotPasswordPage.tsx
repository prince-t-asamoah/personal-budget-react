import { NavLink } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { APP_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useNotification from "../../hooks/useNotification";
import { forgotPassword } from "../../services/apis/authApi.service";
import type { ErrorApiResponse, SuccessApiResponse } from "../../models/api.model";
import "./ForgotPasswordPage.css";

type ForgotPasswordFormData = {
    email: string;
};

export default function ForgotPasswordPage() {
    useDocumentTitle("Forgot Password");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [sentEmail, setSentEmail] = useState("");
    const notification = useNotification();

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
        setIsSubmitting(true);
        forgotPassword(data.email)
            .then(async (response) => {
                if (!response.ok) {
                    const errorResponse = (await response.json()) as ErrorApiResponse;
                    throw new Error(errorResponse.message);
                }
                return await response.json();
            })
            .then((response: SuccessApiResponse<null>) => {
                setSentEmail(data.email);
                setShowSuccess(true);
                notification.success({
                    title: "Reset Link Sent",
                    message: response.message || "Password reset instructions have been sent to your email.",
                });
            })
            .catch((error: unknown) => {
                let errorMessage = "Failed to send reset link. Please try again.";
                
                if (error instanceof Error) {
                    errorMessage = error.message;
                } else if (error && typeof error === 'object' && 'message' in error) {
                    errorMessage = String((error as Record<string, unknown>).message);
                }
                
                console.error("Forgot Password Error: ", errorMessage);
                notification.error({
                    title: "Request Failed",
                    message: errorMessage,
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="forgot-container">
            <div className="forgot-header">
                <div className="icon-container">
                    <div className="forgot-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                </div>
                <h1 className="forgot-title">Forgot Password?</h1>
                <p className="forgot-subtitle">Don&apos;t worry, we&apos;ll help you reset it</p>
            </div>

            <div className="forgot-body">
                <NavLink to={APP_ROUTES.LOGIN.URL} className="back-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Login
                </NavLink>

                <p className="intro-message">
                    Enter the email address associated with your account and we&apos;ll send you a
                    link to reset your password.
                </p>

                <div className="form-card">
                    <form className="forgot-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`form-input ${errors.email ? "error" : ""}`.trim()}
                                placeholder="john.doe@example.com"
                                autoComplete="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />
                            <p className={`error-message ${errors.email ? "show" : ""}`.trim()}>
                                {errors.email?.message}
                            </p>
                            <p className="form-hint">Enter the email you used when creating your account</p>
                        </div>

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className={`success-card ${showSuccess ? "show" : ""}`}>
                        <div className="success-header">
                            <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <h3 className="success-title">Reset Link Sent!</h3>
                        </div>
                        <p className="success-text">We&apos;ve sent password reset instructions to {sentEmail}.</p>
                        <p className="success-text">Please follow these steps:</p>
                        <ul className="success-steps">
                            <li>Check your email inbox (and spam folder)</li>
                            <li>Click the password reset link in the email</li>
                            <li>Create a new strong password</li>
                            <li>Log in with your new password</li>
                        </ul>
                    </div>

                    <div className="info-alert">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <p className="info-alert-text">
                            <strong>Security Note:</strong> The reset link will expire in 1 hour for your
                            security. If you don&apos;t receive the email within a few minutes, check your spam
                            folder or try again.
                        </p>
                    </div>

                    <div className="remember-password">
                        <p className="remember-password-text">Remember your password?</p>
                        <NavLink to={APP_ROUTES.LOGIN.URL} className="remember-password-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Back to Login
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="forgot-footer">
                <p className="footer-text">
                    Need help? <a href="mailto:support@buckety.app" className="footer-link">Contact our support team</a> •{" "}
                    <NavLink to={APP_ROUTES.HOME.URL} className="footer-link">
                        Return to Home
                    </NavLink>
                </p>
            </div>
        </div>
    );
}