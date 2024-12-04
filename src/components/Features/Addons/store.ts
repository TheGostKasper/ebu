// Zustand store
import { create } from "zustand";
import { DataItem } from "./types";

interface StoreState {
  selectedItems: DataItem[];
  addSelectedItem: (item: DataItem) => void;
  removeSelectedItem: (item: DataItem) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const useDataStore = create<StoreState>((set) => ({
  selectedItems: [],
  addSelectedItem: (item) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, item],
    })),
  removeSelectedItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((i) => i.id !== item.id),
    })),
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useDataStore;
