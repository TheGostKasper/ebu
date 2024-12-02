import { useEffect } from "react";
import { useBreadcrumbStore } from "../store/useAppStore";

const Dashboard = () => {
  const title = "Dashboard";
  const { setTitle } = useBreadcrumbStore();

  useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    </div>
  );
};

export default Dashboard;
