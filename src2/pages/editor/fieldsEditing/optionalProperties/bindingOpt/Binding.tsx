import { useState } from "react";
import { TBinding, TFun } from "../../../../../types/TypeBasedProps";
import TargetProperties from "./TargetProperties";
import TargetFields from "./TargetFields";
import MathFunctions from "./MathFunctions";

const Binding = () => {
  const [bindingProps, setBindingProps] = useState<TBinding>({});

  const Actions = {
    TargetProperties: {
      onChange: (e: string, id: String) => {
        const FId = id as
          | "property"
          | "targetProperty"
          | "targetPropertyLookup";

        setBindingProps({ ...bindingProps, [FId]: e });

        if (FId == "targetPropertyLookup" && e === "") {
          let x = { ...bindingProps };
          delete x.targetPropertyLookup;
          setBindingProps({ ...x });
        }
      },
    },
    TargetFields: {
      onChange: (val: string | string[], id: string) => {
        if (id === "targetArray") {
          setBindingProps({ ...bindingProps, [id]: val as string[] });
        } else if (id === "target" || id === "targetGroup") {
          setBindingProps({ ...bindingProps, [id]: val as string });
        }
      },
      removeIDFromArray: (index: number) => {
        let x = { ...bindingProps };
        if (x.targetArray) {
          let arr = JSON.parse(JSON.stringify(x.targetArray)) as string[];
          arr.splice(index, 1);
          setBindingProps({ ...bindingProps, targetArray: arr });
        }
      },
    },
    MathFunctions: {
      AddLogical: (value: string) => {
        setBindingProps({ ...bindingProps, logicalFunction: value });
        if (value == "") {
          let x = { ...bindingProps };
          delete x.logicalFunction;
          setBindingProps({ ...x });
        }
      },
      AddMathFunction: (value: string) => {
        setBindingProps({ ...bindingProps, mathFunction: value });
        if (value == "") {
          let x = { ...bindingProps };
          delete x.mathFunction;
          setBindingProps({ ...x });
        }
      },
      AddFunction: ({
        val,
        args = "1",
      }: {
        val: "round" | "";
        args?: string;
      }) => {
        let func: TFun = {
          type: val,
          args: [args],
        };

        setBindingProps({ ...bindingProps, fun: { ...func } });
        if (val == "") {
          let x = { ...bindingProps };
          delete x.fun;
          setBindingProps({ ...x });
        }
      },
    },
  };
  return (
    <>
      <div style={{ display: "flex", gap: "35px" }}>
        <div style={{ width: "50%" }}>
          <TargetProperties
            TPValues={{
              property: bindingProps.property ?? "",
              targetProperty: bindingProps.targetProperty ?? "",
              targetPropertyLookup: bindingProps.targetPropertyLookup ?? "",
            }}
            onChange={Actions.TargetProperties.onChange}
          />
        </div>
        <div style={{ width: "50%" }}>
          <TargetFields
            TFValues={{
              target: bindingProps.target ?? "",
              targetGroup: bindingProps.targetGroup ?? "",
              targetArray: bindingProps.targetArray ?? [],
            }}
            onChange={Actions.TargetFields.onChange}
            RemoveOption={Actions.TargetFields.removeIDFromArray}
          />
        </div>
      </div>
      <div>
        <MathFunctions
          MathFunctionProps={{
            logicalFunction: bindingProps.logicalFunction ?? "",
            mathFunction: bindingProps.mathFunction ?? "",
            fun: bindingProps.fun ?? { args: ["1"], type: "" },
          }}
          AddLogical={Actions.MathFunctions.AddLogical}
          AddMathFunction={Actions.MathFunctions.AddMathFunction}
          AddFunction={Actions.MathFunctions.AddFunction}
        />
      </div>
    </>
  );
};

export default Binding;
