import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Budget/components/Dashboard/Dashboard";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import Envelopes from "./pages/Budget/components/Envelopes/Envelopes";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import BudgetRoot from "./pages/Budget/components/BudgetRoot";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AuthGuard from "./guard/AuthGuard";

function App() {
  return (
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
        <Route path="envelopes" element={<Envelopes />} />
        <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
        <Route path="settings" element={<EnvelopesSettingsContent />} />
        <Route path="help-support" element={<EnvelopesHelpSupportContent />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
