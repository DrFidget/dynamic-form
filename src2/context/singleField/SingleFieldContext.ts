import { createContext } from "react";
import { TSingleField } from "../../types/contextTypes";

const SingleFieldContext = createContext<TSingleField>({});
export default SingleFieldContext;
