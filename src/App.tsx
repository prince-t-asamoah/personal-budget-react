import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import BudgetStateProvider from "./providers/BudgetStateProvider";
import Dashboard from "./pages/Budget/components/Dashboard/Dashboard";
import EnvelopesAnalyticsContent from "./pages/Budget/components/EnvelopesAnalyticsContent";
import EnvelopesSettingsContent from "./pages/Budget/components/EnvelopesSettingsContent";
import EnvelopesHelpSupportContent from "./pages/Budget/components/EnvelopesHelpSupport";
import BudgetPage from "./pages/Budget/BudgetEnvelopePage";
import Envelopes from "./pages/Budget/components/Envelopes/Envelopes";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import AuthGuard from "./guard/AuthGuard";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AppLoader from "./components/AppLoader/AppLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

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
