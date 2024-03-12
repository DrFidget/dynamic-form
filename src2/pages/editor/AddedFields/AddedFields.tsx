import React from "react";
import styles from "./Addedfields.module.css";
import Button from "../../../compoenents/Button";
import Card from "../../../compoenents/CardCompoenent";
const AddedFields = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Added Fields</h2>
      <Card
        id={"abc"}
        fieldType="asdas"
        name="afad"
        onDelete={() => {}}
        onEdit={() => {}}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBlock: "40px",
        }}
      >
        <h3>Create a new Field</h3>

        <Button color="blue" onClick={() => {}} text="+" />
      </div>
    </div>
  );
};

export default AddedFields;
