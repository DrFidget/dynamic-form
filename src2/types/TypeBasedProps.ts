export interface TValidation {
  type: string; //"w" | "e" | "s" | "c";
  rule: string;
  msg: string;
  color: string;
}

export interface TNumber {
  numberDecimal?: boolean;
  numberMin?: number;
  numberMax?: number;
  // EnableValidation?:boolean;
  validation?: { rules: TValidation[] };
}

// interface TOptions {
//   id: string;
//   text: string;
// }

export interface TList {
  options: string[];
  data?: string[];
}

export interface TRequired {
  id?: string;
  fieldName?: string;
  fieldType?: string;
}
