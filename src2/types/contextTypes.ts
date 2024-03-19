import { TFields } from "./FormObject";

export interface TSingleField {
  field?: TFields | undefined;
  setField?: (field: TFields | undefined) => void;
}

export interface TListOfIds {
  list: string[] | undefined;
  setList: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}
