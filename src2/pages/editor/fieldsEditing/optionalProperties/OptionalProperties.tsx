import React, { useState } from "react";
import IDoptional from "./IDoptional";
import { TOptional } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";

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
    </div>
  );
};

export default OptionalProperties;
