import React, { useCallback, useState } from "react";
import useDataStore from "./store";
import { DataItem } from "./types";
import { useInfiniteData } from "./hooks/useInfiniteList";
const PAGE_SIZE = 50;

const DataTable: React.FC = () => {
  const {
    selectedItems,
    addSelectedItem,
    removeSelectedItem,
    searchTerm,
    setSearchTerm,
  } = useDataStore();
  const [isViewingSelected, setIsViewingSelected] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData({
      searchTerm,
      pageSize: PAGE_SIZE,
    });

  const handleItemClick = (item: DataItem) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      removeSelectedItem(item);
    } else {
      addSelectedItem(item);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (isViewingSelected) {
        console.log("Viewing selected items, no need to fetch more data.");
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        console.log("Fetching next page...");
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isLoading, isViewingSelected]
  );

  const toggleView = () => {
    setIsViewingSelected((prev) => !prev);
  };

  const displayedItems = isViewingSelected
    ? selectedItems
    : data?.pages.flatMap((page) => page.data) || [];

  return (
    <div
      className="flex flex-col w-full"
      style={{
        height: "40rem",
      }}
    >
      {/* Search Input */}
      <div className="flex items-center p-4 bg-gray-50 border-b border-gray-300">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={toggleView}
          className={`ml-4 px-4 py-2 rounded-md ${
            isViewingSelected
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 hover:text-white`}
        >
          {isViewingSelected
            ? "View All"
            : `View Selected (${selectedItems.length})`}
        </button>
      </div>

      {/* Table List */}
      <div
        className="flex-grow overflow-y-auto p-4 bg-white rounded-md shadow-inner"
        onScroll={handleScroll}
      >
        {displayedItems.length === 0 && !isLoading && (
          <div className="text-center text-gray-500">No items found.</div>
        )}

        <ul className="divide-y divide-gray-200">
          {displayedItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition"
            >
              <input
                type="checkbox"
                checked={selectedItems.some((i) => i.id === item.id)}
                onChange={() => handleItemClick(item)}
                className="mr-4 h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
              />
              <span className="flex-grow text-gray-800">{item.name}</span>
            </li>
          ))}
        </ul>

        {isLoading && (
          <div className="text-center text-gray-500 p-4">
            Loading more items...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-300 text-right">
        <span className="text-gray-600">
          {isViewingSelected
            ? `${selectedItems.length} item(s) selected`
            : `Loaded ${
                data?.pages.flatMap((page) => page.data).length || 0
              } items`}
        </span>
      </div>
    </div>
  );
};

export default DataTable;
