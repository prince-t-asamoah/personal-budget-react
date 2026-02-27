import { Settings, ChevronDown, User, Bell, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { APP_ROUTES } from "../../../constants/routes.constants";
import AppLogo from "../../../components/AppLogo/AppLogo";
import SidebarNavLink from "./SidebarNavLink";
import { useAuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/apis/authApi.service";

export default function Sidebar({ isOpen }: Readonly<{ isOpen: boolean }>) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const routes: {
    name: string;
    path: string;
    iconName:
      | "home"
      | "dashboard"
      | "analytics"
      | "settings"
      | "helpcircle"
      | "wallet";
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

  const logoOut = () => {
    logoutUser()
      .then((response) => {
        if (!response.ok) return;
        dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
        dispatch({ type: "SET_USER", payload: null });
        navigate(APP_ROUTES.LOGIN.URL);
      })
      .catch((err) => {
        console.error("Logout Error: ", err);
      });
  };

  /** Get intials from name */
  const getNameInitials = (name: string | null = "Anonymous") => {
    if (!name) return "";
    const namesSplitArray = name.split(" ");
    let initials = "";

    if (namesSplitArray.length > 2) {
      initials =
        namesSplitArray[0].charAt(0).toUpperCase() +
        namesSplitArray[1].charAt(0).toUpperCase();
    } else {
      initials = namesSplitArray[0].charAt(0).toUpperCase();
    }
    return initials;
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <>
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
            tabIndex={0}
            onClick={() => setUserMenuOpen((open) => !open)}
            ref={userMenuRef}
            style={{ position: "relative" }} // <-- Ensure this is set
          >
            <div className="user-avatar">
              {state?.user?.profileImageUrl ? (
                <img
                  src={state?.user.profileImageUrl}
                  alt={state?.user.fullName}
                />
              ) : (
                getNameInitials(state?.user?.fullName)
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{state?.user?.fullName}</div>
              <div className="user-email">{state?.user?.email}</div>
            </div>
            <ChevronDown
              size={18}
              style={{
                color: "var(--dark-sage)",
                transform: userMenuOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s ease",
              }}
            />
            {/* User profile dropdown menu */}
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
              <div className="user-menu-item danger" onClick={logoOut}>
                <LogOut size={18} />
                <span>Log Out</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
