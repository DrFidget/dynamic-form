import React, { useState } from "react";
import styles from "./editor.module.css";
import FieldMaker from "./fieldsEditing/FieldMaker";
import { TFormType } from "../../types/FormObject";

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
          Add Field
          <FieldMaker />
        </div>
        <div className={`${styles.flexContainerDiv}`}>Fields in Form</div>
        <div className={`${styles.flexContainerDiv}`}>View</div>
      </div>
    </div>
  );
};

export default Editor;
