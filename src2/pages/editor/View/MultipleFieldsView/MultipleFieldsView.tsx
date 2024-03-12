import React from "react";
import { TFields } from "../../../../types/FormObject";
import FormLoader from "../../../../../src/compoenets/FormLoader";
import styles from "../View.module.css";
interface Props {
  ListOfFields: TFields[];
}
const MultipleFieldsView = ({ ListOfFields }: Props) => {
  return (
    <div>
      <h2 className={styles.h2}>Current Fields</h2>
      {ListOfFields.length > 0 ? (
        <FormLoader
          FormSchema={ListOfFields}
          DefaultMethods={undefined}
          FormState={undefined}
          Values={undefined}
          submitAction={undefined}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No fields added...</p>
      )}
    </div>
  );
};

export default MultipleFieldsView;
