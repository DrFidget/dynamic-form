import React, { useEffect, useState } from "react";
import TypeSelector from "./TypeSelector";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import { TNumber } from "../../../types/TypeBasedProps";

const FieldMaker = () => {
  const [singleField, setSingleField] = useState<TFields>({
    id: "",
    fieldName: "",
    fieldType: "",
  });
  const changesHandler = {
    typeBased: {
      number: (object: TNumber) => {
        let x = { ...singleField };
        object.numberMin ? (x.numberMin = object.numberMin) : null;
        object.numberMax ? (x.numberMax = object.numberMax) : null;
        object.numberDecimal ? (x.numberDecimal = object.numberDecimal) : null;
        object.validation ? (x.validation = object.validation) : null;
        setSingleField(x);
      },
      SkipHandle: () => {},
    },
  };

  return (
    <div>
      {singleField.fieldType === "" && (
        <TypeSelector
          onSelect={(value: string) => {
            setSingleField({ ...singleField, fieldType: value });
          }}
        />
      )}

      {/* <div>
        {singleField.fieldType === "number" && (
          <MapTypeToCompoenet.number
            onApplyProperties={changesHandler.typeBased.number}
            onSkipProperties={changesHandler.typeBased.SkipHandle}
          />
        )}
      </div> */}
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
