import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { NavLink } from "react-router-dom";

type SidebarNavLinkProps = {
  name: string;
  path: string;
  iconName: "home" | "dashboard" | "analytics" | "settings" | "helpcircle" | "wallet";
};

const iconMap: Record<SidebarNavLinkProps["iconName"], IconName> = {
  home: "home",
  dashboard: "layout-dashboard",
  analytics: "bar-chart-3",
  settings: "settings",
  helpcircle: "help-circle",
  wallet: 'wallet'
};

export default function SidebarNavLink({
  path,
  name,
  iconName,
}: Readonly<SidebarNavLinkProps>) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
    >
      <DynamicIcon name={iconMap[iconName]} size={20} />
      <span className="title">{name}</span>
    </NavLink>
  );
}
