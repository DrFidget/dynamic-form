import React, { useState } from "react";
import TextInput from "../../../../../compoenents/TextInput";

interface Props {
  options: string[];
  data: string[];
  onChange: (e: string, i: number) => void;
}

const DataInput = ({ options, data, onChange }: Props) => {
  //   const [data, setData] = useState<string[]>(() => {
  //     return new Array(options.length).fill("");
  //   });

  return (
    <div style={{ padding: "20px" }}>
      {options.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Options</th>
              <th>Values to Map</th>
            </tr>
          </thead>
          <tbody>
            {options.map((e, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{e}</td>
                <td>
                  <TextInput
                    styles={{ margin: "0" }}
                    value={data[k]}
                    onChange={(e: string) => {
                      onChange(e, k);
                    }}
                    placeHolder="enter"
                    // label="Enter value..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataInput;
