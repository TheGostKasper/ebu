import {
  fetchAccounts,
  getMsisdns,
} from "../../services/group-account-service";
import { GroupAccount, MSISDN } from "../../types/groupAccount";
import DynamicSplitTableView from "../DynamicTable/DynamicSplitTableView";

const renderRowDetails = (msisdn: MSISDN) => (
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

const DynamicFiberTable = () => {
  return (
    <DynamicSplitTableView<GroupAccount, MSISDN>
      groupTitle="Fibe Group Account"
      fetchGroups={fetchAccounts}
      fetchRows={getMsisdns}
      renderGroup={(group) => (
        <span>
          {group.name} - {group.msisdns.length}
        </span>
      )}
      rowColumns={[
        {
          label: "MSISDN", // The displayed column name
          accessor: "id", // The key in the data or a direct mapping
          sortable: true, // Indicates if the column can be sorted
        },
        {
          label: "Plan Name",
          accessor: "planName",
          sortable: true,
        },
        {
          label: "Speed",
          accessor: "speed",
          sortable: false, // Sorting is disabled for this column
        },
        {
          label: "Mobility",
          accessor: "mobility",
          sortable: false,
        },
        {
          label: "Broadband Identifier",
          accessor: "broadbandIdentifier",
          sortable: true,
        },
        {
          label: "Dummy Col",
          accessor: "newItemConfig",
          sortable: false,
        },
      ]}
      renderRowHeader={(group) => {
        return (
          <span>
            {group.name} - {group.msisdns.length}
          </span>
        );
      }}
      renderRowDetails={renderRowDetails}
    />
  );
};

export default DynamicFiberTable;
