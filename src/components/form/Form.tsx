import React from "react";
import FormLoader from "./FormLoader";
import { FormSchema } from "../../types/form";

interface FormProps {
  FormSchema?: any[];
  Values?: Record<string, any>;
  handleSubmit: (
    values: Record<string, any>,
    data: FormSchema["dataValues"][]
  ) => void;
  Name?: string;
}

const Form: React.FC<FormProps> = ({
  FormSchema,
  Values,
  handleSubmit,
  Name,
}) => {
  return (
    <div>
      <form className="bg-secondary">
        <h1>{Name || "Form"}</h1>
        <FormLoader
          FormSchema={FormSchema}
          Values={Values}
          submitAction={{
            submitText: Values ? "Done" : "Submit",
            stateOnLoad: !!Values,
            onSubmit: handleSubmit,
          }}
        />
      </form>
    </div>
  );
};

export default Form;
