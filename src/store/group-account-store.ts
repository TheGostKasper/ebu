import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Department,
  GroupAccount,
  ITDepartment,
  Library,
} from "../types/groupAccount";
import {
  fetchEmployeeData,
  fetchGroupAccounts,
  fetchITAssetData,
  fetchLibraryData,
} from "../services/group-account-service";

interface GroupAccountState {
  groupAccounts: GroupAccount[];
  isLoading: boolean;
  error: string | null;
  expandedGroups: Set<string>;
  expandedMSISDNs: Set<string>;
  checkedGroups: Set<string>;
  checkedMSISDNs: Set<string>;
  fetchGroupAccounts: () => Promise<void>;
  toggleGroup: (groupId: string) => void;
  toggleMSISDN: (msisdnId: string) => void;
  toggleGroupCheck: (groupId: string, isChecked: boolean) => void;
  toggleMSISDNCheck: (msisdnId: string, isChecked: boolean) => void;
}

export const useGroupAccountStore = create<GroupAccountState>()(
  devtools((set) => ({
    groupAccounts: [],
    isLoading: false,
    error: null,
    expandedGroups: new Set(),
    expandedMSISDNs: new Set(),
    checkedGroups: new Set(),
    checkedMSISDNs: new Set(),

    fetchGroupAccounts: async () => {
      set({ isLoading: true, error: null });
      try {
        const accounts = await fetchGroupAccounts();
        set({ groupAccounts: accounts, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    toggleGroup: (groupId: string) => {
      set((state) => ({
        expandedGroups: new Set(state.expandedGroups).toggleItem(groupId),
      }));
    },

    toggleMSISDN: (msisdnId: string) => {
      set((state) => ({
        expandedMSISDNs: new Set(state.expandedMSISDNs).toggleItem(msisdnId),
      }));
    },

    toggleGroupCheck: (groupId: string, isChecked: boolean) => {
      set((state) => {
        const newCheckedGroups = new Set(state.checkedGroups);
        const newCheckedMSISDNs = new Set(state.checkedMSISDNs);
        const group = state.groupAccounts.find((g) => g.id === groupId);

        if (isChecked) {
          newCheckedGroups.add(groupId);
          group?.msisdns.forEach((msisdn) => newCheckedMSISDNs.add(msisdn.id));
        } else {
          newCheckedGroups.delete(groupId);
          group?.msisdns.forEach((msisdn) =>
            newCheckedMSISDNs.delete(msisdn.id)
          );
        }

        return {
          checkedGroups: newCheckedGroups,
          checkedMSISDNs: newCheckedMSISDNs,
        };
      });
    },

    toggleMSISDNCheck: (msisdnId: string, isChecked: boolean) => {
      set((state) => {
        const newCheckedMSISDNs = new Set(state.checkedMSISDNs);
        const newCheckedGroups = new Set(state.checkedGroups);

        isChecked
          ? newCheckedMSISDNs.add(msisdnId)
          : newCheckedMSISDNs.delete(msisdnId);

        state.groupAccounts.forEach((group) => {
          const allChecked = group.msisdns.every((m) =>
            newCheckedMSISDNs.has(m.id)
          );
          allChecked
            ? newCheckedGroups.add(group.id)
            : newCheckedGroups.delete(group.id);
        });

        return {
          checkedMSISDNs: newCheckedMSISDNs,
          checkedGroups: newCheckedGroups,
        };
      });
    },
  }))
);

export const useDepartmentStore = create<{
  departments: Department[];
  isLoading: boolean;
  error: string | null;
  fetchDepartments: () => Promise<void>;
}>()(
  devtools((set) => ({
    departments: [],
    isLoading: false,
    error: null,

    fetchDepartments: async () => {
      set({ isLoading: true, error: null });
      try {
        const departments = await fetchEmployeeData();
        set({ departments, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
  }))
);

export const useLibraryStore = create<{
  libraries: Library[];
  isLoading: boolean;
  error: string | null;
  fetchLibraries: () => Promise<void>;
}>()(
  devtools((set) => ({
    libraries: [],
    isLoading: false,
    error: null,

    fetchLibraries: async () => {
      set({ isLoading: true, error: null });
      try {
        const libraries = await fetchLibraryData();
        set({ libraries, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
  }))
);

export const useITDepartmentStore = create<{
  itDepartments: ITDepartment[];
  isLoading: boolean;
  error: string | null;
  fetchITDepartments: () => Promise<void>;
}>()(
  devtools((set) => ({
    itDepartments: [],
    isLoading: false,
    error: null,

    fetchITDepartments: async () => {
      set({ isLoading: true, error: null });
      try {
        const itDepartments = await fetchITAssetData();
        set({ itDepartments, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
  }))
);

// Utility extension for Set
declare global {
  interface Set<T> {
    toggleItem(item: T): Set<T>;
  }
}

Set.prototype.toggleItem = function <T>(item: T): Set<T> {
  if (this.has(item)) {
    this.delete(item);
  } else {
    this.add(item);
  }
  return this;
};
