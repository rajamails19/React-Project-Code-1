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
  { field: "name", headerName: "Raja" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Developer" },
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
        /**
         * Ensure the field exists and is not undefined or null.
         * This check prevents errors when accessing `item.field` in later conditions.
         * If `field` is missing or undefined, the item will be filtered out.
         */
        item.field &&
        /**
         * Check if the field is NOT in the `fieldsToExclude` list.
         * Example: If `fieldsToExclude = ["email"]`, then any item with field `"email"`
         * will be filtered out and NOT included in `detailDefs`.
         * This is useful when we don’t want certain fields to be displayed in the final table.
         */
        !fieldsToExclude.includes(item.field) &&
        /**
         * Ensure that only the editable fields (from `addEditFields`) are included.
         * - If `addEditFields` is NOT empty (contains ["name", "role"]), only items
         *   where `item.field` matches `"name"` or `"role"` will be included.
         * - If `addEditFields` is empty or undefined, all fields will be considered.
         * This ensures that we only keep fields that are meant to be editable.
         */
        (!addEditFields || addEditFields.includes(item.field)) &&
        /**
         * Ensure the `field` value is not an empty string `""`.
         * This prevents adding any rows where the `field` key is blank,
         * which could lead to unexpected UI issues.
         */
        item.field !== ""
    )
    .map((item) => ({
      /**
       * Transform the filtered items into a simpler format.
       * - `label`: Stores the user-friendly column name (headerName).
       * - `id`: Stores the field name to be used as an identifier.
       * This structure makes it easier to render data in the table.
       */
      label: item.headerName, // Assign the display name of the column
      id: item.field, // Assign the field name as the unique identifier
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
