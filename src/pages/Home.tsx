import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import DepartmentTable from "../components/Tables/DepartmentTable";
import MobilityTable from "../components/Tables/MobilityTable";
import { useBreadcrumbStore } from "../store/useAppStore";
import DynamicTable from "../components/Tables/DynamicTable";

const Home: React.FC = () => {
  const title = "Dashboard";
  const { setTitle } = useBreadcrumbStore();

  const [activeTab, setActiveTab] = useState(0);

  React.useEffect(() => {
    setTitle(title);
  }, [setTitle]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>

      {/* Tabs Component */}
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

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <MobilityTable />}
        {activeTab === 1 && <DepartmentTable />}
        {activeTab === 2 && <DynamicTable />}
      </Box>
    </div>
  );
};

export default Home;
