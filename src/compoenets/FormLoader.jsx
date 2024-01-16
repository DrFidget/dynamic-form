import React, { useState } from "react";
import { Field } from "./newForm/class/Field";
import FormBody from "./FormBody";

const FormLoader = ({ FormSchema }) => {
  const [formSchemaState, setFormSchemaState] = useState(
    Field.getFields(FormSchema)
  );
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
    <div
      className=""
      style={
        {
          // minWidth: "100vw",
          // minHeight: "100vh",
        }
      }
    >
      <form className=" bg-secondary w-50">
        <h1>FORM</h1>
        <FormBody
          formSchemaState={formSchemaState}
          HandleChange={HandleChange}
        />
        <div className="btn btn-primary">Submit</div>
      </form>
    </div>
  );
};

export default FormLoader;
