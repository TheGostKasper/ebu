import React, { useState } from "react";
import { useQuery } from "react-query";
import { Search } from "lucide-react";
import Pagination from "./Pagination";

interface GroupSectionProps<TGroup> {
  title: string;
  fetchGroups: (params: {
    page: number;
    pageSize: number;
    search: string;
  }) => Promise<{
    items: TGroup[];
    total: number;
  }>;
  renderGroup: (group: TGroup) => React.ReactNode;
  onGroupSelect: (group: TGroup | null) => void;
}

const GroupSection = <TGroup,>({
  fetchGroups,
  renderGroup,
  onGroupSelect,
}: GroupSectionProps<TGroup>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data: groupData, isLoading } = useQuery(
    ["groups", page, pageSize, search],
    () => fetchGroups({ page, pageSize, search }),
    { keepPreviousData: false }
  );

  return (
    <div className="flex flex-col justify-between flex-grow overflow-y-auto">
      <div className="p-4 space-y-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Group List */}
        <ul className="divide-y bg-gray-50 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="text-center py-4 text-gray-600">Loading...</div>
          )}
          {groupData?.items.map((group: TGroup) => (
            <li
              key={JSON.stringify(group)}
              className="p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => onGroupSelect(group)}
            >
              {renderGroup(group)}
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <Pagination
          currentPage={page}
          totalItems={groupData?.total || 0}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default GroupSection;
