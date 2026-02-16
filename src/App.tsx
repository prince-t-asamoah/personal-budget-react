import { Navigate, Route, Routes } from "react-router-dom";
import BudgetStateProvider from "./providers/BudgetStateProvider";
import Dashboard from "./pages/Budget/components/Dashboard/Dashboard";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import BudgetPage from "./pages/Budget/BudgetEnvelopePage";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import AuthGuard from "./guard/AuthGuard";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route
        element={
          <AuthGuard>
            <BudgetStateProvider>
              <BudgetPage />
            </BudgetStateProvider>
          </AuthGuard>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
        <Route path="settings" element={<EnvelopesSettingsContent />} />
        <Route path="help-support" element={<EnvelopesHelpSupportContent />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
