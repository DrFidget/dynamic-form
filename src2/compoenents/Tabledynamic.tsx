import React, { useState } from "react";

const Table: React.FC = () => {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);

  const handleAddRow = () => {
    setRows(rows + 1);
  };

  const handleAddCol = () => {
    setCols(cols + 1);
  };
  const handleDelRow = () => {
    setRows(rows - 1);
  };

  const handleDelCol = () => {
    setCols(cols - 1);
  };

  return (
    <div>
      <table>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex}>
                  Row {rowIndex + 1}, Col {colIndex + 1}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleAddCol}>Add Column</button>
        <button onClick={handleDelCol}>Del Column</button>
      </div>
      <div>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleDelRow}>Del Row</button>
      </div>
    </div>
  );
};

export default Table;
