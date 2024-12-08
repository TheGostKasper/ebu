import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import DepartmentTable from "../../Tables/DepartmentTable";
import MobilityTable from "../../Tables/MobilityTable";
import DynamicFiberTable from "../../Tables/FiberTable";
import { useBreadcrumbStore } from "../../../store/useAppStore";

const FiberDashboard = () => {
  const title = "Fiber";
  const { setTitle } = useBreadcrumbStore();

  React.useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <div className="space-y-6">
      <Tabs 
        value={activeTab}
        onChange={handleChange}
        aria-label="dashboard-tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Tele Table"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        />
        <Tab
          label="Dep Table"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        />
        <Tab
          label="Split Table"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <MobilityTable />}
        {activeTab === 1 && <DepartmentTable />}
        {activeTab === 2 && <DynamicFiberTable />}
      </Box>
    </div>
  );
};

export default FiberDashboard;
