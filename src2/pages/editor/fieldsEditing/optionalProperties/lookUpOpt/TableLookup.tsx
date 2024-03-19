import React, { useEffect, useState } from "react";
import TextInput from "../../../../../compoenents/TextInput";
import Button from "../../../../../compoenents/Button";
import { TLookup } from "../../../../../types/TypeBasedProps";
import { formatFromString } from "./TableLookupLogic";
import swal from "sweetalert";

interface Tlook {
  row?: string;
  col?: string;
}

interface Props {
  LookupProps?: TLookup;
  OnSubmit: (obj: TLookup) => void;
}

const TableLookup = ({ LookupProps, OnSubmit }: Props) => {
  const [lookup, setLookup] = useState<Tlook>(() => {
    if (LookupProps)
      return {
        row: LookupProps.row,
        col: LookupProps.col,
      };
    return {
      row: "",
      col: "",
    };
  });
  const [tableSize, setTableSize] = useState({ rows: 2, cols: 2 });
  const [colId, setColId] = useState("MPH");
  const [tableData, setTableData] = useState<string[][]>([
    [colId, ""],
    ["", ""],
  ]);

  useEffect(() => {
    if (LookupProps) {
      let xString = LookupProps.source as string;
      const formatted = formatFromString(xString) as string[][];
      let row = formatted.length as number;
      let col = formatted[0].length as number;
      setColId(formatted[0][0]);
      setTableSize({
        rows: row,
        cols: col,
      });
      setTableData(formatted);
    }
  }, []);

  const Actions = {
    handleRowChange: (s: string, rowIndex: number, colIndex: number) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex][colIndex] = s;
        return newData;
      });
    },
    handleAddRow: () => {
      setTableSize((prevSize) => ({
        ...prevSize,
        rows: prevSize.rows + 1,
      }));
      setTableData((prevData) => {
        const newData = [...prevData, Array(tableSize.cols).fill("")];
        return newData;
      });
    },
    handleAddCol: () => {
      setTableSize((prevSize) => ({
        ...prevSize,
        cols: prevSize.cols + 1,
      }));
      setTableData((prevData) => {
        const newData = prevData.map((row) => [...row, ""]);
        return newData;
      });
    },
    handleDelRow: () => {
      if (tableSize.rows === 2) return;
      setTableSize((prevSize) => ({
        ...prevSize,
        rows: prevSize.rows - 1,
      }));
      setTableData((prevData) => {
        const newData = [...prevData];
        newData.pop();
        return newData;
      });
    },
    handleDelCol: () => {
      if (tableSize.cols === 2) return;
      setTableSize((prevSize) => ({
        ...prevSize,
        cols: prevSize.cols - 1,
      }));
      setTableData((prevData) => {
        const newData = prevData.map((row) => row.slice(0, -1));
        return newData;
      });
    },
    HandleSubmitButton: () => {
      if (!lookup?.col || !lookup?.row) {
        swal("Fill all the fields!...");
        return;
      }
      tableData.forEach((e) => {
        if (e.includes("")) {
          swal("Fill all the cells of the Table");
          return;
        }
      });
      let xString = Actions.ChangeFormat() as string;
      let submitObj: TLookup = {
        col: lookup.col,
        row: lookup.row,
        IdCol: tableData[0][0],
        source: xString,
      };
      OnSubmit(submitObj);
    },
    ChangeFormat: () => {
      let string: string = `[ \n`;

      for (let i = 1; i < tableSize.cols; i++) {
        let temp = `{`;
        for (let j = 0; j < tableSize.rows; j++) {
          let key = tableData[j][0];
          let value = tableData[j][i];
          temp += `"${key}":"${value}"` + ",\n";
        }
        temp = temp.slice(0, -2);
        temp += `}`;
        string += temp + `,\n`;
      }
      string = string.slice(0, -2);
      string += "\n]";
      // console.log(string);
      return string;
    },
  };

  return (
    <>
      <TextInput
        onChange={(s: string) => setLookup({ ...lookup, row: s })}
        value={lookup?.row || ""}
        label="LookUp ID for Row"
        styles={{ width: "50%" }}
      />
      <TextInput
        onChange={(s: string) => setLookup({ ...lookup, col: s })}
        value={lookup?.col || ""}
        label="LookUp ID for Col"
        styles={{ width: "50%" }}
      />
      <div>
        <h3>Table</h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <table style={{ margin: "0" }}>
            <tbody>
              {Array.from({ length: tableSize.rows }).map((_, rowIndex) => (
                <tr key={rowIndex} style={{ border: "1px solid black" }}>
                  {Array.from({ length: tableSize.cols }, (_j, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ border: "1px solid black", padding: "5px" }}
                    >
                      <TextInput
                        onChange={(s: string) =>
                          Actions.handleRowChange(s, rowIndex, colIndex)
                        }
                        placeHolder="Enter Data..."
                        value={tableData[rowIndex][colIndex] || ""}
                        styles={{ margin: "0" }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Button
              color="#007BFF"
              onClick={Actions.handleAddCol}
              text="Add Col"
              styles={{ height: "100%" }}
            />
            <Button
              color="#E70127"
              onClick={Actions.handleDelCol}
              text="Del Col"
              styles={{ height: "100%" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "2px", marginBlockStart: "5px" }}>
          <Button
            color="#007BFF"
            onClick={Actions.handleAddRow}
            text="Add Row"
          />
          <Button
            color="#E70127"
            onClick={Actions.handleDelRow}
            text="Del Row"
          />
        </div>
      </div>

      <Button
        styles={{ marginBlockStart: "30px" }}
        color="green"
        text="Done"
        onClick={Actions.HandleSubmitButton}
      />
    </>
  );
};

export default TableLookup;
