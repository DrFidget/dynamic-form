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
      number: (object: TNumber) => {},
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
      {/* {
        singleField.fieldType!=="" &&
      } */}
      <div>
        {singleField.fieldType === "number" && <MapTypeToCompoenet.number />}
      </div>
    </div>
  );
};

export default FieldMaker;
