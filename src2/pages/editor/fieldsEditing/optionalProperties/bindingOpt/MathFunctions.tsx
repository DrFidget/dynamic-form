import React, { useState } from "react";
import { TFun } from "../../../../../types/TypeBasedProps";
import CheckBoxInput from "../../../../../compoenents/CheckBoxinput";
import TextInput from "../../../../../compoenents/TextInput";
import DropdownInput from "../../../../../compoenents/DropdownList";
import NumberInput from "../../../../../compoenents/NumberInput";

const Math = {
  logical: {
    options: ["Inverse ( ! )"],
    data: ["!"],
  },
  funct: {
    options: ["Round off"],
    data: ["round"],
  },
};

interface Props {
  MathFunctionProps?: {
    logicalFunction: string;
    mathFunction: string;
    fun: TFun;
  };
  AddLogical: (value: string) => void;
  AddMathFunction: (value: string) => void;
  AddFunction: ({ val, args }: { val: "round" | ""; args?: string }) => void;
}

const MathFunctions = ({
  MathFunctionProps,
  AddLogical,
  AddMathFunction,
  AddFunction,
}: Props) => {
  const [required, setRequired] = useState({
    Logical: false,
    math: false,
    fun: false,
  });
  return (
    <>
      <h3>Math Functions</h3>
      <CheckBoxInput
        onChange={(e) => {
          setRequired({ ...required, Logical: e });
          if (!e) AddLogical("");
        }}
        label="Logical Function"
        value={required.Logical}
      />
      {required.Logical && (
        <DropdownInput
          options={Math.logical.options}
          values={Math.logical.data}
          selectedValue={MathFunctionProps?.logicalFunction || ""}
          label="Select Logical Function"
          onChange={(s) => AddLogical(s)}
        />
      )}

      <CheckBoxInput
        onChange={(e) => setRequired({ ...required, math: e })}
        label="Math Function"
        value={required.math}
      />
      {required.math && (
        <TextInput
          label="Enter Math Function"
          onChange={(e) => AddMathFunction(e)}
          value={MathFunctionProps?.mathFunction}
        />
      )}
      <CheckBoxInput
        onChange={(e) => setRequired({ ...required, fun: e })}
        label="Function"
        value={required.fun}
      />
      {required.fun && (
        <>
          <DropdownInput
            label="Select function type:"
            onChange={(s: string) =>
              AddFunction({
                val: s as "round" | "",
                args: MathFunctionProps?.fun.args[0] || undefined,
              })
            }
            options={Math.funct.options}
            values={Math.funct.data}
            selectedValue={MathFunctionProps?.fun.type || ""}
          />
          <NumberInput
            label="Enter Arguments"
            onChange={(n) => {
              AddFunction({
                val: MathFunctionProps?.fun.type || "",
                args: n.toString(),
              });
            }}
            value={
              MathFunctionProps ? parseInt(MathFunctionProps.fun.args[0]) : 1
            }
            // parseInt(MathFunctionProps?.fun.args[0]) || 1
          />
        </>
      )}
    </>
  );
};

export default MathFunctions;
