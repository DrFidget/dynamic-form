import { FormSchema } from "../../types/form";

class FormSchemaProcessor {
  static generateFormFields(schema: any[]): FormSchema[] {
    return schema.map((field) => {
      // Ensure required properties exist
      const baseField: FormSchema = {
        dataValues: {
          id: field.id || `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          fieldName: field.fieldName || "Untitled Field",
          fieldType: field.fieldType || "text",
          value: field.value || "",
          required: field.required || false,
          ...field,
        },
        optionalProperties: {
          validation: this.processValidation(field),
          visibility: field.visibility,
          error: "",
          helperText: field.helperText,
          ...field.optionalProperties,
        },
      };

      // Process specific field types
      switch (field.fieldType) {
        case "select":
        case "radio":
        case "checkbox":
          baseField.dataValues.options = field.options || [];
          break;
        
        case "number":
          baseField.dataValues.min = field.min;
          baseField.dataValues.max = field.max;
          baseField.dataValues.step = field.step || 1;
          break;
        
        case "textarea":
          baseField.dataValues.rows = field.rows || 4;
          baseField.dataValues.maxLength = field.maxLength;
          break;
      }

      return baseField;
    });
  }

  private static processValidation(field: any) {
    if (!field.validation) return undefined;

    const validation: any = {};

    if (typeof field.validation === "function") {
      return (value: any, formValues: Record<string, any>) => field.validation(value, formValues);
    }

    // Process validation rules
    if (field.validation.required) {
      validation.required = true;
    }

    switch (field.fieldType) {
      case "text":
      case "textarea":
        if (field.validation.minLength) {
          validation.minLength = field.validation.minLength;
        }
        if (field.validation.maxLength) {
          validation.maxLength = field.validation.maxLength;
        }
        if (field.validation.pattern) {
          validation.pattern = new RegExp(field.validation.pattern);
        }
        break;

      case "number":
        if (field.validation.min !== undefined) {
          validation.min = field.validation.min;
        }
        if (field.validation.max !== undefined) {
          validation.max = field.validation.max;
        }
        break;

      case "checkbox":
        if (field.validation.minSelected) {
          validation.minSelected = field.validation.minSelected;
        }
        if (field.validation.maxSelected) {
          validation.maxSelected = field.validation.maxSelected;
        }
        break;
    }

    if (field.validation.custom) {
      validation.custom = field.validation.custom;
    }

    return Object.keys(validation).length > 0 ? validation : undefined;
  }

  static validateField(field: FormSchema, value: any, formValues: Record<string, any>): string | null {
    const validation = field.optionalProperties?.validation;
    if (!validation) return null;

    if (typeof validation === "function") {
      return validation(value, formValues) ? null : "Invalid value";
    }

    if (validation.required && !value) {
      return "This field is required";
    }

    switch (field.dataValues.fieldType) {
      case "text":
      case "textarea":
        if (validation.minLength && value.length < validation.minLength) {
          return `Minimum length is ${validation.minLength} characters`;
        }
        if (validation.maxLength && value.length > validation.maxLength) {
          return `Maximum length is ${validation.maxLength} characters`;
        }
        if (validation.pattern && !validation.pattern.test(value)) {
          return "Invalid format";
        }
        break;

      case "number":
        if (validation.min !== undefined && value < validation.min) {
          return `Minimum value is ${validation.min}`;
        }
        if (validation.max !== undefined && value > validation.max) {
          return `Maximum value is ${validation.max}`;
        }
        break;

      case "checkbox":
        if (Array.isArray(value)) {
          if (validation.minSelected && value.length < validation.minSelected) {
            return `Please select at least ${validation.minSelected} options`;
          }
          if (validation.maxSelected && value.length > validation.maxSelected) {
            return `Please select no more than ${validation.maxSelected} options`;
          }
        }
        break;
    }

    if (validation.custom && typeof validation.custom === "function") {
      const customResult = validation.custom(value);
      if (!customResult) {
        return "Invalid value";
      }
    }

    return null;
  }
}

export { FormSchemaProcessor };