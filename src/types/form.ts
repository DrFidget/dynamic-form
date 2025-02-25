export interface FormValue {
  id: string;
  value: any;
  fieldType: string;
  fieldName: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number; } | string>;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  maxLength?: number;
  [key: string]: any;
}

export interface FormValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  minSelected?: number;
  maxSelected?: number;
  custom?: (value: any) => boolean;
}

export interface FormSchema {
  dataValues: FormValue;
  optionalProperties?: {
    validation?: FormValidation | ((value: any, formValues: Record<string, any>) => boolean);
    visibility?: {
      depends?: string;
      condition?: (value: any) => boolean;
    };
    error?: string;
    helperText?: string;
    isVisible?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface FormFieldProps {
  field: FormSchema;
  onChange: (value: any, id: string) => void;
  defaultMethods?: Record<string, any>;
}

export interface FormBodyProps {
  formSchemaState: FormSchema[];
  HandleChange: (value: any, id: string) => void;
  DefaultMethods?: Record<string, any>;
}