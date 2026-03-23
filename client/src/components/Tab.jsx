import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon, Cog6ToothIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import LiquidGlass from "./LiquidGlass";
import {  useSelector } from 'react-redux';


const Tab = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.is_staff || user?.is_superuser;

  const tabs = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Dashboard", path: "/dashboard", icon: Squares2X2Icon, roles: ["admin"]},
    { name: "Profile", path: "/profile", icon: UserIcon },
    { name: "Settings", path: "/setting", icon: Cog6ToothIcon },
  ];

  const filteredTabs = tabs.filter((tab) => {
    // If no roles → visible to everyone
    if (!tab.roles) return true;

    // Admin check
    if (tab.roles.includes("admin") && isAdmin) return true;

    return false;
});

  return (
    <LiquidGlass className="w-full md:w-20 md:h-screen fixed bottom-0 md:left-0 border-t border-b-0 border-r-0 border-l-0 md:border-r md:border-l-0 md:border-t-0 md:border-b-0 rounded-none">
      <div className="md:h-full flex md:items-center justify-around md:flex-col py-2">
        {filteredTabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-cyan-500" : "text-white"
                }`
              }
            >
              <Icon className="h-7 w-7" />
              <span className="hidden md:block text-xs">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </LiquidGlass>
  );
}

export default Tab;