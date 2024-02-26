import React from "react";
import styles from "./SelectType.module.css";

interface FieldType {
  id: string;
  name: string;
}

interface ButtonListProps {
  fieldTypes: FieldType[];
  onClick: (id: string) => void;
}

const SelectType: React.FC<ButtonListProps> = ({ fieldTypes, onClick }) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Select Input Type</h2>
      <div className={styles.buttonContainer}>
        {fieldTypes.map((field) => (
          <button
            key={field.id}
            className={styles.button}
            onClick={() => onClick(field.id)}
          >
            {field.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default SelectType;
