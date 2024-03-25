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
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FormApis, useLoadingState } from "../../service/API/Form/FormApi";
import LoadingComponent from "../../compoenents/LoadingCompoenent";

interface Props {
  FormObject?: any;
  SchemaJson?: object;
}

const Editor = ({ FormObject }: Props) => {
  const location = useLocation();

  const [Form, setForm] = useState<TFormType>(() => {
    if (FormObject) return { Name: "", Schema: FormObject as TFields[] };
    return { Name: "", Schema: [] };
  });
  const [creatingField, setCreatingField] = useState(false);
  const [editMode, setEditMode] = useState({
    isEditing: false,
    data: {} as TFields,
    index: -1,
  });
  const [loading, withLoading] = useLoadingState<void>();
  const navigate = useNavigate();
  useEffect(() => {
    let parsedSchema = location.state?.parsedSchema as TFields[];
    let fromName = location.state?.formName as string;
    if (parsedSchema && fromName) {
      setForm({ ...Form, Schema: parsedSchema, Name: fromName });
    }
    if (fromName) {
      setForm({ ...Form, Name: fromName });
    }
  }, []);
  const [selected, setSelected] = useState(0);
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
        window.scrollTo(0, 0);
        if (editMode.isEditing) {
          swal("please complete the selected field first");
          return;
        }
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
      let isEditingPrevForm = location.state?.isEditingPrevForm;
      console.log("1", isEditingPrevForm);
      if (!isEditingPrevForm) {
        await withLoading(FormApis.CreateForm, Form);
        swal("Form Submitted Sucessfully");
      } else {
        let formId = location.state?.id;
        console.log("1", formId);
        await withLoading(FormApis.UpdateByID, formId, Form);
        swal("Form Updated Successfully");
      }

      navigate("/");
    },
  };

  return (
    <div className={`${styles.container}`}>
      {loading && <LoadingComponent />}
      <SingleFieldContextProvider>
        <div className={`${styles.toolbar}`}>
          <ToolBar
            isRedyToSubmit={creatingField}
            onCreate={() => {
              Actions.Submit();
            }}
            onCancel={() => {
              navigate("/");
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
              <FormView ST={{ overflowY: "auto" }} />
            ) : (
              <MultipleFieldsView
                Name={Form.Name}
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
              onSelect={(k: number) => setSelected(k)}
            />
          </div>
          <div className={`${styles.objectView}`}>
            <ObjectView data={Form.Schema[selected]} />
          </div>
        </div>
      </SingleFieldContextProvider>
      {/* <pre>{location.state?.addExisting || ""}</pre> */}
    </div>
  );
};

export default Editor;
