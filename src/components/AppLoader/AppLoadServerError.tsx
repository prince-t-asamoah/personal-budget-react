import "./AppLoader.css";

export function AppLoadServerError({
  retry,
}: Readonly<{
  retry: () => void;
}>) {
  return (
    <div className="splash-error-container">
      {/* <!-- Error --> */}
      <div className="splash-failed">
        <div className="error-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h2 className="error-title">Server Error</h2>
        <p className="error-message">
          Something went wrong on our end. We're working to fix it. Please try
          again in a few moments.
        </p>

        <div className="error-code">ERR_500</div>

        <div className="error-actions">
          <button className="btn btn-primary" onClick={retry}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Retry
          </button>
          <button className="btn btn-secondary">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
