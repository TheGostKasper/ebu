import { useState } from "react";
import GroupSection from "./GroupSection";
import RowSection from "./RowSection";
import { GroupSectionProps, RowSectionProps } from "./types";

const DynamicSplitTableView = <TGroup, TRow>({
  fetchGroups,
  fetchRows,
  renderGroup,
  rowColumns,
  groupTitle,
  renderRowDetails,
  renderRowHeader,
}: {
  fetchGroups: GroupSectionProps<TGroup>["fetchGroups"];
  fetchRows: RowSectionProps<TRow>["fetchRows"];
  renderGroup: GroupSectionProps<TGroup>["renderGroup"];
  rowColumns: RowSectionProps<TRow>["columns"];
  renderRowDetails?: RowSectionProps<TRow>["renderRowDetails"];
  groupTitle: string;
  renderRowHeader?: (group: TGroup) => React.ReactNode;
}) => {
  const [selectedGroup, setSelectedGroup] = useState<TGroup | null>(null);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0 overflow-hidden">
      <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[calc(100vh-20rem)]">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{groupTitle}</h2>
        </div>
        <GroupSection
          title={groupTitle}
          fetchGroups={fetchGroups}
          renderGroup={renderGroup}
          onGroupSelect={setSelectedGroup}
        />
      </div>
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[calc(100vh-20rem)]">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedGroup && renderRowHeader
              ? renderRowHeader(selectedGroup)
              : "Select a group"}
          </h2>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto justify-between ">
          {selectedGroup ? (
            <RowSection
              fetchRows={({ page, pageSize, sort }) => {
                const mappedParams = {
                  page,
                  pageSize,
                  sort,
                  groupId: (selectedGroup as any)?.id,
                };
                return fetchRows(mappedParams);
              }}
              columns={rowColumns}
              group={selectedGroup}
              renderRowDetails={renderRowDetails}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a group to see the details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicSplitTableView;
