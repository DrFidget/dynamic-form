import { createContext } from "react";
import { TListOfIds } from "../../types/contextTypes";

const ListOfIds = createContext<TListOfIds | undefined>(undefined);
export default ListOfIds;
