import { Navigate, Route, Routes } from "react-router-dom";
import BudgetStateProvider from "./providers/BudgetStateProvider";
import EnvelopesDashboardContent from "./pages/Budget/components/EnvelopesDashboardContent";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import BudgetPage from "./pages/Budget/BudgetEnvelopePage";
import SignupPage from "./pages/Signup/SignupPage";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/envelopes/dashboard" replace />} />
      <Route
        path="/envelopes"
        element={
          <BudgetStateProvider>
            <BudgetPage />
          </BudgetStateProvider>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<EnvelopesDashboardContent />} />
        <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
        <Route path="settings" element={<EnvelopesSettingsContent />} />
        <Route path="help-support" element={<EnvelopesHelpSupportContent />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
