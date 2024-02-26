import { TValidation } from "./TypeBasedProps";

export interface TFields {
  id?: string;
  fieldName?: string;
  fieldType?: string;
  numberMin?: number;
  numberMax?: number;
  numberDecimal?: boolean;
  validation?: { rules: TValidation[] };
}

export interface TFormType {
  Name: string;
  Schema: TFields[];
}
