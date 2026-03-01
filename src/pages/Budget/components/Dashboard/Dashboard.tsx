import { Plus, ArrowDownCircle, ArrowRightLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";
import EnvelopeCard from "../EnvelopeCard";
import SummaryCard from "../SummaryCard";
import AddEnvelope from "../AddEnvelope";
import DistributeFunds from "../DistributeFunds";
import EmptyEnvelopes from "../EmptyEnvelopes/EmptEnvelopes";
import TransferFunds from "../TransferFunds";

import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import { APP_ROUTES } from "../../../../constants/routes.constants";
import { useBudgetContext } from "../../../../context/budget.context";
import { fetchEnvelopes } from "../../../../services/apis/envelopesApi.service";
import { formatCurrency } from "../../../../utils/ui.utils";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../../models/api.model";
import type { Envelope } from "../../../../models/envelopes.model";

export default function Dashboard() {
  const { state, dispatch } = useBudgetContext();
  const [loading, setLoading] = useState(true);

  useDocumentTitle(APP_ROUTES.DASHBOARD.NAME);

  // Fetch envelopes on mount
  useEffect(() => {
    const getAllEnvelopes = () => {
      fetchEnvelopes()
        .then(async (response) => {
          if (!response.ok) {
            const errorResponse = (await response.json()) as ErrorApiResponse;
            throw errorResponse;
          }
          return (await response.json()) as SuccessApiResponse<Envelope[]>;
        })
        .then((response) => {
          setLoading(false);
          if (response.data && response.data.length > 0) {
            dispatch({ type: "ADD_ENVELOPES", payload: response.data });
          } else {
            dispatch({ type: "ADD_ENVELOPES", payload: [] });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching all envelopes: ", error);
        });
    };

    getAllEnvelopes();
  }, [dispatch]);

  const totals = useMemo(() => {
    if (state.envelopes.length === 0) {
      return { allocated: 0, spent: 0, balance: 0, envelopes: 0 };
    }
    const allocated = state.envelopes.reduce(
      (sum, env) => sum + env.allocatedAmount,
      0,
    );
    const spent = state.envelopes.reduce(
      (sum, env) => sum + env.spentAmount,
      0,
    );
    const balance = state.envelopes.reduce((sum, env) => sum + env.balance, 0);

    const envelopes = state.envelopes.length;

    return { allocated, spent, balance, envelopes };
  }, [state.envelopes]);

  const openAddEnvelopeModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: true });

  const openTransferFundsModal = () =>
    dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: true });

  const openDistributingFundsModal = () =>
    dispatch({ type: "SET_IS_DISTRIBUTING_FUNDS", payload: true });

  return (
    <>
      <h2 className="page-title">{APP_ROUTES.DASHBOARD.NAME}</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner large"></div>
          <p>Loading your envelopes...</p>
        </div>
      ) : (
        <>
          <div className="overview">
            <div className="header">
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
            {/* Overview Cards */}
            <div className="overview-cards">
              <SummaryCard
                id="totalEnvelopes"
                label="Total Envelopes"
                value={String(totals.envelopes)}
                change="Active budget categories"
              />
              <SummaryCard
                id="totalAllocated"
                label="Total Allocated"
                value={formatCurrency(totals.allocated)}
                change="Across all envelopes"
              />
              <SummaryCard
                id="totalBalance"
                label="Total Balance"
                value={formatCurrency(totals.balance)}
                change="+₵250.00 this month"
              />
              <SummaryCard
                id="totalSpent"
                label="Total Spent"
                value={formatCurrency(totals.spent)}
                change="Of allocated funds"
              />
            </div>
          </div>

          {state.envelopes.length === 0 ? (
            <EmptyEnvelopes openAddModal={openAddEnvelopeModal} />
          ) : (
            <div className="envelopes">
              <div className="header">
                <h3 className="subtitle">Latest Envelopes</h3>
                <Link to="/envelopes" className="view-all">
                  View all
                </Link>
              </div>
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
