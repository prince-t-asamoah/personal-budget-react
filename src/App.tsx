import { Navigate, Route, Routes } from "react-router-dom";
import BudgetPage from "./Budget/BudgetEnvelopePage";
import BudgetStateProvider from "./providers/BudgetStateProvider";
import EnvelopesDashboardContent from "./Budget/components/EnvelopesDashboardContent";
import EnvelopesAnalyticsContent from "./Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./Budget/components/EnvelopesHelpSupport";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/envelopes" />} />
      <Route
        path="/envelopes"
        element={
          <BudgetStateProvider>
            <BudgetPage />
          </BudgetStateProvider>
        }
      >
        <Route index path="dashboard" element={<EnvelopesDashboardContent />} />
        <Route path="analytics" element={<EnvelopesAnalyticsContent />} />
        <Route path="settings" element={<EnvelopesSettingsContent />} />
        <Route path="help-support" element={<EnvelopesHelpSupportContent />} />
      </Route>
    </Routes>
  );
}

export default App;
