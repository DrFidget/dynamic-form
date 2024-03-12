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
  const [editMode, setEditMode] = useState({
    isEditing: false,
    data: {} as TFields,
    index: -1,
  });

  const Actions = {
    FieldMaker: {
      onCreateField: (object: TFields) => {
        setForm({ ...Form, Schema: [...Form.Schema, object] });
      },
      inAddingState: (state: boolean) => {
        setCreatingField(state);
      },
      onEditDone: (object: TFields) => {
        let x = JSON.parse(JSON.stringify(Form.Schema));
        x[editMode.index] = object;
        setForm({ ...Form, Schema: x });
        setEditMode({ isEditing: false, data: {}, index: -1 });
      },
    },
    AddedFields: {
      onEdit: (index: number) => {
        setEditMode({
          isEditing: true,
          data: Form.Schema[index],
          index: index,
        });
      },
      onDelete: (index: number) => {
        let x = JSON.parse(JSON.stringify(Form.Schema));
        x.splice(index, 1);
        setForm({ ...Form, Schema: x });
      },
    },
    FormView: {},
  };

  return (
    <div className={`${styles.container}`}>
      <SingleFieldContextProvider>
        <div className={`${styles.toolbar}`}>Toolbar</div>
        <div className={`${styles.flexContainer}`}>
          <div className={`${styles.flexContainerDiv}`}>
            {editMode.isEditing ? (
              <FieldEditingIndex
                onCreateField={Actions.FieldMaker.onEditDone}
                inAddingState={Actions.FieldMaker.inAddingState}
                SingleField={editMode.isEditing ? editMode.data : undefined}
              />
            ) : (
              <FieldEditingIndex
                onCreateField={Actions.FieldMaker.onCreateField}
                inAddingState={Actions.FieldMaker.inAddingState}
                SingleField={undefined}
              />
            )}
          </div>
          <div className={`${styles.flexContainerDiv}`}>
            <AddedFields
              ListOfFields={Form.Schema}
              onDelete={Actions.AddedFields.onDelete}
              onEdit={Actions.AddedFields.onEdit}
            />
          </div>
          <div className={`${styles.flexContainerDiv}`}>
            {creatingField || editMode.isEditing ? (
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
