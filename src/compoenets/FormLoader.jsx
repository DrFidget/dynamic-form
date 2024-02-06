// import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import FormBody from "./FormBody";
import { FormSchemaProcessor } from "../../ServiceLayer/FormPresenter/FormSchema/FormSchemaProcessor";
import { HandleChangeState } from "../../ServiceLayer/FormPresenter/LogicLayer/FormHandler/FormLoaderHandleChange";
import { HandleGroupVisibility } from "../../ServiceLayer/FormPresenter/LogicLayer/FormHandler/FormLoaderHandleBinding";
const FormLoader = ({
  FormSchema,
  submitAction,
  FormState,
  DefaultMethods,
}) => {
  const [formSchemaState, setFormSchemaState] = useState(() => {
    let schema_or_state;
    if (FormSchema)
      schema_or_state = FormSchemaProcessor.generateFormFields(FormSchema);
    else schema_or_state = FormState;
    HandleGroupVisibility(schema_or_state);
    return schema_or_state;
  });

  const [formValues, setFormValues] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(
    submitAction.stateOnLoad === true ? true : false
  );

  useEffect(() => {
    let x = {};
    formSchemaState.forEach((element) => {
      x[element.dataValues.id] = element.dataValues.value;
    });
    setFormValues(x);
  }, [formSchemaState]);

  const HandleChange = (value, id) => {
    const { updatedFields, isReadyToSubmit } = HandleChangeState(
      value,
      id,
      { ...formValues },
      [...formSchemaState]
    );

    setFormSchemaState(updatedFields);
    setReadyToSubmit(isReadyToSubmit);
  };
  return (
    <>
      <FormBody
        formSchemaState={formSchemaState}
        HandleChange={HandleChange}
        DefaultMethods={DefaultMethods}
      />
      {submitAction && (
        <button
          className="btn btn-primary"
          disabled={!readyToSubmit}
          onClick={(e) => {
            submitAction.onSubmit &&
              submitAction.onSubmit(formSchemaState, formValues);
            e.preventDefault();
          }}
        >
          {submitAction.submitText}
        </button>
      )}
    </>
  );
};

export default FormLoader;
