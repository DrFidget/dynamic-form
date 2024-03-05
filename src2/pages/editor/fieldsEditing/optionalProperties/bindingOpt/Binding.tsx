import { useState } from "react";
import { TBinding } from "../../../../../types/TypeBasedProps";
import TargetProperties from "./TargetProperties";
import TargetFields from "./TargetFields";

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
    },
    removeIDFromArray: (index: number) => {
      let x = { ...bindingProps };
      if (x.targetArray) {
        let arr = JSON.parse(JSON.stringify(x.targetArray)) as string[];
        arr.splice(index, 1);
        setBindingProps({ ...bindingProps, targetArray: arr });
      }
    },
  };
  return (
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
          RemoveOption={Actions.removeIDFromArray}
        />
      </div>
    </div>
  );
};

export default Binding;
