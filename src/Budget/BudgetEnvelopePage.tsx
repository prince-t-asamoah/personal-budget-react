import { useState, useEffect, useMemo } from "react";
import { Wallet, Plus, ArrowDownCircle, ArrowRightLeft } from "lucide-react";

import SummaryCard from "./components/SummaryCard";
import EnvelopeCard from "./components/EnvelopeCard";
import { formatCurrency } from "../utils/ui.utils";
import { fetchEnvelopes } from "../services/budget-envelope-api.service";

import AddEnvelope from "./components/AddEnvelope";
import { useBudgetContext } from "../context/budget.context";

function BudgetPage() {
  const { state, dispatch } = useBudgetContext();
  const [loading, setLoading] = useState(true);

  const getAllEnvelopes = () => {
    fetchEnvelopes()
      .then((response) => {
        if (!response.ok) return;
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        dispatch({ type: "ADD_ENVELOPES", payload: data });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching all envelopes: ", error);
      });
  };

  // Fetch envelopes on mount
  useEffect(() => {
    getAllEnvelopes();
  }, []);

  const totals = useMemo(() => {
    const allocated = state.envelopes.reduce(
      (sum, env) => sum + env.allocatedAmount,
      0,
    );
    const spent = state.envelopes.reduce(
      (sum, env) => sum + env.spentAmount,
      0,
    );
    const balance = state.envelopes.reduce((sum, env) => sum + env.balance, 0);

    return { allocated, spent, balance };
  }, [state.envelopes]);

  const openAddEnvelopeModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: true });

  return (
    <div className="app-container">
      <header>
        <h1>Envelope Budget</h1>
        <p className="subtitle">Financial Clarity Through Organization</p>
      </header>
      {loading ? (
        <div className="loading">
          <div className="spinner large"></div>
          <p>Loading your envelopes...</p>
        </div>
      ) : (
        <>
          <div className="action-buttons">
            <button className="btn-primary" onClick={openAddEnvelopeModal}>
              <Plus size={20} />
              New Envelope
            </button>
            <button className="btn-secondary">
              <ArrowDownCircle size={20} />
              Distribute Funds
            </button>
            <button className="btn-secondary">
              <ArrowRightLeft size={20} />
              Transfer Funds
            </button>
          </div>

          <div className="budget-summary">
            <SummaryCard
              label="Total Allocated"
              amount={formatCurrency(totals.allocated)}
            />
            <SummaryCard
              label="Total Spent"
              amount={formatCurrency(totals.spent)}
            />
            <SummaryCard
              label="Total Balance"
              amount={formatCurrency(totals.balance)}
            />
          </div>

          {state.envelopes.length === 0 ? (
            <div className="empty-state">
              <Wallet size={64} className="empty-state-icon" />
              <h3>No Envelopes Yet</h3>
              <p>Create your first envelope to start budgeting</p>
            </div>
          ) : (
            <div className="envelopes-grid">
              {state.envelopes.map((envelope) => (
                <EnvelopeCard key={envelope.id} envelope={envelope} />
              ))}
            </div>
          )}
        </>
      )}
      {/* Add New Envelope */}
      {state.isAddingEnvelope && <AddEnvelope />}
    </div>
  );
}

export default BudgetPage;
