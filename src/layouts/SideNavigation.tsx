import { Activity, ChevronLeft, ChevronRight, Home } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import useAppStore from "../store/useAppStore";

const SideNavigation: React.FC = () => {
  const { isNavCollapsed, toggleNav } = useAppStore();

  const routes = [
    { name: "Dashboard", icon: <Activity size={24} />, path: "/" },
    { name: "Mobility", icon: <Home size={24} />, path: "/home" },
    { name: "Fiber", icon: <Home size={24} />, path: "/fiber" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ${
        isNavCollapsed ? "w-16" : "w-64"
      } relative`}
    >
      <div className="p-4 flex items-center">
        <div className="flex items-center space-x-2 overflow-hidden">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
          <h1
            className={`font-bold text-xl whitespace-nowrap transition-opacity duration-300 ${
              isNavCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            My App
          </h1>
        </div>
      </div>

      <div className="border-t border-gray-700 my-2 relative">
        <button
          onClick={toggleNav}
          className={`absolute top-1/2 -translate-y-1/2 ${
            isNavCollapsed ? "-right-3" : "-right-4"
          } bg-gray-800 p-1 rounded-full hover:bg-gray-700 transition-all duration-200 shadow-lg`}
        >
          {isNavCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="space-y-2 px-2">
          {routes.map((route) => (
            <li key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) => `
                  flex items-center space-x-2 p-2 rounded-lg 
                  ${isActive ? "bg-gray-700" : "hover:bg-gray-700"} 
                  transition-all duration-200
                `}
              >
                {route.icon}
                <span
                  className={`transition-opacity duration-300 ${
                    isNavCollapsed ? "opacity-0 w-0" : "opacity-100"
                  }`}
                >
                  {route.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
