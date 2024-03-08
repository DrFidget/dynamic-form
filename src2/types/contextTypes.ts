import { TFields } from "./FormObject";

export interface TSingleField {
  field?: TFields;
  setField?: (field: TFields) => void;
}
