import React, { useEffect, useState } from "react";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import { TNumber, TRequired } from "../../../types/TypeBasedProps";
import RequiredInputs from "./required/RequiredInputs";
import OptionalProperties from "./optionalProperties/OptionalProperties";
const FieldMaker = () => {
  const [singleField, setSingleField] = useState<TFields>({
    id: "",
    fieldName: "",
    fieldType: "",
  });
  const [inputMode, setinputMode] = useState({
    required: true,
    typeBased: false,
    optional: false,
  });

  const ChangeMode = {
    required: () => {
      let x = {
        required: true,
        typeBased: false,
        optional: false,
      };
      setinputMode(x);
    },
    typeBased: () => {
      let x = {
        required: false,
        typeBased: true,
        optional: false,
      };
      setinputMode(x);
    },
    optional: () => {
      let x = {
        required: false,
        typeBased: false,
        optional: true,
      };
      setinputMode(x);
    },
  };
  const Actions = {
    requiredFields: {
      Next: (object: TRequired) => {
        let xx = { ...singleField };
        object.id ? (xx.id = object.id) : null;
        object.fieldName ? (xx.fieldName = object.fieldName) : null;
        object.fieldType ? (xx.fieldType = object.fieldType) : null;
        setSingleField(xx);
        ChangeMode.typeBased();
      },
    },
    typeBased: {
      Number: {
        HandlePropsApply: (object: TNumber) => {
          let x = { ...singleField };
          object.numberMin ? (x.numberMin = object.numberMin) : null;
          object.numberMax ? (x.numberMax = object.numberMax) : null;
          object.numberDecimal
            ? (x.numberDecimal = object.numberDecimal)
            : null;
          object.validation ? (x.validation = object.validation) : null;
          setSingleField(x);
          ChangeMode.optional();
        },
        SkipHandle: () => {},
      },
    },
  };

  return (
    <div>
      {inputMode.required && (
        <RequiredInputs onNext={Actions.requiredFields.Next} />
      )}

      {inputMode.typeBased &&
        (() => {
          switch (singleField.fieldType) {
            case "number":
              return (
                <MapTypeToCompoenet.number
                  onApplyProperties={Actions.typeBased.Number.HandlePropsApply}
                  onSkipProperties={Actions.typeBased.Number.SkipHandle}
                />
              );

            default:
              return null;
          }
        })()}

      {inputMode.optional && <OptionalProperties />}
    </div>
  );
};

export default FieldMaker;

// const abc = {
//   numberDecimal: true,
//   numberMin: 4,
//   numberMax: 10,
//   validation: {
//     rules: [{ type: "w", rule: "abc", msg: "abc", color: "red" }],
//   },
// };
// const req = {
//   id: "req",
//   fieldName: "abc",
//   fieldType: "number",
// };
