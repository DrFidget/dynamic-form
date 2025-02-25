import { FormSchema } from "../../types/form";

export const HandleGroupVisibility = (formSchema: FormSchema[]): void => {
  formSchema.forEach((field) => {
    if (!field.optionalProperties?.visibility) return;

    const { depends, condition } = field.optionalProperties.visibility;
    
    if (!depends || !condition) {
      field.optionalProperties.isVisible = true;
      return;
    }

    const dependentField = formSchema.find(
      (f) => f.dataValues.id === depends
    );

    if (!dependentField) {
      field.optionalProperties.isVisible = true;
      return;
    }

    const dependentValue = dependentField.dataValues.value;
    field.optionalProperties.isVisible = condition(dependentValue);
  });
};