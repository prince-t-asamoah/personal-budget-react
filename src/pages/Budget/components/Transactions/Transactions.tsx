import './Transactions.css';

export default function Transactions() {
    const openExportModal = () => {};
    const openAddTransactionModal = () => {};
    const openDateRangeModal  = () => {};
    const openSortModal = () => {};
    const toggleActionMenu = () => {};
    const closeDateRangeModal = () => {};
    const applyDateRange = () => {};
    const closeSortModal = () => {};
    const applySort = () => {};
    const closeExportModal = () => {};
    const closeAddTransactionModal = () => {};
    const saveTransaction = () => {};

    return (
        <>
            {/* <!-- Main Content --> */}
        <main className="main-content">
            {/* <!-- Page Header --> */}
            <div className="page-header">
            <div className="header-top">
                <div>
                <h1 className="page-title">Transactions</h1>
                <p className="page-subtitle">View and manage all your financial transactions</p>
                </div>
                <div className="header-actions">
                <button className="btn btn-secondary" onClick={openExportModal}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export CSV
                </button>
                <button className="btn btn-primary" onClick={openAddTransactionModal}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    New Transaction
                </button>
                </div>
            </div>
            </div>

            {/* <!-- Quick Stats --> */}
            <div className="quick-stats">
            <div className="stat-card income">
                <div className="stat-label">Total Income</div>
                <div className="stat-value green">₵2,450</div>
                <div className="stat-count">8 transactions</div>
            </div>

            <div className="stat-card expense">
                <div className="stat-label">Total Expenses</div>
                <div className="stat-value red">₵1,030</div>
                <div className="stat-count">24 transactions</div>
            </div>

            <div className="stat-card transfer">
                <div className="stat-label">Transfers</div>
                <div className="stat-value gold">₵200</div>
                <div className="stat-count">5 transactions</div>
            </div>

            <div className="stat-card">
                <div className="stat-label">Net Balance</div>
                <div className="stat-value green">₵1,420</div>
                <div className="stat-count">37 total transactions</div>
            </div>
            </div>

            {/* <!-- Filters --> */}
            <div className="filters-card">
            <div className="filters-header">
                <h3 className="filters-title">Filters</h3>
                <span className="clear-filters">Clear All</span>
            </div>

            <div className="filters-grid">
                <div className="filter-group">
                <label className="filter-label" htmlFor="transactions-search">Search</label>
                <input id="transactions-search" type="text" className="search-input" placeholder="Search by description, envelope, or amount..."/>
                </div>

                <div className="filter-group">
                <label className="filter-label" htmlFor="transactions-type-filter">Type</label>
                <select id="transactions-type-filter" className="search-input">
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="transfer">Transfer</option>
                </select>
                </div>

                <div className="filter-group">
                <label className="filter-label" htmlFor="transactions-envelope-filter">Envelope</label>
                <select id="transactions-envelope-filter" className="search-input">
                    <option value="">All Envelopes</option>
                    <option value="groceries">Groceries</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="healthcare">Healthcare</option>
                </select>
                </div>
            </div>

            <div className="filter-buttons">
                <button className="filter-btn active">All Time</button>
                <button className="filter-btn">Today</button>
                <button className="filter-btn">This Week</button>
                <button className="filter-btn">This Month</button>
                <button className="filter-btn">Last 30 Days</button>
                <button className="filter-btn" onClick={openDateRangeModal}>Custom Range</button>
            </div>
            </div>

            {/* <!-- Transaction Table --> */}
            <div className="table-card">
            <div className="table-header">
                <div>
                <h3 className="table-title">All Transactions</h3>
                <div className="table-count">Showing 10 of 37 transactions</div>
                </div>
                <div className="table-actions">
                <button className="btn btn-secondary btn-sm" onClick={openSortModal}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="21" x2="4" y2="14"/>
                    <line x1="4" y1="10" x2="4" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12" y2="3"/>
                    <line x1="20" y1="21" x2="20" y2="16"/>
                    <line x1="20" y1="12" x2="20" y2="3"/>
                    <line x1="1" y1="14" x2="7" y2="14"/>
                    <line x1="9" y1="8" x2="15" y2="8"/>
                    <line x1="17" y1="16" x2="23" y2="16"/>
                    </svg>
                    Sort
                </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="transaction-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Date & Time</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Envelope</th>
                    <th>Amount</th>
                    <th>Balance After</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><span className="transaction-id">TXN-1047</span></td>
                    <td>
                        <div className="transaction-date">Mar 06, 2026</div>
                        <span className="transaction-time">2:30 PM</span>
                    </td>
                    <td>Whole Foods Market</td>
                    <td><span className="transaction-type-badge expense">Expense</span></td>
                    <td>
                        <div className="envelope-tag">
                        <svg className="envelope-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                        </svg>
                        Groceries
                        </div>
                    </td>
                    <td><span className="transaction-amount negative">-₵45.00</span></td>
                    <td>₵350.00</td>
                    <td>
                        <div className="action-dropdown">
                        <button className="action-trigger" onClick={toggleActionMenu}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="12" cy="5" r="1"/>
                            <circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                        <div className="action-menu">
                            <div className="action-menu-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            View Details
                            </div>
                            <div className="action-menu-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                            </div>
                            <div className="action-menu-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                            </svg>
                            Duplicate
                            </div>
                            <div className="action-menu-item danger">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Delete
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>

                    {/* <!-- More rows with same dropdown pattern (abbreviated for space) --> */}
                    <tr>
                    <td><span className="transaction-id">TXN-1046</span></td>
                    <td>
                        <div className="transaction-date">Mar 06, 2026</div>
                        <span className="transaction-time">10:15 AM</span>
                    </td>
                    <td>Shell Gas Station</td>
                    <td><span className="transaction-type-badge expense">Expense</span></td>
                    <td>
                        <div className="envelope-tag">
                        <svg className="envelope-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/></svg>
                        Transportation
                        </div>
                    </td>
                    <td><span className="transaction-amount negative">-₵60.00</span></td>
                    <td>₵80.00</td>
                    <td>
                        <div className="action-dropdown">
                        <button className="action-trigger" onClick={toggleActionMenu}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                        <div className="action-menu">
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>View Details</div>
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit</div>
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>Duplicate</div>
                            <div className="action-menu-item danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</div>
                        </div>
                        </div>
                    </td>
                    </tr>

                    <tr>
                    <td><span className="transaction-id">TXN-1045</span></td>
                    <td>
                        <div className="transaction-date">Mar 01, 2026</div>
                        <span className="transaction-time">12:00 PM</span>
                    </td>
                    <td>Monthly Salary Deposit</td>
                    <td><span className="transaction-type-badge income">Income</span></td>
                    <td>
                        <div className="envelope-tag">
                        <svg className="envelope-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/></svg>
                        Multiple
                        </div>
                    </td>
                    <td><span className="transaction-amount positive">+₵2,000</span></td>
                    <td>₵1,420</td>
                    <td>
                        <div className="action-dropdown">
                        <button className="action-trigger" onClick={toggleActionMenu}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                        <div className="action-menu">
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>View Details</div>
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit</div>
                            <div className="action-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>Duplicate</div>
                            <div className="action-menu-item danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</div>
                        </div>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>

            {/* <!-- Pagination --> */}
            <div className="pagination">
                <div className="pagination-info">
                Showing <strong>1-10</strong> of <strong>37</strong> transactions
                </div>

                <div className="pagination-controls">
                <button className="page-btn" disabled>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </main>

        {/* <!-- Custom Date Range Modal --> */}
        <div className="modal-overlay" id="dateRangeModal">
            <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">Custom Date Range</h3>
                <button className="modal-close" onClick={closeDateRangeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            <div className="modal-body">
                <form>
                <div className="date-range-grid">
                    <div className="form-group">
                    <label className="form-label" htmlFor="date-range-start-date">Start Date</label>
                    <input id="date-range-start-date" type="date" className="form-input" value="2026-01-01" />
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="date-range-end-date">End Date</label>
                    <input id="date-range-end-date" type="date" className="form-input" value="2026-03-06" />
                    </div>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeDateRangeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={applyDateRange}>Apply Filter</button>
            </div>
            </div>
        </div>

        {/* <!-- Sort Modal --> */}
        <div className="modal-overlay" id="sortModal">
            <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">Sort Transactions</h3>
                <button className="modal-close" onClick={closeSortModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            <div className="modal-body">
                <div className="sort-options">
                <div className="sort-option active">
                    <div className="sort-option-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    Date
                    </div>
                    <span className="sort-direction">Newest First</span>
                </div>
                <div className="sort-option">
                    <div className="sort-option-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Amount
                    </div>
                    <span className="sort-direction">Highest First</span>
                </div>
                <div className="sort-option">
                    <div className="sort-option-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                    </svg>
                    Envelope
                    </div>
                    <span className="sort-direction">A-Z</span>
                </div>
                <div className="sort-option">
                    <div className="sort-option-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6"/>
                        <line x1="8" y1="12" x2="21" y2="12"/>
                        <line x1="8" y1="18" x2="21" y2="18"/>
                        <line x1="3" y1="6" x2="3.01" y2="6"/>
                        <line x1="3" y1="12" x2="3.01" y2="12"/>
                        <line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                    Description
                    </div>
                    <span className="sort-direction">A-Z</span>
                </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeSortModal}>Cancel</button>
                <button className="btn btn-primary" onClick={applySort}>Apply Sort</button>
            </div>
            </div>
        </div>

        {/* <!-- Export Modal --> */}
        <div className="modal-overlay" id="exportModal">
            <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">Export Transactions</h3>
                <button className="modal-close" onClick={closeExportModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            <div className="modal-body">
                <div className="info-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <div className="info-alert-text">
                    Select an export format below. Your current filters will be applied to the export.
                </div>
                </div>

                <div className="export-options">
                <div className="export-option">
                    <div className="export-option-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    CSV (Comma Separated Values)
                    </div>
                    <div className="export-option-desc">
                    Compatible with Excel, Google Sheets, and most spreadsheet applications
                    </div>
                </div>

                <div className="export-option">
                    <div className="export-option-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Excel (.xlsx)
                    </div>
                    <div className="export-option-desc">
                    Native Microsoft Excel format with formatting preserved
                    </div>
                </div>

                <div className="export-option">
                    <div className="export-option-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                    PDF Document
                    </div>
                    <div className="export-option-desc">
                    Formatted report ready for printing or archiving
                    </div>
                </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeExportModal}>Cancel</button>
            </div>
            </div>
        </div>

        {/* <!-- Add Transaction Modal --> */}
        <div className="modal-overlay" id="addTransactionModal">
            <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">New Transaction</h3>
                <button className="modal-close" onClick={closeAddTransactionModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            <div className="modal-body">
                <div className="info-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <div className="info-alert-text">
                    All transactions are recorded instantly and will update your envelope balances.
                </div>
                </div>

                <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-type">Transaction Type *</label>
                    <select id="add-transaction-type" className="form-input" required>
                    <option value="">Select transaction type</option>
                    <option value="expense">Expense (Spending)</option>
                    <option value="income">Income (Deposit)</option>
                    <option value="transfer">Transfer</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-amount">Amount *</label>
                    <input id="add-transaction-amount" type="number" className="form-input" placeholder="0.00" step="0.01" min="0" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-description">Description *</label>
                    <input id="add-transaction-description" type="text" className="form-input" placeholder="e.g., Whole Foods Market, Monthly Salary" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-envelope">Envelope *</label>
                    <select id="add-transaction-envelope" className="form-input" required>
                    <option value="">Select envelope</option>
                    <option value="groceries">Groceries</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="healthcare">Healthcare</option>
                    </select>
                </div>

                <div className="date-range-grid">
                    <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-date">Date *</label>
                    <input id="add-transaction-date" type="date" className="form-input" value="2026-03-06" required />
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="add-transaction-time">Time *</label>
                    <input id="add-transaction-time" type="time" className="form-input" value="14:30" required />
                    </div>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeAddTransactionModal}>Cancel</button>
                <button className="btn btn-primary" onClick={saveTransaction}>Add Transaction</button>
            </div>
            </div>
        </div>
        </>
    );
}