import React from "react";
import { FormFieldProps } from "../../../types/form";
import styles from "./Fields.module.css";

const NumberInput: React.FC<FormFieldProps> = ({ field, onChange }) => {
  const { dataValues, optionalProperties } = field;
  const {
    id,
    fieldName,
    value = "",
    placeholder = "",
    required = false,
    min,
    max,
    step = 1,
  } = dataValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? "" : Number(e.target.value);
    onChange(newValue, id);
  };

  const handleIncrement = () => {
    if (typeof value !== "number") return;
    const newValue = value + step;
    if (max !== undefined && newValue > max) return;
    onChange(newValue, id);
  };

  const handleDecrement = () => {
    if (typeof value !== "number") return;
    const newValue = value - step;
    if (min !== undefined && newValue < min) return;
    onChange(newValue, id);
  };

  const error = optionalProperties?.error;

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>
        {fieldName}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.numberControls}>
        <input
          type="number"
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`${styles.numberInput} ${error ? styles.error : ""}`}
        />
        <div>
          <button
            type="button"
            onClick={handleIncrement}
            className={styles.numberButton}
            disabled={
              max !== undefined && typeof value === "number" && value >= max
            }
          >
            ▲
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className={styles.numberButton}
            disabled={
              min !== undefined && typeof value === "number" && value <= min
            }
          >
            ▼
          </button>
        </div>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {optionalProperties?.helperText && (
        <div className={styles.helperText}>
          {optionalProperties.helperText}
          {(min !== undefined || max !== undefined) && (
            <span>
              {" "}
              (Range: {min !== undefined ? min : "-∞"} to{" "}
              {max !== undefined ? max : "∞"})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberInput;
