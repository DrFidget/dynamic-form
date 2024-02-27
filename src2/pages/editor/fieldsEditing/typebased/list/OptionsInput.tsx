import React, { useState } from "react";
import TextInput from "../../../../../compoenents/TextInput";
import Button from "../../../../../compoenents/Button";

interface Props {
  Options: string[];
  AppendOptions: (e: string) => void;
  RemoveOption: (i: number) => void;
}
const OptionsInput = ({ Options, AppendOptions, RemoveOption }: Props) => {
  const [inputstate, setInputState] = useState("");

  return (
    <div>
      <TextInput
        onChange={(s: string) => setInputState(s)}
        value={inputstate}
        label="Enter Options"
        placeHolder="press enter to add..."
        onKeyDown={(s: string) => {
          setInputState("");
          AppendOptions(s);
        }}
      />
      Options:
      <ol>
        {Options.length > 0 &&
          Options.map((option, index) => (
            <li
              key={index}
              style={{
                marginBlockEnd: "5px",
                height: "40px",
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              <p>{option}</p>
              <Button
                text="x"
                color="red"
                onClick={() => {
                  RemoveOption(index);
                }}
              />
            </li>
          ))}
      </ol>
    </div>
  );
};

export default OptionsInput;
