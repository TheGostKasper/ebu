export interface ColumnConfig<TRow> {
  label: string | React.ReactNode | (() => React.ReactNode);
  accessor: string | ((row: TRow) => React.ReactNode);
  sortable?: boolean;
  searchable?: boolean;
}

export interface RowSectionProps<TRow> {
  fetchRows: (params: {
    page: number;
    pageSize: number;
    sort: { field: string; type: "asc" | "desc" | "" };
    groupId?: string;
    [key: string]: any;
  }) => Promise<{
    items: TRow[];
    total: number;
  }>;
  columns: ColumnConfig<TRow>[];
  renderRowDetails?: (row: TRow) => React.ReactNode;
  pageSizeOptions?: number[];
  group?: any;
}

export interface GroupSectionProps<TGroup> {
  fetchGroups: (params: {
    page: number;
    pageSize: number;
    search: string;
  }) => Promise<{
    items: TGroup[];
    total: number;
  }>;
  renderGroup: (group: TGroup) => React.ReactNode;
  onGroupSelect: (group: TGroup | null) => void;
}
