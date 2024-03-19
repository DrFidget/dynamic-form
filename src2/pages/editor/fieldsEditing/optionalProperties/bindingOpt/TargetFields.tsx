import React, { useState } from "react";
import TextInput from "../../../../../compoenents/TextInput";
import Button from "../../../../../compoenents/Button";
import swal from "sweetalert";

interface TFields {
  target?: string;
  targetGroup?: string;
  targetArray?: string[];
}

interface Props {
  TFValues: TFields;
  onChange: (s: string | string[], id: string) => void;
  RemoveOption: (index: number) => void;
}

const TargetFields = ({ TFValues: state, onChange, RemoveOption }: Props) => {
  const [textInput, setTextInput] = useState("");
  return (
    <div>
      <h3>Targeting Fields</h3>
      <TextInput
        onChange={(s) => onChange(s, "target")}
        label="Target ID"
        value={state.target || ""}
      />
      <TextInput
        onChange={(s) => onChange(s, "targetGroup")}
        label="Group ID"
        value={state.targetGroup || ""}
      />

      <TextInput
        value={textInput}
        onChange={(s) => {
          setTextInput(s);
        }}
        placeHolder="Press Enter..."
        label="Enter IDs"
        onKeyDown={() => {
          if (textInput == "") {
            return;
          }
          let x = state.targetArray || [];

          if (x.includes(textInput)) {
            swal("value already added");
            return;
          }

          x.push(textInput);

          onChange(x as string[], "targetArray");

          setTextInput("");
        }}
      />

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {state.targetArray &&
          state.targetArray.length > 0 &&
          state.targetArray.map((option, index) => (
            <Button
              key={index}
              text={option + " (x)"}
              color="#E70127"
              onClick={() => RemoveOption(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default TargetFields;
