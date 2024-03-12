import React, { useContext, useState } from "react";
import styles from "./editor.module.css";
import FieldMaker from "./fieldsEditing/FieldMaker";
import { TFields, TFormType } from "../../types/FormObject";
import SingleFieldContextProvider from "../../context/singleField/SingleFieldContextProvider";
import FormView from "./View/SingleFieldView/SingleFieldView";
import AddedFields from "./AddedFields/AddedFields";
import FieldEditingIndex from "./fieldsEditing/FieldEditingIndex";
import MultipleFieldsView from "./View/MultipleFieldsView/MultipleFieldsView";

interface Props {
  FormObject?: object;
  SchemaJson?: object;
}

const Editor = () => {
  const [Form, setForm] = useState<TFormType>({ Schema: [] });
  const [creatingField, setCreatingField] = useState(false);

  const Actions = {
    FieldMaker: {
      onCreateField: (object: TFields) => {
        setForm({ ...Form, Schema: [...Form.Schema, object] });
      },
      inAddingState: (state: boolean) => {
        setCreatingField(state);
      },
    },
  };

  return (
    <div className={`${styles.container}`}>
      <SingleFieldContextProvider>
        <div className={`${styles.toolbar}`}>Toolbar</div>
        <div className={`${styles.flexContainer}`}>
          <div className={`${styles.flexContainerDiv}`}>
            <FieldEditingIndex
              onCreateField={Actions.FieldMaker.onCreateField}
              inAddingState={Actions.FieldMaker.inAddingState}
            />
          </div>
          <div className={`${styles.flexContainerDiv}`}>
            <AddedFields ListOfFields={Form.Schema} />
          </div>
          <div className={`${styles.flexContainerDiv}`}>
            {creatingField ? (
              <FormView />
            ) : (
              <MultipleFieldsView ListOfFields={Form.Schema} />
            )}
          </div>
        </div>
      </SingleFieldContextProvider>
    </div>
  );
};

export default Editor;
