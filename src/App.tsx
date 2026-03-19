import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { TOAST_NOTIFICATION_DURATION } from "./constants/ui.constants";
import { APP_ROUTES } from "./constants/routes.constants";
import AppProvider from "./providers/AppProvider";
import AuthGuard from "./guard/AuthGuard";
import Dashboard from "./pages/Budget/components/Dashboard/Dashboard";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import Envelopes from "./pages/Budget/components/Envelopes/Envelopes";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import EnvelopesHome from "./pages/Budget/components/EnvelopesHome/EnvelopesHome";
import EnvelopesDetails from "./pages/Budget/components/EnvelopesDetails/EnvelopesDetails";
import EmailVerificationLinkExpiredPage from "./pages/EmailVerificationLinkExpired/EmailVerificationLinkExpiredPage";
import ResendEmailVerificationPage from "./pages/ResendEmailVerification/ResendEmailVerificationPage";
import Transactions from "./pages/Budget/components/Transactions/Transactions";
import VerifyAccountPage from "./pages/VerifyAccount/VerifyAccountPage";
import BudgetRoot from "./pages/Budget/components/BudgetRoot";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route index element={<Navigate to="/app" replace />} />
          <Route
            path="/app"
            element={
              <AuthGuard>
                <BudgetRoot />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="envelopes" element={<Envelopes />}>
              <Route index element={<EnvelopesHome />} />
              <Route path="details/:id" element={<EnvelopesDetails />} />
            </Route>
            <Route path="transactions" element={<Transactions />} />

            <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
            <Route path="settings" element={<EnvelopesSettingsContent />} />
            <Route
              path="help-support"
              element={<EnvelopesHelpSupportContent />}
            />
          </Route>
          <Route path={APP_ROUTES.CREATE_ACCOUNT.URL} element={<SignupPage />} />
          <Route path={APP_ROUTES.LOGIN.URL} element={<LoginPage />} />
          <Route path={APP_ROUTES.FORGOT_PASSWORD.URL} element={<ForgotPasswordPage />} />
          <Route path={APP_ROUTES.RESET_PASSWORD.URL} element={<ResetPasswordPage />} />
          <Route path="/verify-account" element={<VerifyAccountPage />} />
          <Route
            path="/verification-link-expired"
            element={<EmailVerificationLinkExpiredPage />}
          />
          <Route
            path="/resend-verification"
            element={<ResendEmailVerificationPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppProvider>
      <Toaster
        toastOptions={{
          position: "top-right",
          className: "toast-container",
          duration: TOAST_NOTIFICATION_DURATION,
        }}
      />
    </>
  );
}

export default App;
