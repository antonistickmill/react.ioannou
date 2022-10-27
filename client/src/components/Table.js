import { useState } from "react";
import tableDataJSON from "../tableData.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function Table() {
  const [tableData, setTableData] = useState(tableDataJSON.data);
  
  const columns = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Role", accessor: "role" },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone" },
    { label: "Avatar", accessor: "avatar" },
    { label: "Created At", accessor: "createdAt" },
    { label: "Updated At", accessor: "updatedAt" },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
       return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
         numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
       );
      });
      setTableData(sorted);
    }
  };
  
  return (
    <div>
      <table className="table">
      <TableHead columns={columns} handleSorting={handleSorting} />
      <TableBody columns={columns} tableData={tableData} />
      </table>
    </div>
  );
}
