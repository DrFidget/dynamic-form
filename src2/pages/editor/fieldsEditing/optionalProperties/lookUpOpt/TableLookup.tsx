import React, { useEffect, useState } from "react";
import TextInput from "../../../../../compoenents/TextInput";
import Button from "../../../../../compoenents/Button";
import { TLookup } from "../../../../../types/TypeBasedProps";
import { formatFromString } from "./TableLookupLogic";

const ROW_IDENTITFIER = "MPH";

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
  const [tableData, setTableData] = useState<string[][]>([
    [ROW_IDENTITFIER, ""],
    ["", ""],
  ]);

  useEffect(() => {
    if (LookupProps) {
      let xString = LookupProps.source as string;
      const formatted = formatFromString(xString) as string[][];
      let row = formatted.length as number;
      let col = formatted[0].length as number;
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
        alert("Fill all the fields!...");
        return;
      }
      tableData.forEach((e) => {
        if (e.includes("")) {
          alert("Fill all the cells of the Table");
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
      let abc: string = `[ \n`;
      for (let row = 1; row < tableSize.rows; row++) {
        let abc1: string = `{`;
        for (let col = 0; col < tableSize.cols; col++) {
          abc1 += `"${tableData[col][0]}": "${tableData[col][row]}"` + ",\n";
        }
        abc1 = abc1.slice(0, -2);
        abc1 += `}`;
        abc += abc1 + ",\n";
      }
      abc = abc.slice(0, -2);
      abc += `\n]`;
      console.log(abc);
      return abc;
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
              color="blue"
              onClick={Actions.handleAddCol}
              text="Add Col"
              styles={{ height: "100%" }}
            />
            <Button
              color="red"
              onClick={Actions.handleDelCol}
              text="Del Col"
              styles={{ height: "100%" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "2px", marginBlockStart: "5px" }}>
          <Button color="blue" onClick={Actions.handleAddRow} text="Add Row" />
          <Button color="red" onClick={Actions.handleDelRow} text="Del Row" />
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
