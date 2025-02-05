import React from "react"; // Import React for building the component

// Define the structure of each column in the grid
interface NexusGridColumn {
  field: string; // Unique identifier for the column
  headerName: string; // Display name for the column
}

// Define the structure of processed data used in UI
interface IDetailDefs {
  label: string; // The header name of the column
  id: string; // The field name (used as an identifier)
}

// Sample column definitions representing a mock dataset
const columnDefs: NexusGridColumn[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
];

// List of fields to exclude from the final processed output
const fieldsToExclude = ["email"];

// List of fields that should be considered editable
const addEditFields = ["name", "role"];

const App: React.FC = () => {
  // Process and filter columns based on exclusions and editable fields
  const detailDefs: IDetailDefs[] = columnDefs
    .filter(
      (item) =>
        item.field && // Ensure the field is defined
        !fieldsToExclude.includes(item.field) && // Exclude fields in `fieldsToExclude`
        (!addEditFields || addEditFields.includes(item.field)) && // Include only editable fields
        item.field !== "" // Ensure field is not an empty string
    )
    .map((item) => ({
      label: item.headerName, // Assign header name to label
      id: item.field, // Assign field name to id
    }));

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Filtered Grid Data</h2>

      {/* Table to display processed column data */}
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
              <td>{col.id}</td> {/* Display column field name */}
              <td>{col.label}</td> {/* Display column header label */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App; // Export the component for use in a React application
