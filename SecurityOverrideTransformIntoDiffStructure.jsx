import React, { useState } from "react"; // Import React and useState hook for managing component state

const App = () => {
  // State to hold the transformed security row data
  const [updatedRows, setUpdatedRows] = useState([]);

  // Function that processes security data and updates the state
  const onSaveFile = async () => {
    console.log("Saving file..."); // Log to indicate the function execution

    let mode = ["add"]; // Define mode (either "add" or "edit") to control data transformation

    // Sample security data that will be transformed
    let selectedRow = [
      {
        secId: 101,
        isinNo: "US123456",
        secName: "Security A",
        positionDate: "2025-02-04",
        extra: "data1", // Additional property to show how rest parameters work
      },
      {
        secId: 102,
        isinNo: "US654321",
        secName: "Security B",
        positionDate: "2025-02-05",
        extra: "data2",
      },
    ];

    let updatedRow; // Variable to store transformed data

    console.log("mode:", mode); // Log the mode to track which transformation is applied

    // Check if mode is 'add', then apply transformation accordingly
    if (mode[0] === "add") {
      updatedRow = selectedRow.map(
        ({ secId, isinNo, secName, positionDate, ...rest }) => ({
          ...rest, // Spread operator to keep remaining properties
          securityId: secId, // Rename secId to securityId
          secDesc: secName, // Rename secName to secDesc
          fromDate: positionDate, // Rename positionDate to fromDate
          isinNumber: isinNo, // Rename isinNo to isinNumber
        })
      );
    } else {
      // If mode is 'edit', apply a slightly different transformation
      updatedRow = selectedRow.map(
        ({ isinNo, secName, positionDate, ...rest }) => ({
          ...rest,
          secDesc: secName, // Rename secName to secDesc
          fromDate: positionDate, // Rename positionDate to fromDate
          isinNumber: isinNo, // Rename isinNo to isinNumber
        })
      );
    }

    console.log("Updated Row:", updatedRow); // Log the transformed data
    setUpdatedRows(updatedRow); // Update the state with the transformed data

    return Promise.resolve(true); // Return a resolved promise to indicate successful execution
  };

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      {/* Add padding for better UI spacing */}
      <h2>Security Override Lookup</h2> {/* Title of the component */}
      {/* Button to trigger the onSaveFile function */}
      <button
        onClick={() =>
          onSaveFile().then(
            (result) => console.log("Operation Successful:", result) // Log success message when promise resolves
          )
        }
      >
        Run onSaveFile()
      </button>
      <h3>Updated Rows:</h3> {/* Section to display transformed data */}
      <pre>{JSON.stringify(updatedRows, null, 2)}</pre>{" "}
      {/* Pretty print JSON output */}
    </div>
  );
};

export default App; // Export the component for use in a React application
