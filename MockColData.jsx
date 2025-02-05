import React from "react";

// Define column interface
interface NexusGridColumn {
  field: string;
  headerName: string;
}

// Define processed data structure
interface IDetailDefs {
  label: string;
  id: string;
}

// Sample Column Definitions (Mock Data)
const columnDefs: NexusGridColumn[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
];

// Fields to Exclude
const fieldsToExclude = ["email"];

// Editable Fields
const addEditFields = ["name", "role"];

const App: React.FC = () => {
  // Process Columns Based on Filters
  const detailDefs: IDetailDefs[] = columnDefs
    .filter(
      (item) =>
        item.field &&
        !fieldsToExclude.includes(item.field) &&
        (!addEditFields || addEditFields.includes(item.field)) &&
        item.field !== ""
    )
    .map((item) => ({
      label: item.headerName,
      id: item.field,
    }));

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Filtered Grid Data</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {detailDefs.map((col) => (
            <tr key={col.id}>
              <td>{col.id}</td>
              <td>{col.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
