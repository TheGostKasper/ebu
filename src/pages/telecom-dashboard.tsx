import { useEffect } from "react";
import { useBreadcrumbStore } from "../store/useAppStore";
import AddonsList from "../components/Features/Addons";

const Dashboard = () => {
  const title = "Dashboard";
  const { setTitle } = useBreadcrumbStore();

  useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <AddonsList />
    </div>
  );
};

export default Dashboard;
