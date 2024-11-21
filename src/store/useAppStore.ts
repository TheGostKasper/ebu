import { create } from "zustand";

interface AppState {
  isNavCollapsed: boolean;
  toggleNav: () => void;
}

const useAppStore = create<AppState>((set) => ({
  isNavCollapsed: false,
  toggleNav: () => set((state) => ({ isNavCollapsed: !state.isNavCollapsed })),
}));

export const useBreadcrumbStore = create<{
  title: string;
  setTitle: (title: string) => void;
}>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
}));

export default useAppStore;
