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
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        Please Select Input Type...
      </p>
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
