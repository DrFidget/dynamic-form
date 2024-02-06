import React, { useState } from "react";
import { StateContext } from "./Context";

export const StateProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState([]);

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};
