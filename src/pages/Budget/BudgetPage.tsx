import { useState } from "react";
import { Menu } from "lucide-react";
import "./BudgetPage.css";

import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function BudgetPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Sidebar isOpen={sidebarOpen} />
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
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetPage;
