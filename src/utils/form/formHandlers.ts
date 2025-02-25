import { FormSchema } from "../../types/form";
import { FormSchemaProcessor } from "./FormSchemaProcessor";

export const HandleValidation = (
  field: FormSchema,
  formValues: Record<string, any>
): boolean => {
  const error = FormSchemaProcessor.validateField(field, formValues[field.dataValues.id], formValues);
  
  if (error) {
    if (field.optionalProperties) {
      field.optionalProperties.error = error;
    } else {
      field.optionalProperties = { error };
    }
    return false;
  } else if (field.optionalProperties?.error) {
    field.optionalProperties.error = "";
  }
  
  return true;
};

export const HandleChangeState = (
  value: any,
  id: string,
  formValues: Record<string, any>,
  formSchemaState: FormSchema[]
): { updatedFields: FormSchema[]; isReadyToSubmit: boolean } => {
  // Update form values
  formValues[id] = value;

  // Update schema state with new value
  const updatedFields = formSchemaState.map((field) => {
    if (field.dataValues.id === id) {
      return {
        ...field,
        dataValues: {
          ...field.dataValues,
          value: value,
        },
      };
    }
    return field;
  });

  // Validate all fields
  let isReadyToSubmit = true;
  updatedFields.forEach((field) => {
    if (field.optionalProperties?.validation) {
      const isValid = HandleValidation(field, formValues);
      if (!isValid) {
        isReadyToSubmit = false;
      }
    }
  });

  return { updatedFields, isReadyToSubmit };
};