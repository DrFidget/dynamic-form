import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

interface Option {
  label: string;
  value: string | number;
}

const SelectInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = "",
    required = false,
    options = [],
  } = dataValues;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value, id);
  };

  const error = optionalProperties?.error;

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>
        {fieldName}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
        className={`${styles.select} ${error ? styles.error : ""}`}
      >
        <option value="">Select an option</option>
        {Array.isArray(options) &&
          options.map((option: Option | string, index) => {
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <option key={index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
      </select>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default SelectInput;
