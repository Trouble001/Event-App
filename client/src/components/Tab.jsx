import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const Tab = () => {
  const tabs = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Profile", path: "/profile", icon: UserIcon },
    { name: "Settings", path: "/login", icon: Cog6ToothIcon },
  ];

  return (
    <div className="w-full md:w-20 md:h-screen fixed bottom-0 md:left-0 bg-white/70 backdrop-blur-lg shadow border-t md:border-l border-gray-200">
      <div className="md:h-full flex md:items-center justify-around md:flex-col py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-cyan-500" : "text-gray-500"
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span className="hidden md:block text-xs">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Tab;