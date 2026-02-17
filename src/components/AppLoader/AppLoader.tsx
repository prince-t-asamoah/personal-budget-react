import "./AppLoader.css";
import AppLogo from "../AppLogo/AppLogo";

export default function AppLoader() {
  return (
    <div className="loader-container" id="appLoader">
      {/* <!-- Animated background --> */}
      <div className="loader-background">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      {/* <!-- Loader content --> */}
      <div className="loader-content">
        {/* <!-- Logo --> */}
        <div className="loader-logo">
          <AppLogo />
        </div>

        {/* <!-- Spinner --> */}
        <div className="loader-spinner">
          <div className="spinner">
            <div className="spinner-ring"></div>
          </div>
        </div>

        {/* <!-- Loading text --> */}
        {/* <div className="loader-text">
          <h2>Loading Your Dashboard</h2>
          <p>
            Please wait
            <span className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </p>
        </div> */}

        {/* <!-- Progress bar --> */}
        <div className="progress-container">
          <div className="progress-bar" id="progressBar"></div>
        </div>

        {/* <!-- Loading message --> */}
        {/* <div className="loading-message" id="loadingMessage">
          Loading...
        </div> */}
      </div>
    </div>
  );
}
