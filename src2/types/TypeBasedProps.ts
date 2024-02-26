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

interface List {
  options: string[] | number[];
  data: string[] | number[];
}

export interface IbaseProp {
  number: TNumber;
  list: List;
  radioList: List;
}
