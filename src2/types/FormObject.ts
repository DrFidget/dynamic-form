import { TValidation } from "./TypeBasedProps";

export interface TFields {
  id?: string;
  fieldName?: string;
  fieldType?: string;
  numberMin?: number;
  numberMax?: number;
  numberDecimal?: boolean;
  validation?: { rules: TValidation[] };
  options?: string[] | TFields[];
  data?: string[];
  visible?: boolean;
  enable?: boolean;
  required?: boolean;
}

export interface TFormType {
  Name: string;
  Schema: TFields[];
}
