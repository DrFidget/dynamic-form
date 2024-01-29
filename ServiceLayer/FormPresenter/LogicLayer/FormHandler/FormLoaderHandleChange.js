import { handleBinding } from "./FormLoaderHandleBinding";
import { getObjFromId } from "./FormLoaderUtils";

function replaceVariables(inputString, dict) {
  const variablePattern = /\${(\w+)}/g;

  const replacedString = inputString.replace(
    variablePattern,
    (match, variableName) => {
      if (dict.hasOwnProperty(variableName)) {
        return dict[variableName];
      } else {
        return match;
      }
    }
  );

  return replacedString;
}

const ValidateEachProperty = (rule, dict) => {
  let ModifiedRule = replaceVariables(rule, dict);
  return eval(ModifiedRule);
};

const HandleValidation = (ChangedObject, Dictionary) => {
  if (!ChangedObject.optionalProperties) return;

  const { optionalProperties } = ChangedObject;
  const { rules: RuleList } = optionalProperties.validation;

  let isValid = true;
  let message = "";
  let color = "";
  let type = "";

  for (let Singlerule of RuleList) {
    if (!ValidateEachProperty(Singlerule.rule, Dictionary)) {
      isValid = Singlerule.type === "e" ? false : true;
      message = Singlerule.msg;
      color = Singlerule.color;
      type = Singlerule.type;
      break;
    }
  }

  if (
    typeof isValid === "boolean" &&
    typeof message === "string" &&
    typeof color === "string" &&
    typeof type === "string"
  )
    ChangedObject.optionalProperties.validation = {
      ...ChangedObject.optionalProperties.validation,
      isValid,
      message,
      color,
      type,
    };
};

const IsReadyToSubmit = (formSchema) => {
  let result = formSchema.find(
    (element) =>
      element.optionalProperties &&
      element.optionalProperties.validation &&
      element.optionalProperties.validation.isValid === false
  );

  return !result;
};

const ChangeField = (value, id, dict, formSchema) => {
  let ChangedObject = getObjFromId(id, formSchema);
  ChangedObject.dataValues.value = value;
  let Dictionary = dict;
  Dictionary[id] = value;
  if (
    ChangedObject.optionalProperties &&
    ChangedObject.optionalProperties.validation
  )
    HandleValidation(ChangedObject, Dictionary); // ERROR : mutation in formSchema
  const updatedFields2 = [...formSchema];
  let foundIndex = formSchema.findIndex((ele) => ele.dataValues.id === id);
  if (foundIndex === -1) updatedFields2[foundIndex] = ChangedObject;
  return updatedFields2;
};

export const HandleChangeState = (value, id, dict, formSchema) => {
  // i will send each method schema and the field changed
  // i expect from each method to send me the updated fields they have changed.

  let updatedFields = ChangeField(value, id, dict, formSchema);
  let isReadyToSubmit = IsReadyToSubmit(formSchema);
  updatedFields = handleBinding(id, [...updatedFields]);

  // Change field should give us single field.
  // single field will be passed to binding method.
  // binding method should give us affected updated fields.

  // destructure and update all fields in schema for react render
  // check for validation is ready to submit

  return { updatedFields, isReadyToSubmit };
};
