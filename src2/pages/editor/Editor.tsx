import React, { useContext, useState } from "react";
import styles from "./editor.module.css";
import FieldMaker from "./fieldsEditing/FieldMaker";
import { TFormType } from "../../types/FormObject";
import SingleFieldContextProvider from "../../context/singleField/SingleFieldContextProvider";
import FormView from "./View/FormView";

interface Props {
  FormObject?: object;
  SchemaJson?: object;
}

const Editor = () => {
  const [Form, setForm] = useState<TFormType>();

  return (
    <div className={`${styles.container}`}>
      <SingleFieldContextProvider>
        <div className={`${styles.toolbar}`}>Toolbar</div>
        <div className={`${styles.flexContainer}`}>
          <div className={`${styles.flexContainerDiv}`}>
            <FieldMaker />
          </div>
          <div className={`${styles.flexContainerDiv}`}>Fields in Form</div>
          <div className={`${styles.flexContainerDiv}`}>
            <FormView />
          </div>
        </div>
      </SingleFieldContextProvider>
    </div>
  );
};

export default Editor;
