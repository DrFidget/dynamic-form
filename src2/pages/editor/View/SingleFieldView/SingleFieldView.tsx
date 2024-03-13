import React, { useContext, useEffect, useState } from "react";
import { TSingleField } from "../../../../types/contextTypes";
import SingleFieldContext from "../../../../context/singleField/SingleFieldContext";
import FormLoader from "../../../../../src/compoenets/FormLoader";
import { TSource } from "../../../../types/TypeBasedProps";
import styles from "../View.module.css";

const FormView = () => {
  const [singleField, setSingleField] = useState<TSingleField[]>([]);
  const { field } = useContext<TSingleField>(SingleFieldContext);

  useEffect(() => {
    let x = { ...field };
    if (x?.id && x.fieldName && x.fieldType) {
      if (x.fieldType === "list" || x.fieldType === "radioList") {
        if (!x.options) x.options = ["undefined"];
      }
      if (x.lookup && x.lookup.source) {
        let p = JSON.parse(x.lookup.source as string) as TSource;
        x.lookup.source = p as TSource;
        console.log(p);
      }
      setSingleField([x as TSingleField]);
    }
  }, [field]);

  return (
    <div style={{ color: "white" }}>
      <h2 className={styles.h2}>View</h2>
      <hr />
      {singleField.length > 0 && (
        <FormLoader
          FormSchema={singleField}
          DefaultMethods={undefined}
          FormState={undefined}
          Values={undefined}
          submitAction={undefined}
        />
      )}
      <div style={{ marginBlock: "40px" }}>
        <h3>Object : </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "20rem",
            paddingInline: "20px",
          }}
        >
          {/* <br /> */}
          <pre>{JSON.stringify(singleField[0], null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default FormView;
