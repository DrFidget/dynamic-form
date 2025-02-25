import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

const TextAreaInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = "",
    placeholder = "",
    required = false,
    rows = 4,
    maxLength,
  } = dataValues;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, id);
  };

  const error = optionalProperties?.error;
  const helperText = optionalProperties?.helperText;
  const currentLength = String(value).length;

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>
        {fieldName}
        {required && <span className={styles.required}>*</span>}
        {maxLength && (
          <span className={styles.helperText}>
            ({currentLength}/{maxLength})
          </span>
        )}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`${styles.textarea} ${error ? styles.error : ""}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default TextAreaInput;
