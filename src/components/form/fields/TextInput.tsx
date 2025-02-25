import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

const TextInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = "",
    placeholder = "",
    required = false,
  } = dataValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, id);
  };

  const error = optionalProperties?.error;

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>
        {fieldName}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TextInput;
