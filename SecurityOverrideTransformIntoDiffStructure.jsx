import React, { useState } from "react";

const App = () => {
  const [updatedRows, setUpdatedRows] = useState([]);

  const onSaveFile = async () => {
    console.log("Saving file...");

    let mode = ["add"]; // Change this to ["edit"] to test different conditions
    let selectedRow = [
      {
        secId: 101,
        isinNo: "US123456",
        secName: "Security A",
        positionDate: "2025-02-04",
        extra: "data1",
      },
      {
        secId: 102,
        isinNo: "US654321",
        secName: "Security B",
        positionDate: "2025-02-05",
        extra: "data2",
      },
    ];

    let updatedRow;
    console.log("mode:", mode);

    if (mode[0] === "add") {
      updatedRow = selectedRow.map(
        ({ secId, isinNo, secName, positionDate, ...rest }) => ({
          ...rest,
          securityId: secId,
          secDesc: secName,
          fromDate: positionDate,
          isinNumber: isinNo,
        })
      );
    } else {
      updatedRow = selectedRow.map(
        ({ isinNo, secName, positionDate, ...rest }) => ({
          ...rest,
          secDesc: secName,
          fromDate: positionDate,
          isinNumber: isinNo,
        })
      );
    }

    console.log("Updated Row:", updatedRow);
    setUpdatedRows(updatedRow);

    return Promise.resolve(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Security Override Lookup</h2>
      <button
        onClick={() =>
          onSaveFile().then((result) =>
            console.log("Operation Successful:", result)
          )
        }
      >
        Run onSaveFile()
      </button>

      <h3>Updated Rows:</h3>
      <pre>{JSON.stringify(updatedRows, null, 2)}</pre>
    </div>
  );
};

export default App;
