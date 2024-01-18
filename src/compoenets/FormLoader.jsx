import React, { useEffect, useState } from "react";
import { Field } from "./newForm/class/Field";
import FormBody from "./FormBody";
import { FormSchemaProcessor } from "../../ServiceLayer/FormPresenter/FormSchema/FormSchemaProcessor";
const FormLoader = ({ FormSchema, submitAction, FormState }) => {
  const [formSchemaState, setFormSchemaState] = useState(() => {
    if (FormSchema) return FormSchemaProcessor.generateFormFields(FormSchema);
    return FormState;
  });

  const HandleChange = (value, id) => {
    setFormSchemaState((prev) => {
      const updatedFields = prev.map((element) => {
        if (element.dataValues.id === id) {
          return {
            ...element,
            dataValues: {
              ...element.dataValues,
              value: value,
            },
          };
        } else {
          return element;
        }
      });
      return updatedFields;
    });
  };
  return (
    <>
      <FormBody formSchemaState={formSchemaState} HandleChange={HandleChange} />
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
