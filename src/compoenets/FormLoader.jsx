import React, { useEffect, useState } from "react";
import FormBody from "./FormBody";
import { FormSchemaProcessor } from "../../ServiceLayer/FormPresenter/FormSchema/FormSchemaProcessor";
const FormLoader = ({
  FormSchema,
  submitAction,
  FormState,
  DefaultMethods,
}) => {
  const [formSchemaState, setFormSchemaState] = useState(() => {
    if (FormSchema) return FormSchemaProcessor.generateFormFields(FormSchema);
    return FormState;
  });

  const [formValues, setFormValues] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    let x = {};
    formSchemaState.forEach((element) => {
      x[element.dataValues.id] = element.dataValues.value;
    });
    setFormValues(x);
  }, [formSchemaState]);

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

  const getObjFromId = (id) => {
    return formSchemaState.find((element) => element.dataValues.id === id);
  };

  const HandleValidation = (ChangedObject, Dictionary) => {
    if (ChangedObject.validationRules) {
      const { validationRules } = ChangedObject;
      const { rules: RuleList } = validationRules.validation;

      let isValid = true;
      let message = "";
      let color = "";

      for (let Singlerule of RuleList) {
        if (!ValidateEachProperty(Singlerule.rule, Dictionary)) {
          isValid = false;
          message = Singlerule.msg;
          color = Singlerule.color;
          break;
        }
      }

      if (
        typeof isValid === "boolean" &&
        typeof message === "string" &&
        typeof color === "string"
      )
        ChangedObject.validationRules.validation = {
          ...ChangedObject.validationRules.validation,
          isValid,
          message,
          color,
        };
    }
  };

  //-----------------------------------------------------------------------------------------
  const HandleChange = (value, id) => {
    let ChangedObject = getObjFromId(id);
    ChangedObject.dataValues.value = value;
    let Dictionary = { ...formValues };
    Dictionary[id] = value;
    HandleValidation(ChangedObject, Dictionary);

    setFormSchemaState((prev) => {
      let prevTemp = [...prev];
      const updatedFields = prevTemp.map((element) => {
        if (element.dataValues.id === id) {
          return ChangedObject;
        } else {
          return element;
        }
      });
      return updatedFields;
    });
  };
  return (
    <>
      <FormBody
        formSchemaState={formSchemaState}
        HandleChange={HandleChange}
        DefaultMethods={DefaultMethods}
      />
      {submitAction && (
        <div
          className="btn btn-primary"
          onClick={(e) =>
            submitAction.onSubmit && submitAction.onSubmit(formSchemaState)
          }
        >
          {submitAction.submitText}
        </div>
      )}
    </>
  );
};

export default FormLoader;
