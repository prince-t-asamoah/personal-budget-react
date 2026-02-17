import { Settings, ChevronDown, User, Bell, LogOut } from "lucide-react";
import { useState } from "react";

import { APP_ROUTES } from "../../../constants/routes.constants";
import AppLogo from "../../../components/AppLogo/AppLogo";
import SidebarNavLink from "./SidebarNavLink";

export default function Sidebar({
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

  const routes: {
    name: string;
    path: string;
    iconName: "home" | "dashboard" | "analytics" | "settings" | "helpcircle" | "wallet";
  }[] = [
    {
      name: APP_ROUTES.DASHBOARD.NAME,
      path: APP_ROUTES.DASHBOARD.URL,
      iconName: "dashboard",
    },
     {
      name: APP_ROUTES.ENVELOPES.NAME,
      path: APP_ROUTES.ENVELOPES.URL,
      iconName: "wallet",
    },
    {
      name: APP_ROUTES.ANALYTICS.NAME,
      path: APP_ROUTES.ANALYTICS.URL,
      iconName: "analytics",
    },
    {
      name: APP_ROUTES.SETTINGS.NAME,
      path: APP_ROUTES.SETTINGS.URL,
      iconName: "settings",
    },
    {
      name: APP_ROUTES.HELP_SUPPORT.NAME,
      path: APP_ROUTES.HELP_SUPPORT.URL,
      iconName: "helpcircle",
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <AppLogo />
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {routes.map((route) => (
          <SidebarNavLink
            key={route.path}
            name={route.name}
            path={route.path}
            iconName={route.iconName}
          />
        ))}
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
