import React, { useState } from "react";
import { TRequired } from "../../../../types/TypeBasedProps";
import SelectType from "./SelectType";
import TextInput from "../../../../compoenents/TextInput";
import Button from "../../../../compoenents/Button";
import swal from "sweetalert";
const fieldTypes = [
  { id: "text", name: "Text" },
  { id: "number", name: "Number" },
  { id: "label", name: "Label" },
  { id: "divider", name: "Divider" },
  { id: "checkbox", name: "CheckBox" },
  { id: "list", name: "DropDown List" },
  { id: "radioList", name: "Radio List" },
  { id: "date", name: "Date" },
  { id: "time", name: "Time" },
  { id: "datetime", name: "Date and Time" },
  { id: "table", name: "Table" },
  { id: "image", name: "Image" },
  { id: "scribble", name: "Signature" },
];

interface Props {
  onNext: (object: TRequired) => void;
  RequiredProperties?: TRequired;
}

const RequiredInputs = ({ onNext, RequiredProperties }: Props) => {
  const [reqFields, setReqFields] = useState<TRequired>(() => {
    if (RequiredProperties) return RequiredProperties;
    return {
      id: "",
      fieldName: "",
      fieldType: "",
    };
  });
  const [enabletypeSelector, setEnableTypeSelector] = useState(
    RequiredProperties?.fieldType != "" ? false : true
  );

  const Actions = {
    TypeSelect: {
      AddType: (fieldType: string) => {
        let x = { ...reqFields };
        x.fieldType = fieldType;
        setReqFields(x);
        setEnableTypeSelector(false);
      },
    },
    SelectId: (vlaue: string) => {
      let x = { ...reqFields };
      x.id = vlaue;
      setReqFields(x);
    },
    SelectName: (value: string) => {
      let x = { ...reqFields };
      x.fieldName = value;
      setReqFields(x);
    },
    Buttons: {
      next: () => {
        let x = Object.values(reqFields);
        if (x.includes("")) {
          swal("ID,Name,Type Can not be empty");
          return;
        }
        onNext({ ...reqFields });
      },
      back: () => {
        setEnableTypeSelector(true);
      },
    },
  };

  return (
    <>
      {enabletypeSelector && (
        <SelectType
          fieldTypes={fieldTypes}
          onClick={Actions.TypeSelect.AddType}
        />
      )}
      {!enabletypeSelector && (
        <>
          <TextInput
            value={reqFields.id}
            label="Enter ID"
            onChange={Actions.SelectId}
          />
          <TextInput
            value={reqFields.fieldName}
            label="Enter Field Name"
            onChange={Actions.SelectName}
          />
          <TextInput
            value={reqFields.fieldType}
            htmlprops={{ disabled: true }}
            label="Field Type"
            onChange={Actions.SelectName}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="#E70127"
              text="< Back"
              onClick={Actions.Buttons.back}
              type="button"
            />
            <Button
              color="green"
              text="Next >"
              onClick={Actions.Buttons.next}
              type="button"
            />
          </div>
        </>
      )}
    </>
  );
};
export default RequiredInputs;
