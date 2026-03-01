import "./Envelopes.css";
import AddEnvelope from "../AddEnvelope";
import EnvelopeCard from "../EnvelopeCard";
import EmptyEnvelopes from "../EmptyEnvelopes/EmptyEnvelopes";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import { type ChangeEvent } from "react";

export default function Envelopes() {
  const { state, dispatch } = useEnvelopesContext();

  const filterEnvelopes = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  const setFilter = (filter: string) => {
    console.log(filter);
  };

  const openAddModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: true });

  return (
    <>
      {/* Main Content */}
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h2 className="page-title">Envelopes</h2>
          <p className="page-subtitle">
            Manage your budget envelopes and track spending
          </p>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            {/* Search */}
            <div className="search-box">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search envelopes..."
                id="searchInput"
                onChange={filterEnvelopes}
              />
            </div>

            {/* Filters */}
            <div className="filter-group">
              <button
                className="filter-btn active"
                data-filter="all"
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className="filter-btn"
                data-filter="active"
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className="filter-btn"
                data-filter="low"
                onClick={() => setFilter("low")}
              >
                Low Balance
              </button>
            </div>
          </div>

          <div className="toolbar-right">
            <button className="btn btn-primary" onClick={openAddModal}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Envelope
            </button>
          </div>
        </div>

        {/* Envelopes Grid */}
        {state.envelopes.length > 0 ? (
          <div className="envelopes-grid" id="envelopesGrid">
            {state.envelopes.map((env) => (
              <EnvelopeCard envelope={env} />
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            <EmptyEnvelopes openAddModal={openAddModal} />
          </>
        )}
      </main>

      {/* Add New Envelope */}
      {state.isAddingEnvelope && <AddEnvelope />}
    </>
  );
}
