import React, { useState } from "react";
import styles from "./editor.module.css";
import FieldMaker from "./fieldsEditing/FieldMaker";
import { TFormType } from "../../types/FormObject";
import SingleFieldContextProvider from "../../context/singleField/SingleFieldContextProvider";

interface Props {
  FormObject?: object;
  SchemaJson?: object;
}

const Editor = () => {
  const [Form, setForm] = useState<TFormType>();

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.toolbar}`}>Toolbar</div>
      <div className={`${styles.flexContainer}`}>
        <div className={`${styles.flexContainerDiv}`}>
          <SingleFieldContextProvider>
            <FieldMaker />
          </SingleFieldContextProvider>
        </div>
        <div className={`${styles.flexContainerDiv}`}>Fields in Form</div>
        <div className={`${styles.flexContainerDiv}`}>view</div>
      </div>
    </div>
  );
};

export default Editor;
