import React, { useEffect, useState } from "react";
import { FormSchema } from "../../types/form";
import { FormSchemaProcessor } from "../../utils/form/FormSchemaProcessor";
import {
  HandleChangeState,
  HandleValidation,
} from "../../utils/form/formHandlers";
import { HandleGroupVisibility } from "../../utils/form/formVisibility";
import Button from "../common/Button";
import FormBody from "./FormBody";

interface SubmitAction {
  submitText: string;
  stateOnLoad?: boolean;
  onSubmit: (
    values: Record<string, any>,
    rawData: FormSchema["dataValues"][]
  ) => void;
}

interface FormLoaderProps {
  FormSchema?: any[];
  submitAction?: SubmitAction;
  FormState?: FormSchema[];
  DefaultMethods?: Record<string, any>;
  Values?: Record<string, any>;
}

const FormLoader: React.FC<FormLoaderProps> = ({
  FormSchema: schema,
  submitAction,
  FormState,
  DefaultMethods,
  Values,
}) => {
  const processFormSchema = (
    schemaOrState: any[] | undefined,
    values: Record<string, any> | undefined
  ): FormSchema[] => {
    let processedSchema: FormSchema[];

    if (schemaOrState) {
      processedSchema = FormSchemaProcessor.generateFormFields(schemaOrState);
    } else {
      processedSchema = FormState || [];
    }

    HandleGroupVisibility(processedSchema);

    if (values) {
      processedSchema = processedSchema.map((item) => ({
        ...item,
        dataValues: {
          ...item.dataValues,
          value: Array.isArray(values[item.dataValues.id])
            ? [...values[item.dataValues.id]]
            : values[item.dataValues.id],
        },
      }));
    }

    return processedSchema;
  };

  const [formSchemaState, setFormSchemaState] = useState<FormSchema[]>(() =>
    processFormSchema(schema, Values)
  );

  const [formValues, setFormValues] = useState<Record<string, any> | null>(
    null
  );
  const [readyToSubmit, setReadyToSubmit] = useState(
    !!submitAction?.stateOnLoad
  );

  useEffect(() => {
    setFormSchemaState(processFormSchema(schema, Values));
  }, [schema, Values]);

  useEffect(() => {
    const values: Record<string, any> = {};
    formSchemaState.forEach((element) => {
      values[element.dataValues.id] = element.dataValues.value ?? "";
    });

    const fieldsWithValidation = formSchemaState.filter(
      (e) => e.optionalProperties?.validation
    );

    const allValid = fieldsWithValidation.every((field) =>
      HandleValidation(field, values)
    );

    setFormValues(values);
    setReadyToSubmit(allValid);
  }, [formSchemaState]);

  const handleChange = (value: any, id: string) => {
    if (!formValues) return;

    const { updatedFields, isReadyToSubmit } = HandleChangeState(
      value,
      id,
      formValues,
      formSchemaState
    );

    setFormSchemaState(updatedFields);
    setReadyToSubmit(isReadyToSubmit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues || !submitAction) return;

    const rawData = formSchemaState.map((element) => element.dataValues);
    submitAction.onSubmit(formValues, rawData);
  };

  return (
    <div>
      <FormBody
        formSchemaState={formSchemaState}
        HandleChange={handleChange}
        DefaultMethods={DefaultMethods}
      />
      {submitAction && (
        <Button
          type="submit"
          color="green"
          disabled={!readyToSubmit}
          onClick={handleSubmit}
          text={submitAction.submitText}
        />
      )}
    </div>
  );
};

export default FormLoader;
