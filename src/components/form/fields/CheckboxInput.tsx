import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

interface Option {
  label: string;
  value: string | number;
}

const CheckboxInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = [],
    required = false,
    options = [],
  } = dataValues;

  const handleChange = (optionValue: string | number) => {
    let newValue: (string | number)[];

    if (Array.isArray(value)) {
      if (value.includes(optionValue)) {
        newValue = value.filter((v) => v !== optionValue);
      } else {
        newValue = [...value, optionValue];
      }
    } else {
      newValue = [optionValue];
    }

    onChange(newValue, id);
  };

  const error = optionalProperties?.error;
  const helperText = optionalProperties?.helperText;

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldName}
        {required && <span className={styles.required}>*</span>}
      </div>
      <div>
        {Array.isArray(options) &&
          options.map((option: Option | string, index) => {
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;
            const isChecked =
              Array.isArray(value) && value.includes(optionValue);

            return (
              <div key={index} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`${id}-${index}`}
                  checked={isChecked}
                  onChange={() => handleChange(optionValue)}
                  className={`${styles.checkbox} ${error ? styles.error : ""}`}
                />
                <label htmlFor={`${id}-${index}`}>{optionLabel}</label>
              </div>
            );
          })}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default CheckboxInput;
