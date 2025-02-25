import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

interface Option {
  label: string;
  value: string | number;
}

const RadioInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = "",
    required = false,
    options = [],
  } = dataValues;

  const handleChange = (optionValue: string | number) => {
    onChange(optionValue, id);
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

            return (
              <div key={`${id}-${index}`} className={styles.radioContainer}>
                <input
                  type="radio"
                  id={`${id}-${index}`}
                  name={id}
                  value={optionValue}
                  checked={value === optionValue}
                  onChange={() => handleChange(optionValue)}
                  required={required}
                  className={`${styles.radio} ${error ? styles.error : ""}`}
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

export default RadioInput;
