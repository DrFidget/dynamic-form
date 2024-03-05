import { useState } from "react";
import RadioInput from "../../../../../compoenents/RadioInput";
import TextInput from "../../../../../compoenents/TextInput";
import Button from "../../../../../compoenents/Button";

// interface TSelectOptions{
//     selected:
// }

const options = ["target", "targetGroup", "targetArray"];
const data = ["Target ID", "Group ID", "Array of IDs"];

interface Props {
  TFValues: {
    target?: string;
    targetGroup?: string;
    targetArray?: string[];
  };
  onChange: (val: string | string[], id: string) => void;
  RemoveOption: (index: number) => void;
}

const TargetFields = ({ TFValues, onChange, RemoveOption }: Props) => {
  const [selectedTarget, setSelectedTarget] = useState<
    "target" | "targetGroup" | "targetArray"
  >();

  const [textInput, setTextInput] = useState("");

  return (
    <>
      {" "}
      <RadioInput
        options={data}
        values={options}
        selectedValue={selectedTarget}
        label="What type of target would you like to select?"
        onChange={(s) => {
          console.log(s);
          setSelectedTarget(s as "target" | "targetGroup" | "targetArray");
        }}
      />{" "}
      {selectedTarget &&
        (selectedTarget === "target" || selectedTarget === "targetGroup") && (
          <TextInput
            value={TFValues[selectedTarget]}
            onChange={(s) => {
              onChange(s, selectedTarget);
            }}
            label="Enter ID"
          />
        )}
      {selectedTarget && selectedTarget === "targetArray" && (
        <>
          <TextInput
            value={textInput}
            onChange={(s) => {
              setTextInput(s);
            }}
            label="Enter IDs"
            onKeyDown={() => {
              let x = TFValues[selectedTarget] || [];

              if (x.includes(textInput)) {
                alert("Id alreay added...");
                return;
              }

              x.push(textInput);

              setTextInput("");
              onChange(x, selectedTarget);
            }}
          />

          <ol>
            {TFValues["targetArray"] &&
              TFValues["targetArray"].length > 0 &&
              TFValues["targetArray"].map((option, index) => (
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
        </>
      )}
    </>
  );
};

export default TargetFields;
