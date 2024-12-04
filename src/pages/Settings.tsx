import React from "react";
import { useBreadcrumbStore } from "../store/useAppStore";

const Settings: React.FC = () => {
  const title = "Settings";
  const { setTitle } = useBreadcrumbStore();

  React.useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  );
};

export default Settings;
