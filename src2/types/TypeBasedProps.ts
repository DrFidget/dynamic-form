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
  validation?: { rules: TValidation[] };
}

export interface TList {
  options: string[];
  data?: string[];
}

export interface TRequired {
  id?: string;
  fieldName?: string;
  fieldType?: string;
}
export interface THtmlProps {
  visible?: boolean;
  enable?: boolean;
  required?: boolean;
}

export interface TSource {
  [key: string]: string;
}
export interface TLookup {
  col?: string;
  row?: string;
  IdCol?: string;
  source?: string; //"[{}.{}]"
}

export interface TOptional {
  altId?: string;
  groupId?: string;
  tag?: string;
  default?: string; // ---
  binding?: any;
  lookUp?: TLookup;
}

export interface TBinding {
  property?: "value"; //"enable" | "visible" | "value";
  targetProperty?: "enable" | "visible" | "value";
  targetPropertyLookup?: "table"; // only for list | radio List
  target?: string;
  targetGroup?: string;
  targetArray?: string[];
  logicalFunction?: string;
  mathFunction?: string;
  fun?: TFun;
  mapping?: TMapping[];
}

export interface TFun {
  type?: "round" | "";
  args: string[];
}

export interface TMapping {
  target?: string;
  targetGroup?: string;
  targetArray?: string[];

  formatFunction?: string; //conditional if binding.targetProperty==value

  options?: string[];
  mapTo?: string;

  // mapToValue?: string;
  // otherTargetProperty?: "enable" | "visible" | "value";
}
