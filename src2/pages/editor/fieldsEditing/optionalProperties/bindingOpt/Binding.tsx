import { useState } from "react";
import { TBinding, TFun, TMapping } from "../../../../../types/TypeBasedProps";
import TargetProperties from "./TargetProperties";
import TargetFields from "./TargetFields";
import MathFunctions from "./MathFunctions";
import Mapping from "./mapping/Mapping";
import Button from "../../../../../compoenents/Button";
import swal from "sweetalert";
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
    Mapping: {
      onSubmit: (mappingProps: TMapping) => {
        let x = bindingProps.mapping || ([] as TMapping[]);
        x.push(mappingProps);
        setBindingProps({ ...bindingProps, mapping: x });
      },
      DeleteMappingObj: (index: number) => {
        console.log(index);
        let x = { ...bindingProps };
        if (x.mapping && x.mapping.length > 0) {
          x.mapping.splice(index, 1);
          if (x.mapping.length === 0) {
            delete x.mapping;
          }
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
      <hr />
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
      <hr />
      <Mapping
        bindingProps={bindingProps}
        onSubmit={Actions.Mapping.onSubmit}
      />
      {bindingProps.mapping && bindingProps.mapping.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Target</th>
              <th>Format</th>
              <th>Options</th>
              <th>MapTo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bindingProps.mapping.length > 0 &&
              bindingProps.mapping.map((e, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>
                    {e.target ? e.target : ""}
                    {e.targetArray ? e.targetArray : ""}
                    {e.targetGroup ? e.targetGroup : ""}
                  </td>
                  <td></td>
                  <td>{e.options ? e.options : ""}</td>
                  <td>{e.mapTo ? e.mapTo : ""}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      color="red"
                      onClick={() => {
                        Actions.Mapping.DeleteMappingObj(k);
                      }}
                      text="delete"
                    />
                    {/* <Button
                      color="orange"
                      onClick={() => {}}
                      text="edit"
                    />{" "} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Binding;
