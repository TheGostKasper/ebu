import { useEffect } from "react";
import { useDepartmentStore } from "../../store/group-account-store";
import { Column, Department, Employee } from "../../types/groupAccount";
import { SplitViewTable } from "../Generics/SplitTable";

const departmentColumns: Column<Employee>[] = [
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Role", accessor: "role" },
  { header: "Salary", accessor: (g: Employee) => `$${g.salary}` },
  { header: "Join Date", accessor: "joinDate" },
  { header: "Performance", accessor: "performance" },
];

const DepartmentTable = () => {
  const { departments, fetchDepartments } = useDepartmentStore();
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <SplitViewTable<Department, Employee>
      groupData={departments}
      getGroupId={(group) => group.id}
      getGroupTitle={(group) => group.name}
      getGroupSubtitle={(group) => `Employees: ${group.employees.length}`}
      getRowsFromGroup={(group) => group.employees}
      rowColumns={departmentColumns}
    />
  );
};

export default DepartmentTable;
