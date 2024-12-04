import { DataItem } from "./types";
const data: DataItem[] = [];
export const generateDummyData = (): DataItem[] => {
  if (data.length > 0) return data;
  for (let i = 1; i <= 10000; i++) {
    data.push({ id: i.toString(), name: `Item ${i}` });
  }
  return data;
};

// Export the generated dummy data
export const dummyData = generateDummyData();
