import React, { useContext, useEffect, useState, useCallback } from "react";
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
import { getFieldTemplate } from "../../types/FieldTemplates";

interface Props {
  FormObject?: any;
  SchemaJson?: object;
}

const MAX_HISTORY = 50;

const Editor = ({ FormObject }: Props) => {
  const location = useLocation();

  // History state
  const [history, setHistory] = useState<TFormType[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  //main state for forms
  const [Form, setForm] = useState<TFormType>(() => {
    const initialForm = {
      Name: "",
      Schema: FormObject ? (FormObject as TFields[]) : [],
    };
    setHistory([initialForm]);
    setHistoryIndex(0);
    return initialForm;
  });

  const [creatingField, setCreatingField] = useState(false);
  const [editMode, setEditMode] = useState({
    isEditing: false,
    data: {} as TFields,
    index: -1,
  });

  const [loading, withLoading] = useLoadingState<void>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  // History management
  const addToHistory = useCallback(
    (newForm: TFormType) => {
      setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        const updatedHistory = [...newHistory, newForm];
        if (updatedHistory.length > MAX_HISTORY) {
          updatedHistory.shift();
        }
        return updatedHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex]
  );

  const updateForm = useCallback(
    (newForm: TFormType) => {
      setForm(newForm);
      addToHistory(newForm);
    },
    [addToHistory]
  );

  // Bulk actions handlers
  const handleBulkDelete = useCallback(
    (indices: number[]) => {
      const sortedIndices = [...indices].sort((a, b) => b - a); // Delete from end to start
      const updatedSchema = [...Form.Schema];
      sortedIndices.forEach((index) => {
        updatedSchema.splice(index, 1);
      });
      updateForm({ ...Form, Schema: updatedSchema });
    },
    [Form, updateForm]
  );

  const handleBulkDuplicate = useCallback(
    (indices: number[]) => {
      const newFields = indices.map((index) => {
        const field = Form.Schema[index];
        return {
          ...JSON.parse(JSON.stringify(field)),
          id: `${field.id}_copy_${Date.now()}`,
          fieldName: `${field.fieldName} (Copy)`,
        };
      });
      const maxIndex = Math.max(...indices);
      const updatedSchema = [...Form.Schema];
      updatedSchema.splice(maxIndex + 1, 0, ...newFields);
      updateForm({ ...Form, Schema: updatedSchema });
    },
    [Form, updateForm]
  );

  const handleBulkMove = useCallback(
    (indices: number[], targetIndex: number) => {
      const sortedIndices = [...indices].sort((a, b) => a - b);
      const fieldsToMove = sortedIndices.map((index) => Form.Schema[index]);
      const updatedSchema = Form.Schema.filter(
        (_, index) => !indices.includes(index)
      );
      updatedSchema.splice(targetIndex, 0, ...fieldsToMove);
      updateForm({ ...Form, Schema: updatedSchema });
    },
    [Form, updateForm]
  );

  // Template handling
  const addFieldFromTemplate = useCallback(
    (templateName: string) => {
      try {
        const newField = getFieldTemplate(templateName);
        updateForm({ ...Form, Schema: [...Form.Schema, newField] });
      } catch (error) {
        console.error("Error adding field from template:", error);
        swal("Error", "Failed to add field template", "error");
      }
    },
    [Form, updateForm]
  );

  // Undo/Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setForm(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setForm(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  useEffect(() => {
    let parsedSchema = location.state?.parsedSchema as TFields[];
    let fromName = location.state?.formName as string;
    if (parsedSchema && fromName) {
      updateForm({ ...Form, Schema: parsedSchema, Name: fromName });
    } else if (fromName) {
      updateForm({ ...Form, Name: fromName });
    }
  }, []);

  const Actions = {
    FieldMaker: {
      onCreateField: (object: TFields) => {
        updateForm({ ...Form, Schema: [...Form.Schema, object] });
      },
      inAddingState: (state: boolean) => {
        setCreatingField(state);
      },
      onEditDone: (object: TFields) => {
        let x = JSON.parse(JSON.stringify(Form.Schema));
        x[editMode.index] = object;
        updateForm({ ...Form, Schema: x });
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
        handleBulkDelete([index]);
      },
      onReorder: (sourceIndex: number, destinationIndex: number) => {
        const updatedSchema = Array.from(Form.Schema);
        const [removed] = updatedSchema.splice(sourceIndex, 1);
        updatedSchema.splice(destinationIndex, 0, removed);
        updateForm({ ...Form, Schema: updatedSchema });
      },
      onDuplicate: (index: number) => {
        handleBulkDuplicate([index]);
      },
      onBulkDelete: handleBulkDelete,
      onBulkDuplicate: handleBulkDuplicate,
      onBulkMove: handleBulkMove,
    },
    FormView: {},

    Submit: async () => {
      let isEditingPrevForm = location.state?.isEditingPrevForm;
      if (!isEditingPrevForm) {
        await withLoading(FormApis.CreateForm, Form);
        swal("Form Submitted Successfully");
      } else {
        let formId = location.state?.id;
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
            onCreate={Actions.Submit}
            onCancel={() => navigate("/")}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
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

          <div className={`${styles.flexContainerDiv}`}>
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
              onReorder={Actions.AddedFields.onReorder}
              onDuplicate={Actions.AddedFields.onDuplicate}
              onBulkDelete={Actions.AddedFields.onBulkDelete}
              onBulkDuplicate={Actions.AddedFields.onBulkDuplicate}
              onBulkMove={Actions.AddedFields.onBulkMove}
              ST={{ maxHeight: "80vh", overflowY: "auto" }}
              onSelect={(k: number) => setSelected(k)}
            />
          </div>
          <div className={`${styles.objectView}`}>
            <ObjectView data={Form.Schema[selected]} />
          </div>
        </div>
      </SingleFieldContextProvider>
    </div>
  );
};

export default Editor;
