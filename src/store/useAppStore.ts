import { create } from "zustand";

interface AppState {
  isNavCollapsed: boolean;
  roles: string[];
  toggleNav: () => void;
}

const useAppStore = create<AppState>((set) => ({
  isNavCollapsed: false,
  roles: [],
  toggleNav: () => set((state) => ({ isNavCollapsed: !state.isNavCollapsed })),
  updateRoles: (roles: string[]) => set({ roles }),
}));

export const useBreadcrumbStore = create<{
  title: string;
  setTitle: (title: string) => void;
}>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
}));

export default useAppStore;
