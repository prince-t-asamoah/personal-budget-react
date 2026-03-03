import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { TOAST_NOTIFICATION_DURATION } from "./constants/ui.constants";
import AppProvider from "./providers/AppProvider";
import AuthGuard from "./guard/AuthGuard";
import Dashboard from "./pages/Budget/components/Dashboard/Dashboard";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import Envelopes from "./pages/Budget/components/Envelopes/Envelopes";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import BudgetRoot from "./pages/Budget/components/BudgetRoot";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import EnvelopesHome from "./pages/Budget/components/Envelopes/EnvelopesHome";
import EnvelopesDetails  from "./pages/Budget/components/Envelopes/EnvelopesDetails";

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            element={
              <AuthGuard>
                <BudgetRoot />
              </AuthGuard>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="envelopes" element={<Envelopes />}>
              <Route index element={<EnvelopesHome />} />
              <Route path="details/:id" element={<EnvelopesDetails />} />
            </Route>
            <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
            <Route path="settings" element={<EnvelopesSettingsContent />} />
            <Route
              path="help-support"
              element={<EnvelopesHelpSupportContent />}
            />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
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
