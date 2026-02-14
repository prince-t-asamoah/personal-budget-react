import { Navigate, Route, Routes } from "react-router-dom";
import BudgetStateProvider from "./providers/BudgetStateProvider";
import EnvelopesDashboardContent from "./pages/Budget/components/EnvelopesDashboardContent";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import BudgetPage from "./pages/Budget/BudgetEnvelopePage";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route
        element={
          <BudgetStateProvider>
            <BudgetPage />
          </BudgetStateProvider>
        }
      >
        <Route path="dashboard" element={<EnvelopesDashboardContent />} />
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
