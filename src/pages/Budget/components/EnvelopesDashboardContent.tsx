import { Plus, ArrowDownCircle, ArrowRightLeft, Wallet } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import EnvelopeCard from "./EnvelopeCard";
import SummaryCard from "./SummaryCard";
import AddEnvelope from "./AddEnvelope";
import DistributeFunds from "./DistributeFunds";
import TransferFunds from "./TransferFunds";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { APP_ROUTES } from "../../../constants/routes.constants";
import { useBudgetContext } from "../../../context/budget.context";
import { fetchEnvelopes } from "../../../services/budget-envelope-api.service";
import { formatCurrency } from "../../../utils/ui.utils";

export default function EnvelopesDashboardContent() {
  const { state, dispatch } = useBudgetContext();
  const [loading, setLoading] = useState(true);

  useDocumentTitle(APP_ROUTES.DASHBOARD.NAME);

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
      <h2 className="page-heading">{APP_ROUTES.DASHBOARD.NAME}</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner large"></div>
          <p>Loading your envelopes...</p>
        </div>
      ) : (
        <>
          <div className="overview">
            <div className="overview-header">
              <h3 className="subtitle">Overview</h3>
              <div className="overview-actions">
                <button className="btn-primary" onClick={openAddEnvelopeModal}>
                  <Plus size={20} />
                  New Envelope
                </button>
                <button
                  className="btn-secondary"
                  onClick={openDistributingFundsModal}
                >
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
            </div>
            <div className="overview-cards">
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
          </div>
          {state.envelopes.length === 0 ? (
            <div className="empty-state">
              <Wallet size={64} className="empty-state-icon" />
              <h3>No Envelopes Yet</h3>
              <p>Create your first envelope to start budgeting</p>
            </div>
          ) : (
            <div className="envelopes">
              <h3 className="subtitle">Envelopes</h3>
              <div className="envelopes-grid">
                {state.envelopes.map((envelope) => (
                  <EnvelopeCard key={envelope.id} envelope={envelope} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {/* Add New Envelope */}
      {state.isAddingEnvelope && <AddEnvelope />}
      {/* Transfer Funds */}
      {state.isTransferringFunds && <TransferFunds />}
      {/* Distribute Funds */}
      {state.isDistributingFunds && <DistributeFunds />}
    </>
  );
}
