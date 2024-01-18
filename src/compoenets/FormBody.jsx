import React from "react";
import { InputTypes } from "./newForm/Schema/InputTypes";

const FormBody = ({ formSchemaState: Fields, HandleChange: H_Change }) => {
  const FieldStyles = {
    margin: "10px 10px",
  };
  const InputValueChange = (value, id) => {
    // console.log("FormBody Changed");
    H_Change(value, id);
  };
  return (
    <>
      {Fields &&
        Fields.map((Element, key) => {
          const Component = InputTypes[Element.dataValues.fieldType];
          if (Component) {
            return (
              <Component
                key={key}
                Element={Element}
                Styles={FieldStyles}
                HandleChange={InputValueChange}
              />
            );
          }
        })}
    </>
  );
};

export default FormBody;
