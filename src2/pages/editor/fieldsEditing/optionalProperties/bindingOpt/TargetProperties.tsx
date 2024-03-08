import { useContext } from "react";
import DropdownInput from "../../../../../compoenents/DropdownList";
import { TSingleField } from "../../../../../types/contextTypes";
import SingleFieldContext from "../../../../../context/singleField/SingleFieldContext";

const fields = [
  { id: "property", label: "Property to bind *", options: ["value"] },
  {
    id: "targetProperty",
    label: "Property of Targeted Field *",
    options: ["value", "enable", "visible"],
  },
  { id: "targetPropertyLookup", label: "Lookup Property", options: ["table"] },
];
interface Props {
  TPValues: {
    property: string;
    targetProperty: string;
    targetPropertyLookup?: string;
  };
  onChange: (val: string, fieldId: string) => void;
}
const TargetProperties = ({ TPValues, onChange }: Props) => {
  const { field } = useContext<TSingleField>(SingleFieldContext);
  return (
    <>
      <h3>Targeting Property</h3>
      {fields.map((e, k) => {
        if (e.id == "targetPropertyLookup") {
          if (field?.fieldType != "list" && field?.fieldType != "radioList")
            return null;
        }
        return (
          <DropdownInput
            key={k}
            selectedValue={
              TPValues[
                e.id as "property" | "targetProperty" | "targetPropertyLookup"
              ]
            }
            onChange={(val) => {
              onChange(val, e.id);
            }}
            values={e.options}
            options={e.options}
            label={e.label}
          />
        );
      })}
    </>
  );
};

export default TargetProperties;
