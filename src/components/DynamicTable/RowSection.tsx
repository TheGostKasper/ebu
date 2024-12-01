import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import Pagination from "./Pagination";
import { RowSectionProps } from "./types";

const RowSection = <TRow,>({
  fetchRows,
  columns,
  renderRowDetails,
  pageSizeOptions = [5, 10, 20, 50],
  group,
}: RowSectionProps<TRow>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [sort, setSort] = useState<{
    field: string;
    type: "asc" | "desc" | "";
  }>({
    field: "",
    type: "",
  });
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const { data: rowData, isLoading } = useQuery(
    ["rows", page, pageSize, sort, group?.id],
    () =>
      fetchRows({
        page,
        pageSize,
        sort,
      }),
    {
      keepPreviousData: true, // Changed to true to prevent flickering
      staleTime: Infinity, // Prevent unnecessary refetches
      cacheTime: Infinity,
    }
  );

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      type:
        prev.field === field
          ? prev.type === "asc"
            ? "desc"
            : prev.type === "desc"
            ? ""
            : "asc"
          : "asc",
    }));
  };

  const toggleRowExpand = (rowIndex: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowIndex)) {
        newExpandedRows.delete(rowIndex);
      } else {
        newExpandedRows.add(rowIndex);
      }
      return newExpandedRows;
    });
  };

  return (
    <>
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              {/* Table Header */}
              <thead className="sticky top-0 bg-gray-100 z-10 shadow-md">
                <tr>
                  {renderRowDetails && (
                    <th className="w-12 px-4 py-2"></th> // Expansion column
                  )}
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={`px-4 py-2 text-left font-semibold text-gray-600 ${
                        col.sortable ? "cursor-pointer" : ""
                      }`}
                      onClick={() =>
                        col.sortable && handleSort(col.accessor as string)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <span>
                          {typeof col.label === "function"
                            ? col.label()
                            : col.label}
                        </span>
                        {col.sortable && sort.field === col.accessor && (
                          <>
                            {sort.type === "asc" && (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            )}
                            {sort.type === "desc" && (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* Loading State */}
                {isLoading && (
                  <tr>
                    <td
                      colSpan={columns.length + (renderRowDetails ? 1 : 0)}
                      className="text-center py-4 text-gray-600"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {rowData?.items.map((row: TRow, rowIndex) => (
                  <>
                    <tr
                      key={(row as any).id}
                      className="hover:bg-gray-50 border-b last:border-none"
                    >
                      {renderRowDetails && (
                        <td className="w-12 px-4 py-2 text-center">
                          <button
                            onClick={() => toggleRowExpand(rowIndex)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {expandedRows.has(rowIndex) ? (
                              <ChevronDownIcon className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      )}
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-2 text-gray-700 border-r last:border-none"
                        >
                          {typeof col.accessor === "string"
                            ? (row as any)[col.accessor]
                            : col.accessor(row)}
                        </td>
                      ))}
                    </tr>

                    {/* Row Details */}
                    {renderRowDetails && expandedRows.has(rowIndex) && (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="bg-gray-50 p-4"
                        >
                          {renderRowDetails(row)}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <Pagination
          currentPage={page}
          totalItems={rowData?.total || 0}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(1);
          }}
        />
      </div>
    </>
  );
};

export default RowSection;
