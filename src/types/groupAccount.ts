export interface MSISDN {
  id: string;
  planName: string;
  speed: string;
  mobility: string;
  broadbandIdentifier: string;
  address: string;
}

export interface GroupAccount {
  id: string;
  name: string;
  msisdns: MSISDN[];
}

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

export interface SplitViewTableProps<TGroup, TRow> {
  // Data props
  groupData: TGroup[];
  getGroupId: (group: TGroup) => string | number;
  getGroupTitle: (group: TGroup) => string;
  getGroupSubtitle?: (group: TGroup) => string;
  getRowsFromGroup: (group: TGroup) => TRow[];

  // Column configurations
  rowColumns: Column<TRow>[];

  // Custom rendering
  renderGroupCard?: (group: TGroup, isSelected: boolean) => React.ReactNode;
  renderExpandedRowDetails?: (row: TRow) => React.ReactNode;

  // Titles
  groupSectionTitle?: string;
  rowSectionTitle?: string;
  emptyGroupSelectionMessage?: string;
}

export interface Department {
  id: string;
  name: string;
  location: string;
  budget: number;
  employees: Employee[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  salary: number;
  joinDate: string;
  performance: "Excellent" | "Good" | "Average" | "Needs Improvement";
}

// Types for Library Catalog
export interface Library {
  id: string;
  name: string;
  location: string;
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishYear: number;
  available: boolean;
  rating: number;
}

// Types for IT Asset Management
export interface ITDepartment {
  id: string;
  name: string;
  location: string;
  assets: ITAsset[];
}

export interface ITAsset {
  id: string;
  type: "Laptop" | "Desktop" | "Tablet" | "Phone" | "Monitor";
  manufacturer: string;
  model: string;
  purchaseDate: string;
  warrantyEnd: string;
  status: "Active" | "Maintenance" | "Retired";
  assignedTo: string;
}
