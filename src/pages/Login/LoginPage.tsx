import { NavLink, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import "./LoginPage.css";
import AppLogo from "../../components/AppLogo/AppLogo";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { APP_ROUTES } from "../../constants/routes.constants";
import { loginUser } from "../../services/apis/authApi.service";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../models/api.model";
import type { AuthUser, LoginFormData } from "../../models/auth.model";
import { useAuthContext } from "../../context/auth.context";

export default function LoginPage() {
  useDocumentTitle(APP_ROUTES.LOGIN.NAME);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    success: false,
    message: "",
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setIsSubmitting(true);
    setToast({ success: false, message: "" });
    loginUser(data)
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = (await response.json()) as ErrorApiResponse;
          throw new Error(errorResponse.message);
        }
        return await response.json();
      })
      .then(async (response: SuccessApiResponse<AuthUser>) => {
        if (!response?.data) return;
        dispatch({ type: "SET_USER", payload: response?.data ?? null });
        dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
        setToast({ success: true, message: response.message });
        navigate(APP_ROUTES.DASHBOARD.URL);
      })
      .catch((error: ErrorApiResponse) => {
        console.error("Login Error: ", error.message);
        dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
        dispatch({ type: "SET_USER", payload: null });
        setToast({ success: false, message: error.message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* <!-- Logo --> */}
        <div className="auth-logo-section">
          <AppLogo />
        </div>

        {/* <!-- Header --> */}
        <div className="auth-header">
          <h1 className="title">Welcome Back</h1>
          <p className="description">
            Login to continue managing your finances
          </p>
        </div>

        {/* <!-- Alert Messages --> */}
        <div className="alert error" id="errorAlert"></div>
        <div className="alert success" id="successAlert"></div>

        {/* <!-- SSO Buttons --> */}
        <div className="sso-buttons">
          <button className="sso-btn google">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <button className="sso-btn facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </button>

          <button className="sso-btn apple">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        {/* <!-- Divider --> */}
        <div className="divider">
          <span>Or login with email</span>
        </div>

        {/* <!-- login Form --> */}
        <form
          className="auth-form"
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <!-- Email --> */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
              <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@example.com"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span
                className={`error-message ${errors.email ? "show" : ""}`}
                id="emailError"
              >
                {errors.email?.message}
              </span>
            )}
          </div>

          {/* <!-- Password --> */}
          <div className="form-group">
            <label htmlFor="password">
              Password
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="toggle-password"
                aria-label="Toggle password visibility"
              >
                <svg
                  id="eyeIcon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {errors.password && (
              <span
                className={`error-message ${errors.password ? "show" : ""}`}
                id="passwordError"
              >
                {errors.password.message}
              </span>
            )}
          </div>

          {/* <!-- Form Options --> */}
          <div className="form-options">
            <div className="check-group remember-me">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                disabled={isSubmitting}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <a href="forgot-password.html" className="forgot-password">
              Forgot password?
            </a>
          </div>

          {/* <!-- Submit Button --> */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting.." : "Login"}
          </button>
        </form>
        <div className="toast-message">
          <p
            className={`error-message ${!toast.success && toast.message ? "show" : ""}`}
          >
            {toast.message}
          </p>
          <p
            className={`success-message ${toast.success && toast.message ? "show" : ""}`}
          >
            {toast.message}
          </p>
        </div>
        {/* <!-- Sign Up Link --> */}
        <div className="auth-link">
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
}
