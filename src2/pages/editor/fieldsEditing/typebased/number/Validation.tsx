import React, { useState } from "react";
import { inputsInterface } from "../../../../../compoenents/inputsInterface";
import Button from "../../../../../compoenents/Button";
import { TValidation } from "../../../../../types/TypeBasedProps";
import swal from "sweetalert";
interface ValidationInput {
  type: string;
  label: string;
  options?: string[];
  values?: string[];
}

const ValidationInputs: { [key: string]: ValidationInput } = {
  type: {
    type: "radio",
    label: "Validation type",
    options: ["warning", "error", "start", "close"],
    values: ["w", "e", "s", "c"],
  },
  rule: { type: "text", label: "Rule" },
  msg: { type: "text", label: "Message" },
  color: { type: "text", label: "Color" },
};

interface Props {
  handleApplyRule: (object: TValidation) => void;
  EditModeState?: TValidation;
  ButtonText?: string;
}

const ValidationNumber = ({
  handleApplyRule,
  EditModeState,
  ButtonText,
}: Props) => {
  const [validation, setValidation] = useState(() => {
    if (EditModeState) {
      return EditModeState;
    }
    return {
      type: "",
      rule: "",
      msg: "",
      color: "",
    };
  });

  const handleChange = (val: any, key: string) => {
    let x = { ...validation };
    x[key] = val;
    setValidation(x);
  };
  const handleRuleAddition = () => {
    let x = Object.values(validation);
    if (x.includes("")) {
      swal("Validation Properties should not be empty");
      return;
    }
    handleApplyRule(validation);
  };
  return (
    <>
      {Object.entries(ValidationInputs).map(([key, value]) => {
        switch (value.type) {
          case "radio":
            return (
              <inputsInterface.radiolist
                key={key}
                onChange={(val: any) => {
                  handleChange(val, key);
                }}
                label={value.label}
                selectedValue={validation[key]}
                values={value.values || []}
                options={value.options || []}
              />
            );
          case "text":
            return (
              <inputsInterface.text
                key={key}
                label={value.label}
                value={validation[key]}
                onChange={(val: any) => {
                  handleChange(val, key);
                }}
              />
            );
        }
      })}

      <Button
        color="#007BFF"
        onClick={() => {
          handleRuleAddition();
        }}
        text={ButtonText || "Add Rule"}
      />
    </>
  );
};

export default ValidationNumber;
