import {
  Home,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routes.constants";
import AppLogo from "../../../components/AppLogo/AppLogo";

export default function DashboardSidebar({
  isOpen,
}: Readonly<{ isOpen: boolean }>) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock user data - replace with actual user from API/auth
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // Can be a URL to user's avatar
    initials: "JD",
  });

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <AppLogo />
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        <NavLink
          to={APP_ROUTES.DASHBOARD.URL}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={APP_ROUTES.ANALYTICS.URL}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>
        <NavLink
          to={APP_ROUTES.SETTINGS.URL}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to={APP_ROUTES.HELP_SUPPORT.URL}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer - User Profile */}
      <div className="sidebar-footer">
        <div
          className="user-profile"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              user.initials
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <ChevronDown
            size={18}
            style={{
              color: "var(--dark-sage)",
              transform: userMenuOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s ease",
            }}
          />

          {/* User Menu Dropdown */}
          <div className={`user-menu-dropdown ${userMenuOpen ? "open" : ""}`}>
            <div className="user-menu-item">
              <User size={18} />
              <span>My Profile</span>
            </div>
            <div className="user-menu-item">
              <Bell size={18} />
              <span>Notifications</span>
            </div>
            <div className="user-menu-item">
              <Settings size={18} />
              <span>Account Settings</span>
            </div>
            <div className="user-menu-item danger">
              <LogOut size={18} />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
