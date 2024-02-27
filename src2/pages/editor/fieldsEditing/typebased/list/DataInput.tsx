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
    <div>
      {options.length > 0 && (
        <table style={{ border: "1px solid black" }}>
          <thead>
            <th>Options</th>
            <th>Values to Map</th>
          </thead>
          <tbody>
            {options.map((e, k) => (
              <tr key={k}>
                <td>{e}</td>
                <td>
                  <TextInput
                    value={data[k]}
                    onChange={(e: string) => {
                      onChange(e, k);
                    }}
                    placeHolder="enter"
                    label="Enter value..."
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
