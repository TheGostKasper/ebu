import { useEffect } from "react";
import { useGroupAccountStore } from "../../store/group-account-store";
import { Column } from "../../types/groupAccount";
import { SplitViewTable } from "../Generics/SplitTable";

interface GroupAccount {
  id: string;
  name: string;
  msisdns: MSISDN[];
}

interface MSISDN {
  id: string;
  planName: string;
  speed: string;
  mobility: string;
  broadbandIdentifier: string;
}

const msisdnColumns: Column<MSISDN>[] = [
  { header: "MSISDN", accessor: "id" },
  { header: "Plan Name", accessor: "planName" },
  { header: "Speed", accessor: "speed" },
  { header: "Speed 2", accessor: "mobility" },
  { header: "Broadband Identifier", accessor: "broadbandIdentifier" },
];

// Optional: Custom expanded row details renderer
const renderMSISDNDetails = (msisdn: MSISDN) => (
  <div className="p-6">
    <div className="grid grid-cols-2 gap-6">
      <div>
        <p className="font-medium text-gray-600">MSISDN:</p>
        <p className="text-gray-800">{msisdn.id}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Plan Name:</p>
        <p className="text-gray-800">{msisdn.planName}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Speed:</p>
        <p className="text-gray-800">{msisdn.speed}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Broadband Identifier:</p>
        <p className="text-gray-800">{msisdn.broadbandIdentifier}</p>
      </div>
    </div>
  </div>
);

const MobilityTable = () => {
  const { groupAccounts, fetchGroupAccounts } = useGroupAccountStore();
  useEffect(() => {
    fetchGroupAccounts();
  }, [fetchGroupAccounts]);
  return (
    <SplitViewTable<GroupAccount, MSISDN>
      groupData={groupAccounts}
      getGroupId={(group) => group.id}
      getGroupTitle={(group) => group.name}
      getGroupSubtitle={(group) => `MSISDNs: ${group.msisdns.length}`}
      getRowsFromGroup={(group) => group.msisdns}
      rowColumns={msisdnColumns}
      renderExpandedRowDetails={renderMSISDNDetails}
      groupSectionTitle="Group Accounts"
      rowSectionTitle="MSISDNs"
    />
  );
};

export default MobilityTable;
