import React, { useState } from "react";
import SingleFieldContext from "./SingleFieldContext";
import { TFields } from "../../types/FormObject";

const SingleFieldContextProvider = ({ children }: any) => {
  const [field, setField] = useState<TFields>({});

  return (
    <SingleFieldContext.Provider value={{ field, setField }}>
      {children}
    </SingleFieldContext.Provider>
  );
};

export default SingleFieldContextProvider;
//
