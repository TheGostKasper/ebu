import { useInfiniteQuery } from "react-query";
import { DataItem } from "../types";
import { dummyData } from "../dummyData";

export interface FetchDataResponse {
  data: DataItem[];
  hasMore: boolean;
  page: number;
}

interface UseInfiniteDataParams {
  searchTerm: string;
  pageSize: number;
}

export const useInfiniteData = ({
  searchTerm,
  pageSize,
}: UseInfiniteDataParams) => {
  return useInfiniteQuery<FetchDataResponse>(
    ["data", searchTerm, pageSize],
    async ({ pageParam = 1 }) => {
      // Simulating asynchronous behavior with a Promise
      const response = await new Promise<FetchDataResponse>((resolve) => {
        console.log("Fetching Page:", pageParam, "Search Term:", searchTerm);

        setTimeout(() => {
          const filteredData = dummyData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          const startIndex = (pageParam - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          const pageData = filteredData.slice(startIndex, endIndex);
          const hasMore = endIndex < filteredData.length;

          resolve({
            data: pageData,
            hasMore,
            page: pageParam,
          });
        }, 500); // Simulate a delay (500ms) to mimic real API latency
      });

      return response;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      keepPreviousData: true,
    }
  );
};
