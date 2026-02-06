import BudgetPage from "./Budget/BudgetEnvelopePage";
import BudgetStateProvider from "./providers/BudgetStateProvider";

function App() {
  return (
    <>
      <BudgetStateProvider>
        <BudgetPage />
      </BudgetStateProvider>
    </>
  );
}

export default App;
