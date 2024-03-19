import React, { useContext, useEffect, useState } from "react";
import styles from "./editor.module.css";
import FieldMaker from "./fieldsEditing/FieldMaker";
import { TFields, TFormType } from "../../types/FormObject";
import SingleFieldContextProvider from "../../context/singleField/SingleFieldContextProvider";
import FormView from "./View/SingleFieldView/SingleFieldView";
import AddedFields from "./AddedFields/AddedFields";
import FieldEditingIndex from "./fieldsEditing/FieldEditingIndex";
import MultipleFieldsView from "./View/MultipleFieldsView/MultipleFieldsView";
import ObjectView from "./View/MultipleFieldsView/ObjectView";
import ToolBar from "../../compoenents/toolBar/ToolBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

interface Props {
  FormObject?: any;
  SchemaJson?: object;
}

const Editor = ({ FormObject }: Props) => {
  const location = useLocation();

  const [Form, setForm] = useState<TFormType>(() => {
    // if (location.state?.addExisting) {
    //   return { Schema: location.state?.addExisting as TFields[] };
    // }
    if (FormObject) return { Schema: FormObject as TFields[] };
    return { Schema: [] };
  });
  const [creatingField, setCreatingField] = useState(false);
  const [editMode, setEditMode] = useState({
    isEditing: false,
    data: {} as TFields,
    index: -1,
  });
  useEffect(() => {
    let x = location.state?.addExisting as string;
    if (x) {
      let j = JSON.parse(x) as TFields[];
      setForm({ ...Form, Schema: j });
    }
  }, []);

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

    Submit: async () => {
      console.log("tyring");
      let x = JSON.stringify(Form.Schema);
      console.log(x);
      try {
        const res = await axios.post("http://localhost:9000/form", x, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        swal("submitted");
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <div className={`${styles.container}`}>
      <SingleFieldContextProvider>
        <div className={`${styles.toolbar}`}>
          <ToolBar
            isRedyToSubmit={creatingField}
            onClick={() => {
              Actions.Submit();
            }}
          />
        </div>
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

          <div
            className={`${styles.flexContainerDiv}`}
            // style={{ maxHeight: "80vh", overflowY: "scroll" }}
          >
            {creatingField || editMode.isEditing ? (
              <FormView ST={{ maxHeight: "80vh", overflowY: "auto" }} />
            ) : (
              <MultipleFieldsView
                ListOfFields={Form.Schema}
                ST={{ maxHeight: "80vh", overflowY: "auto" }}
              />
            )}
          </div>
        </div>
        <div className={`${styles.AddedFieldsContainer}`}>
          <div className={`${styles.AddedLists}`}>
            <AddedFields
              ListOfFields={Form.Schema}
              onDelete={Actions.AddedFields.onDelete}
              onEdit={Actions.AddedFields.onEdit}
              ST={{ maxHeight: "80vh", overflowY: "auto" }}
            />
          </div>
          <div className={`${styles.objectView}`}>
            <ObjectView />{" "}
          </div>
        </div>
      </SingleFieldContextProvider>
      {/* <pre>{location.state?.addExisting || ""}</pre> */}
    </div>
  );
};

export default Editor;
