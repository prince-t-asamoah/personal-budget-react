import { useMemo, useRef, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";

import "./EnvelopesDetails.css";
import OverviewCard from "../OverviewCard";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import type { Envelope } from "../../../../models/envelopes.model";
import {
  formatDate,
  formatTime,
  formatCurrency,
} from "../../../../utils/ui.utils";
import { getEnvelope } from "../../../../services/apis/envelopesApi.service";
import type { SuccessApiResponse } from "../../../../models/api.model";
import TransactionsList from "../../../../components/TransactionsList/TransactionsList";
import { getEnvelopeTransactions } from "../../../../services/apis/transactionsApi.service";
import {
  transactionsReducer,
  transactionsState,
} from "../../../../store/transactions.store";
import type { Transaction } from "../../../../models/transactions.model";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function EnvelopesDetails() {
  const { state, dispatch } = useEnvelopesContext();
  const { id } = useParams<{ id: string }>();
  const spendingChart = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(
    null,
  );
  const defaultEnvelope: Envelope = useMemo(
    () => ({
      id: "",
      name: "",
      allocatedAmount: 0,
      spentAmount: 0,
      balance: 0,
      currency: "",
      createdAt: "",
      updatedAt: "",
    }),
    [],
  );
  const envelope = useMemo(
    () => state.envelopes.find((env) => env.id === id) ?? defaultEnvelope,
    [state.envelopes, id, defaultEnvelope],
  );
  const [transactionState, transactionDispatch] = useReducer(
    transactionsReducer,
    transactionsState,
  );

  useEffect(() => {
    getEnvelope(id ?? "")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error fetching envelope with id: ${id}`);
        }
        const jsonResponse =
          (await response.json()) as SuccessApiResponse<Envelope>;
        dispatch({
          type: "SET_CURRENT_ENVELOPE",
          payload: jsonResponse?.data ?? null,
        });
      })
      .catch((error) => {
        console.error("Error fetching envelope", error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    getEnvelopeTransactions(id ?? "")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error fetching transactions with id: ${id}`);
        }
        const jsonResponse = (await response.json()) as SuccessApiResponse<
          Transaction[]
        >;
        transactionDispatch({
          type: "SET_TRANSACTIONS",
          payload: jsonResponse.data!,
        });
      })
      .catch((error: unknown) => {
        console.error("Get envelopes transactions failed: ", error);
      });
  }, [transactionDispatch, id]);

  const remainingAmount = Math.max(envelope.balance, 0);
  const spentAmount = Math.max(envelope.spentAmount, 0);

  const chartData = useMemo(
    () => ({
      labels: ["Remaining", "Spent"],
      datasets: [
        {
          data: [remainingAmount, spentAmount],
          backgroundColor: [
            "#8B9A7E", // Sage - Remaining
            "#C76D6D", // Danger - Spent
          ],
          borderWidth: 0,
          borderRadius: 8,
        },
      ],
    }),
    [remainingAmount, spentAmount],
  );

  useEffect(() => {
    if (!spendingChart.current) return;

    const ctx = spendingChart.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current?.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#2C3E3F",
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total
                  ? ((value / total) * 100).toFixed(0)
                  : "0";
                return `${label}: ${envelope.currency} ${value.toFixed(2)} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, [chartData, envelope.currency]);

  const openEditEnvelopes = () =>
    dispatch({ type: "OPEN_EDITING_MODAL", payload: envelope });

  const openAddTransaction = () =>
    dispatch({ type: "OPEN_TRANSACTING_MODAL", payload: envelope });

  const openDeleteTransaction = () =>
    dispatch({ type: "OPEN_DELETE_MODAL", payload: envelope });

  return (
    <div className="envelopes-details">
      {/* <!-- Back Button --> */}
      <Link to="/envelopes" className="back-button">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Envelopes
      </Link>

      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="envelope-name">{envelope.name}</h1>
            <p className="envelope-subtitle"></p>
          </div>

          <div className="header-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={openEditEnvelopes}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={openAddTransaction}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Transaction
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={openDeleteTransaction}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* <!-- Stats --> */}
        <div className="stats-grid">
          <OverviewCard
            id="allocatedAmount"
            label="Allocated"
            value={`${envelope.currency} ${envelope.allocatedAmount}`}
          />
          <OverviewCard
            id="balanceAmount"
            label="Balance"
            value={`${envelope.currency} ${envelope.balance}`}
          />
          <OverviewCard
            id="spentAmount"
            label="Spent"
            value={`${envelope.currency} ${envelope.spentAmount}`}
          />
          <OverviewCard
            id="remaingPercentage"
            label="Remaining pecentage"
            value={`%0`}
          />
        </div>
      </div>

      {/* <!-- Content Grid --> */}
      <div className="content-grid">
        {/* <!-- Transaction History --> */}
        <div className="transaction-section">
          <div className="section-header">
            <h2 className="section-title">Transaction History</h2>
            <div className="section-actions">
              <button className="btn btn-secondary btn-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print
              </button>
              <button className="btn btn-secondary btn-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Transaction Table*/}
          <TransactionsList transactions={transactionState.transactions} />
          {/* <div className="transaction-table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="transaction-date">Mar 03, 2026</div>
                    <span className="transaction-time">2:30 PM</span>
                  </td>
                  <td>Whole Foods Market</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵45.00</td>
                  <td className="transaction-balance">₵350.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Mar 01, 2026</div>
                    <span className="transaction-time">11:15 AM</span>
                  </td>
                  <td>Shoprite Groceries</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵65.00</td>
                  <td className="transaction-balance">₵395.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 28, 2026</div>
                    <span className="transaction-time">6:45 PM</span>
                  </td>
                  <td>Local Market</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵20.00</td>
                  <td className="transaction-balance">₵460.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 25, 2026</div>
                    <span className="transaction-time">3:00 PM</span>
                  </td>
                  <td>Monthly Fund Allocation</td>
                  <td>
                    <span className="transaction-type income">Income</span>
                  </td>
                  <td className="transaction-amount positive">+₵100.00</td>
                  <td className="transaction-balance">₵480.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 22, 2026</div>
                    <span className="transaction-time">10:30 AM</span>
                  </td>
                  <td>Supermarket Purchase</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵55.00</td>
                  <td className="transaction-balance">₵380.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 18, 2026</div>
                    <span className="transaction-time">4:20 PM</span>
                  </td>
                  <td>Weekend Shopping</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵85.00</td>
                  <td className="transaction-balance">₵435.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 15, 2026</div>
                    <span className="transaction-time">9:00 AM</span>
                  </td>
                  <td>Transfer from Entertainment</td>
                  <td>
                    <span className="transaction-type transfer">Transfer</span>
                  </td>
                  <td className="transaction-amount positive">+₵50.00</td>
                  <td className="transaction-balance">₵520.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 10, 2026</div>
                    <span className="transaction-time">1:15 PM</span>
                  </td>
                  <td>Fresh Produce Market</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵30.00</td>
                  <td className="transaction-balance">₵470.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 05, 2026</div>
                    <span className="transaction-time">5:45 PM</span>
                  </td>
                  <td>Monthly Restock</td>
                  <td>
                    <span className="transaction-type expense">Expense</span>
                  </td>
                  <td className="transaction-amount negative">-₵120.00</td>
                  <td className="transaction-balance">₵500.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="transaction-date">Feb 01, 2026</div>
                    <span className="transaction-time">12:00 PM</span>
                  </td>
                  <td>Initial Allocation</td>
                  <td>
                    <span className="transaction-type income">Income</span>
                  </td>
                  <td className="transaction-amount positive">+₵500.00</td>
                  <td className="transaction-balance">₵500.00</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>

        {/* <!-- Right Sidebar --> */}
        <div>
          {/* <!-- Spending Chart --> */}
          <div className="chart-section">
            <h3
              className="section-title"
              style={{
                fontSize: "var(--text-2xl); margin-bottom: var(--space-6)",
              }}
            >
              Spending Overview
            </h3>

            <div className="chart-container">
              <canvas id="spendingChart" ref={spendingChart}></canvas>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-label">
                  <div
                    className="legend-color"
                    style={{ background: "#8B9A7E" }}
                  ></div>
                  <span className="legend-text">Remaining</span>
                </div>
                <span className="legend-value">
                  {formatCurrency(remainingAmount)}
                </span>
              </div>
              <div className="legend-item">
                <div className="legend-label">
                  <div
                    className="legend-color"
                    style={{ background: "#C76D6D" }}
                  ></div>
                  <span className="legend-text">Spent</span>
                </div>
                <span className="legend-value">
                  {formatCurrency(spentAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Envelope Information --> */}
      <div className="info-card">
        <h3
          className="section-title"
          style={{ marginBottom: "var(--space-6)" }}
        >
          Envelope Information
        </h3>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">Created Date</div>
            <div className="info-value">{formatDate(envelope.createdAt)}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Created Time</div>
            <div className="info-value">{formatTime(envelope.createdAt)}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Last Updated</div>
            <div className="info-value">{formatDate(envelope.updatedAt)}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Updated Time</div>
            <div className="info-value">{formatTime(envelope.updatedAt)}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Currency</div>
            <div className="info-value">{envelope.currency}</div>
          </div>

          {envelope?.category && (
            <div className="info-item">
              <div className="info-label">Category</div>
              <div className="info-value">Essentials</div>
            </div>
          )}

          {envelope?.notes && (
            <div className="info-item" style={{ gridColumn: "1 / -1" }}>
              <div className="info-label">Notes</div>
              <div className="info-value">
                Weekly grocery shopping budget for household items and food.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
