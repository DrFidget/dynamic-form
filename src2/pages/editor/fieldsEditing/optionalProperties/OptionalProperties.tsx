import React, { useState } from "react";
import IDoptional from "./IDoptional";
import { TLookup, TOptional } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";
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
      <LookUp
        OnSubmit={(obj: TLookup) =>
          Actions.LookUp.onsubmit(obj, optionalProps, setOptionalProps)
        }
        onReset={() => {
          Actions.LookUp.resetLookup(optionalProps, setOptionalProps);
        }}
      />
    </div>
  );
};

export default OptionalProperties;
