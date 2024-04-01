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
  altId?: string;
  groupId?: string;
  tag?: string;
  default?: string; // ---
  binding?: TBinding;
  lookup?: TLookup;
}
interface TValidation {
  type: string; //"w" | "e" | "s" | "c";
  rule: string;
  msg: string;
  color: string;
}

interface TSource {
  [key: string]: string;
}
interface TLookup {
  col?: string;
  row?: string;
  IdCol?: string;
  source?: string | TSource;
}

interface TBinding {
  property?: "value" | "";
  targetProperty?: "enable" | "visible" | "value" | "";
  targetPropertyLookup?: "table" | "";
  target?: string;
  targetGroup?: string;
  targetArray?: string[];
  logicalFunction?: string;
  mathFunction?: string;
  fun?: TFun;
  mapping?: TMapping[];
}

interface TFun {
  type?: "round" | "";
  args: string[];
}

interface TMapping {
  target?: string;
  targetGroup?: string;
  targetArray?: string[];

  formatFunction?: string;

  options?: string[];
  mapTo?: string;
}
