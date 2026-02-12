import { useState, useEffect, useMemo } from "react";
import {
  Wallet,
  Plus,
  ArrowDownCircle,
  ArrowRightLeft,
  Menu,
} from "lucide-react";
import "./BudgetEnvelopePage.css";

import SummaryCard from "./components/SummaryCard";
import EnvelopeCard from "./components/EnvelopeCard";
import AddEnvelope from "./components/AddEnvelope";
import TransferFunds from "./components/TransferFunds";
import DashboardSidebar from "./components/DashboardSidebar";
import DistributeFunds from "./components/DistributeFunds";

import { formatCurrency } from "../utils/ui.utils";
import { fetchEnvelopes } from "../services/budget-envelope-api.service";
import { useBudgetContext } from "../context/budget.context";

function BudgetPage() {
  const { state, dispatch } = useBudgetContext();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch envelopes on mount
  useEffect(() => {
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

    getAllEnvelopes();
  }, [dispatch]);

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

  const openTransferFundsModal = () =>
    dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: true });

  const openDistributingFundsModal = () =>
    dispatch({ type: "SET_IS_DISTRIBUTING_FUNDS", payload: true });

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <DashboardSidebar isOpen={sidebarOpen} />
        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? "" : "full-width"}`}>
          {/* Mobile Topbar */}
          <div className="topbar">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="mobile-logo">Envelope Budget</div>
            <div style={{ width: "40px" }} /> {/* Spacer for centering */}
          </div>
          {/* App Container */}
          <div className="app-container">
            {loading ? (
              <div className="loading">
                <div className="spinner large"></div>
                <p>Loading your envelopes...</p>
              </div>
            ) : (
              <>
                <div className="action-buttons">
                  <button
                    className="btn-primary"
                    onClick={openAddEnvelopeModal}
                  >
                    <Plus size={20} />
                    New Envelope
                  </button>
                  <button className="btn-secondary" onClick={openDistributingFundsModal}>
                    <ArrowDownCircle size={20} />
                    Distribute Funds
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={openTransferFundsModal}
                  >
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
          </div>
        </div>
      </div>
      {/* Add New Envelope */}
      {state.isAddingEnvelope && <AddEnvelope />}
      {/* Transfer Funds */}
      {state.isTransferringFunds && <TransferFunds />}
      {/* Distribute Funds */}
      {state.isDistributingFunds && <DistributeFunds />}
    </>
  );
}

export default BudgetPage;
