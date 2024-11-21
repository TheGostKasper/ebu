import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavigation />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
