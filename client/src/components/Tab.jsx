import { NavLink } from "react-router-dom";
import { HomeIcon as HomeOutline } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";

import { UserIcon as UserOutline } from "@heroicons/react/24/outline";
import { UserIcon as UserSolid } from "@heroicons/react/24/solid";

import { Cog6ToothIcon as SettingOutline } from "@heroicons/react/24/outline";
import { Cog6ToothIcon as SettingSolid } from "@heroicons/react/24/solid";

import { Squares2X2Icon as DashboardOutline } from "@heroicons/react/24/outline";
import { Squares2X2Icon as DashboardSolid } from "@heroicons/react/24/solid";

import LiquidGlass from "./LiquidGlass";
import { useSelector } from "react-redux";

const Tab = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.is_staff || user?.is_superuser;

  const tabs = [
    {
      name: "Home",
      path: "/",
      icon: { outline: HomeOutline, solid: HomeSolid },
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: { outline: DashboardOutline, solid: DashboardSolid },
      roles: ["admin"],
    },
    {
      name: "Profile",
      path: "/profile",
      icon: { outline: UserOutline, solid: UserSolid },
    },
    {
      name: "Settings",
      path: "/setting",
      icon: { outline: SettingOutline, solid: SettingSolid },
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    if (!tab.roles) return true;
    if (tab.roles.includes("admin") && isAdmin) return true;
    return false;
  });

  return (
    <div className="w-full bg-transparent md:w-20 md:h-screen fixed bottom-0 md:left-0 py-4 md:py-0 z-20">
      <LiquidGlass className="w-full max-w-xs mx-auto md:h-full flex md:items-center justify-around md:flex-col md:border-r md:border-l-0 md:border-t-0 md:border-b-0 rounded-full md:rounded-none py-3 md:py-0">
        
        {filteredTabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-teal-400" : "text-white/70"
              }`
            }
          >
            {({ isActive }) => {
              const Icon = isActive
                ? tab.icon.solid
                : tab.icon.outline;

              return (
                <>
                  <Icon className="h-7 w-7 transition-all duration-200" />
                  <span className="hidden md:block text-xs">
                    {tab.name}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}

      </LiquidGlass>
    </div>
  );
};

export default Tab;