import {
  Department,
  GroupAccount,
  ITDepartment,
  Library,
} from "../types/groupAccount";

let sampleData: GroupAccount[] = [];

const generateSampleData = (numGroups: number): GroupAccount[] => {
  if (sampleData.length > 0) {
    return sampleData;
  }
  for (let i = 1; i <= numGroups; i++) {
    const groupAccount: GroupAccount = {
      id: `24141${1000 + i}`,
      name: `Account for Group ${i}`,
      msisdns: [],
    };

    const numMSISDNs = Math.floor(Math.random() * 20) + 1; // 1 to 5 MSISDNs per group
    for (let j = 1; j <= numMSISDNs; j++) {
      groupAccount.msisdns.push({
        id: `32141${1000 + i * 10 + j}`,
        planName: ["Basic", "Standard", "Premium", "Gold", "Platinum"][
          Math.floor(Math.random() * 5)
        ],
        mobility: ["Mobile", "Fixed", "Hybrid"][Math.floor(Math.random() * 3)],
        speed: `${[10, 25, 50, 100, 200][Math.floor(Math.random() * 5)]} Mbps`,
        broadbandIdentifier: `${1234000 + i * 100 + j}`,
        address: `Address ${i}-${j}`,
      });
    }

    sampleData.push(groupAccount);
  }
  return sampleData;
};
sampleData = generateSampleData(100) || [];

const generateEmployeeData = (numDepartments: number): Department[] => {
  const roles = ["Developer", "Designer", "Manager", "Analyst", "Engineer"];
  const locations = ["New York", "London", "Tokyo", "Singapore", "Sydney"];
  const performances: Array<
    "Excellent" | "Good" | "Average" | "Needs Improvement"
  > = ["Excellent", "Good", "Average", "Needs Improvement"];

  return Array.from({ length: numDepartments }, (_, i) => {
    const numEmployees = Math.floor(Math.random() * 15) + 5;
    return {
      id: `DEPT${1000 + i}`,
      name: `Department ${i + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      budget: Math.floor(Math.random() * 1000000) + 500000,
      employees: Array.from({ length: numEmployees }, (_, j) => ({
        id: `EMP${1000 + i * 100 + j}`,
        firstName: `First${i * 100 + j}`,
        lastName: `Last${i * 100 + j}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        salary: Math.floor(Math.random() * 50000) + 50000,
        joinDate: new Date(
          2020 + Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28)
        )
          .toISOString()
          .split("T")[0],
        performance:
          performances[Math.floor(Math.random() * performances.length)],
      })),
    };
  });
};

const generateLibraryData = (numLibraries: number): Library[] => {
  const genres = ["Fiction", "Non-Fiction", "Science", "History", "Technology"];
  const locations = [
    "Downtown",
    "Uptown",
    "West End",
    "East Side",
    "South Campus",
  ];

  return Array.from({ length: numLibraries }, (_, i) => {
    const numBooks = Math.floor(Math.random() * 30) + 20;
    return {
      id: `LIB${1000 + i}`,
      name: `Library ${i + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      books: Array.from({ length: numBooks }, (_, j) => ({
        id: `BOOK${1000 + i * 100 + j}`,
        title: `Book Title ${i * 100 + j}`,
        author: `Author ${Math.floor(Math.random() * 100)}`,
        genre: genres[Math.floor(Math.random() * genres.length)],
        publishYear: Math.floor(Math.random() * 30) + 1990,
        available: Math.random() > 0.3,
        rating: Math.floor(Math.random() * 5) + 1,
      })),
    };
  });
};

const generateITAssetData = (numDepartments: number): ITDepartment[] => {
  const manufacturers = ["Dell", "HP", "Lenovo", "Apple", "Samsung"];
  const assetTypes: Array<
    "Laptop" | "Desktop" | "Tablet" | "Phone" | "Monitor"
  > = ["Laptop", "Desktop", "Tablet", "Phone", "Monitor"];
  const statuses: Array<"Active" | "Maintenance" | "Retired"> = [
    "Active",
    "Maintenance",
    "Retired",
  ];

  return Array.from({ length: numDepartments }, (_, i) => {
    const numAssets = Math.floor(Math.random() * 20) + 10;
    return {
      id: `DEPT${1000 + i}`,
      name: `Department ${i + 1}`,
      location: `Floor ${Math.floor(Math.random() * 10) + 1}`,
      assets: Array.from({ length: numAssets }, (_, j) => {
        const purchaseDate = new Date(
          2020 + Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28)
        );
        const warrantyYears = Math.floor(Math.random() * 3) + 2;
        const warrantyEnd = new Date(purchaseDate);
        warrantyEnd.setFullYear(warrantyEnd.getFullYear() + warrantyYears);

        return {
          id: `ASSET${1000 + i * 100 + j}`,
          type: assetTypes[Math.floor(Math.random() * assetTypes.length)],
          manufacturer:
            manufacturers[Math.floor(Math.random() * manufacturers.length)],
          model: `Model ${Math.floor(Math.random() * 100)}`,
          purchaseDate: purchaseDate.toISOString().split("T")[0],
          warrantyEnd: warrantyEnd.toISOString().split("T")[0],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          assignedTo: `Employee ${Math.floor(Math.random() * 100)}`,
        };
      }),
    };
  });
};

export const fetchGroupAccounts = async (): Promise<GroupAccount[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 1000);
  });
};

export const fetchAccounts = async ({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search: string;
}): Promise<{ items: GroupAccount[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter based on search term
      const filteredData = search
        ? sampleData.filter((group) =>
            group.name.toLowerCase().includes(search.toLowerCase())
          )
        : sampleData;

      // Paginate the filtered data
      const start = (page - 1) * pageSize;
      const paginatedData = filteredData.slice(start, start + pageSize);

      resolve({
        items: paginatedData,
        total: filteredData.length, // Total count of filtered data
      });
    }, 1000); // Simulate network delay
  });
};

export const getMsisdns = async ({
  page,
  pageSize,
  sort,
  groupId,
}: {
  page: number;
  pageSize: number;
  sort: { field: string; type: "asc" | "desc" | "" };
  groupId?: string;
}): Promise<{ items: GroupAccount["msisdns"]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the group by ID
      const group = sampleData.find((g) => g.id === groupId);

      if (!group) {
        return resolve({ items: [], total: 0 });
      }

      // Sort msisdns if sorting is applied - implement in the future
      const sortedMsisdns = group.msisdns;

      // Paginate msisdns
      const start = (page - 1) * 10; // Default page size for msisdns
      const paginatedMsisdns = sortedMsisdns.slice(start, start + pageSize);

      resolve({
        items: paginatedMsisdns,
        total: sortedMsisdns.length,
      });
    }, 1000); // Simulate network delay
  });
};

export const fetchEmployeeData = async (): Promise<Department[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateEmployeeData(15));
    }, 1000);
  });
};
export const fetchLibraryData = async (): Promise<Library[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateLibraryData(15));
    }, 1000);
  });
};

export const fetchITAssetData = async (): Promise<ITDepartment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateITAssetData(15));
    }, 1000);
  });
};
