import { useState, useEffect } from "react";
import AppLoader from "../../../components/AppLoader/AppLoader";
import BudgetPage from "../BudgetPage";

export default function BudgetRoot() {
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

  return <BudgetPage />;
}
