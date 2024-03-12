import React from "react";
import styles from "./Addedfields.module.css";
import Button from "../../../compoenents/Button";
import Card from "../../../compoenents/CardCompoenent";
import { TFields } from "../../../types/FormObject";

interface Props {
  ListOfFields: TFields[];
}
const AddedFields = ({ ListOfFields }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Added Fields</h2>
      {/* <Card
        id={"abc"}
        fieldType="asdas"
        name="afad"
        onDelete={() => {}}
        onEdit={() => {}}
      /> */}
      {ListOfFields.length > 0
        ? ListOfFields.map((e, k) => (
            <Card
              key={k}
              fieldType={e.fieldType as string}
              id={e.fieldType as string}
              name={e.fieldName as string}
              onDelete={() => {}}
              onEdit={() => {}}
            />
          ))
        : null}
    </div>
  );
};

export default AddedFields;
