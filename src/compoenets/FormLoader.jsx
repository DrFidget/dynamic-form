// import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import FormBody from "./FormBody";
import { FormSchemaProcessor } from "../../ServiceLayer/FormPresenter/FormSchema/FormSchemaProcessor";
import { HandleChangeState } from "../../ServiceLayer/FormPresenter/LogicLayer/FormHandler/FormLoaderHandleChange";
import { HandleGroupVisibility } from "../../ServiceLayer/FormPresenter/LogicLayer/FormHandler/FormLoaderHandleBinding";
import Button from "./utilCompoenents/Button";

const FormLoader = ({
  FormSchema,
  submitAction,
  FormState,
  DefaultMethods,
  Values,
}) => {
  const [formSchemaState, setFormSchemaState] = useState(() => {
    let schema_or_state;
    if (FormSchema)
      schema_or_state = FormSchemaProcessor.generateFormFields(FormSchema);
    else schema_or_state = FormState;
    HandleGroupVisibility(schema_or_state);

    if (Values) {
      schema_or_state = schema_or_state.map((e) => ({
        ...e,
        dataValues: {
          ...e.dataValues,

          value: Array.isArray(Values[e.dataValues.id])
            ? [...Values[e.dataValues.id]]
            : Values[e.dataValues.id],
        },
      }));
    }
    return schema_or_state;
  });

  useEffect(() => {
    let schema_or_state;
    if (FormSchema)
      schema_or_state = FormSchemaProcessor.generateFormFields(FormSchema);
    else schema_or_state = FormState;
    HandleGroupVisibility(schema_or_state);

    if (Values) {
      schema_or_state = schema_or_state.map((e) => ({
        ...e,
        dataValues: {
          ...e.dataValues,

          value: Array.isArray(Values[e.dataValues.id])
            ? [...Values[e.dataValues.id]]
            : Values[e.dataValues.id],
        },
      }));
    }
    setFormSchemaState(schema_or_state);
  }, [FormSchema]);

  const [formValues, setFormValues] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(
    submitAction?.stateOnLoad === true ? true : false
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
        <Button
          type="submit"
          color="green"
          disabled={!readyToSubmit}
          onClick={(e) => {
            e.preventDefault();
            let x = [];
            formSchemaState.forEach((element) => {
              x.push(element.dataValues);
            });

            submitAction.onSubmit && submitAction.onSubmit(formValues, x);
          }}
          text={submitAction.submitText}
        ></Button>
      )}
    </>
  );
};

export default FormLoader;
