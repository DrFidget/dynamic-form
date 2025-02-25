import { FC } from "react";
import { FormFieldProps } from "../../../types/form";

// Import all field components
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import RadioInput from "./RadioInput";
import TextAreaInput from "./TextAreaInput";
import NumberInput from "./NumberInput";

interface InputTypeComponents {
  [key: string]: FC<FormFieldProps>;
}

/**
 * Registry of available form field components mapped to their types.
 * Each form field must be registered here to be usable in the form schema.
 */
export const InputTypes: InputTypeComponents = {
  // Basic input types
  text: TextInput,
  select: SelectInput,
  checkbox: CheckboxInput,
  radio: RadioInput,
  textarea: TextAreaInput,
  number: NumberInput,

  // Aliases for convenience
  string: TextInput,
  dropdown: SelectInput,
  multiselect: CheckboxInput,
  integer: NumberInput,
  float: NumberInput,
};
