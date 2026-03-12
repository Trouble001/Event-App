import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon, Cog6ToothIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const Tab = () => {
  const tabs = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Dashboard", path: "/dashboard", icon: Squares2X2Icon},
    { name: "Profile", path: "/profile", icon: UserIcon },
    { name: "Settings", path: "/login", icon: Cog6ToothIcon },
  ];

  return (
    <div className="w-full md:w-20 md:h-screen fixed bottom-0 md:left-0 bg-white/20 backdrop-blur-md shadow-xl border-t md:border-r border-white/30">
      <div className="md:h-full flex md:items-center justify-around md:flex-col py-2">
        {tabs.map((tab) => {
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
    </div>
  );
}

export default Tab;