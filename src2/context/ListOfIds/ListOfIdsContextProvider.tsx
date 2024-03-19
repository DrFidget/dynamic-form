import React, { useState } from "react";
import ListOfIds from "./ListOfIdsContext";

const ListOfIdsContextProvider = ({ children }: any) => {
  const [list, setList] = useState<string[]>();

  return (
    <ListOfIds.Provider value={{ list, setList }}>
      {children}
    </ListOfIds.Provider>
  );
};

export default ListOfIdsContextProvider;
