import React, { useState } from "react";
import IDoptional from "./IDoptional";
import { TOptional } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import LookUp from "./lookUpOpt/LookUp";

const OptionalProperties = () => {
  const [optionalProps, setOptionalProps] = useState<TOptional>({});

  return (
    <div>
      <IDoptional
        onChange={(id, value) => {
          Actions.ID.onChange(id, value, optionalProps, setOptionalProps);
        }}
        optIDs={{
          altId: optionalProps?.altId ?? "",
          groupId: optionalProps?.groupId ?? "",
          tag: optionalProps?.tag ?? "",
        }}
      />
      <LookUp OnSubmit={Actions.LookUp.onsubmit} />
    </div>
  );
};

export default OptionalProperties;
