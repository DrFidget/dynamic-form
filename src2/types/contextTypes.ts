import { TFields } from "./FormObject";

export interface TSingleField {
  field?: TFields | undefined;
  setField?: (field: TFields | undefined) => void;
}
