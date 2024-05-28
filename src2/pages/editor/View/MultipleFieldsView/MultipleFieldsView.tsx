import React from "react";
import { TFields } from "../../../../types/FormObject";
import FormLoader from "../../../../../src/compoenets/FormLoader";
import styles from "../View.module.css";

interface Props {
  ST?: React.CSSProperties;
  Name?: string;
  ListOfFields: TFields[];
}
const MultipleFieldsView = ({ ListOfFields, ST, Name }: Props) => {
  return (
    <div style={{}}>
      <h2 className={styles.h2}>{Name}</h2>
      <div style={{ ...ST }}>
        <hr />
        {ListOfFields.length > 0 ? (
          <FormLoader
            FormSchema={JSON.parse(JSON.stringify(ListOfFields))}
            DefaultMethods={undefined}
            FormState={undefined}
            Values={undefined}
            submitAction={undefined}
          />
        ) : (
          <p style={{ textAlign: "center" }}>No fields added...</p>
        )}
      </div>
    </div>
  );
};

export default MultipleFieldsView;
