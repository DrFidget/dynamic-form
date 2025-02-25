import React from "react";
import { FormBodyProps } from "../../types/form";
import { InputTypes } from "./fields/InputTypes";
import styles from "./FormBody.module.css";

const FormBody: React.FC<FormBodyProps> = ({
  formSchemaState,
  HandleChange,
  DefaultMethods,
}) => {
  const handleInputChange = (value: any, id: string) => {
    HandleChange(value, id);
  };

  return (
    <div className={styles.formBody}>
      {formSchemaState?.map((field, index) => {
        const Component = InputTypes[field.dataValues.fieldType];

        if (!Component) {
          console.warn(
            `No component found for field type: ${field.dataValues.fieldType}`
          );
          return null;
        }

        if (field.optionalProperties?.isVisible === false) {
          return null;
        }

        return (
          <div
            key={field.dataValues.id || index}
            className={styles.fieldWrapper}
          >
            <Component
              field={field}
              onChange={handleInputChange}
              defaultMethods={DefaultMethods}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FormBody;
