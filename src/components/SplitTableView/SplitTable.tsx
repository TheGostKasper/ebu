import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Column, SplitViewTableProps } from "../../types/groupAccount";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export function SplitViewTable<TGroup, TRow>({
  // Data props
  groupData,
  getGroupId,
  getGroupTitle,
  getGroupSubtitle,
  getRowsFromGroup,

  // Column configurations
  rowColumns,

  // Custom rendering
  renderGroupCard,
  renderExpandedRowDetails,

  // Titles
  groupSectionTitle = "Groups",
  rowSectionTitle = "Items",
  emptyGroupSelectionMessage = "No group selected",
}: SplitViewTableProps<TGroup, TRow>) {
  // State
  const [selectedGroup, setSelectedGroup] = useState<TGroup | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null
  );

  const [groupPage, setGroupPage] = useState(0);
  const [groupRowsPerPage, setGroupRowsPerPage] = useState(
    ROWS_PER_PAGE_OPTIONS[0]
  );
  const [rowPage, setRowPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  // Pagination calculations
  const paginatedGroups = groupData.slice(
    groupPage * groupRowsPerPage,
    groupPage * groupRowsPerPage + groupRowsPerPage
  );

  const rows = selectedGroup ? getRowsFromGroup(selectedGroup) : [];
  const paginatedRows = rows.slice(
    rowPage * rowsPerPage,
    rowPage * rowsPerPage + rowsPerPage
  );

  // Event handlers
  const handleGroupClick = (group: TGroup) => {
    setSelectedGroup(group);
    setExpandedRowId(null);
    setRowPage(0);
  };

  const handleRowClick = (row: TRow) => {
    if (renderExpandedRowDetails) {
      const rowId = getGroupId(row as unknown as TGroup); // Type assertion needed here
      setExpandedRowId(expandedRowId === rowId ? null : rowId);
    }
  };

  // Render cell content
  const renderCell = (row: TRow, column: Column<TRow>): any => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor];
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0 overflow-hidden">
      {/* Groups Section */}
      <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[calc(100vh-20rem)]">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {groupSectionTitle}
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="p-4 space-y-2">
            {paginatedGroups.map((group) =>
              renderGroupCard ? (
                <div
                  key={getGroupId(group)}
                  onClick={() => handleGroupClick(group)}
                >
                  {renderGroupCard(
                    group,
                    selectedGroup
                      ? getGroupId(group) === getGroupId(selectedGroup)
                      : false
                  )}
                </div>
              ) : (
                <div
                  key={getGroupId(group)}
                  onClick={() => handleGroupClick(group)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                    selectedGroup &&
                    getGroupId(group) === getGroupId(selectedGroup)
                      ? "bg-blue-100 border-blue-300"
                      : "hover:bg-gray-50 border-transparent"
                  } border`}
                >
                  <p className="font-semibold text-gray-800">
                    {getGroupTitle(group)}
                  </p>
                  {getGroupSubtitle && (
                    <p className="text-sm text-gray-600">
                      {getGroupSubtitle(group)}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Groups Pagination */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <select
            className="border rounded-md p-1 text-sm"
            value={groupRowsPerPage}
            onChange={(e) => setGroupRowsPerPage(Number(e.target.value))}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setGroupPage((prev) => Math.max(0, prev - 1))}
              disabled={groupPage === 0}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setGroupPage((prev) => prev + 1)}
              disabled={(groupPage + 1) * groupRowsPerPage >= groupData.length}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rows Section */}
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[calc(100vh-20rem)]">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedGroup
              ? `${rowSectionTitle} for ${getGroupTitle(selectedGroup)}`
              : emptyGroupSelectionMessage}
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto">
          {selectedGroup ? (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {renderExpandedRowDetails && (
                        <th className="w-8 px-4 py-3" />
                      )}
                      {rowColumns.map((column, index) => (
                        <th
                          key={index}
                          className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                            column.className || ""
                          }`}
                        >
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedRows.map((row) => (
                      <React.Fragment
                        key={getGroupId(row as unknown as TGroup)}
                      >
                        <tr
                          onClick={() => handleRowClick(row)}
                          className={`cursor-pointer transition-colors duration-150 hover:bg-gray-50`}
                        >
                          {renderExpandedRowDetails && (
                            <td className="w-8 px-4 py-4">
                              {expandedRowId ===
                              getGroupId(row as unknown as TGroup) ? (
                                <ChevronUpIcon className="w-4 h-4" />
                              ) : (
                                <ChevronDownIcon className="w-4 h-4" />
                              )}
                            </td>
                          )}
                          {rowColumns.map((column, index) => (
                            <td
                              key={index}
                              className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                                column.className || ""
                              }`}
                            >
                              {renderCell(row, column)}
                            </td>
                          ))}
                        </tr>
                        {renderExpandedRowDetails &&
                          expandedRowId ===
                            getGroupId(row as unknown as TGroup) && (
                            <tr>
                              <td
                                colSpan={rowColumns.length + 1}
                                className="bg-gray-50"
                              >
                                {renderExpandedRowDetails(row)}
                              </td>
                            </tr>
                          )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 p-8">
              {emptyGroupSelectionMessage}
            </p>
          )}
        </div>

        {/* Rows Pagination */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <select
            className="border rounded-md p-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setRowPage((prev) => Math.max(0, prev - 1))}
              disabled={rowPage === 0}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setRowPage((prev) => prev + 1)}
              disabled={(rowPage + 1) * rowsPerPage >= rows.length}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
