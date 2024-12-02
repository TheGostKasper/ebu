import React from "react";
import DynamicTable from "../components/Tables/DynamicTable";
import { useBreadcrumbStore } from "../store/useAppStore";

const Mobility: React.FC = () => {
  const title = "Mobility";
  const { setTitle } = useBreadcrumbStore();

  React.useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <DynamicTable />
    </div>
  );
};

export default Mobility;
