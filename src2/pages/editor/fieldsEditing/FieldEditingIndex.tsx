import React, { useContext, useEffect, useState } from "react";
import FieldMaker from "./FieldMaker";
import styles from "./FieldMaker.module.css";
import Button from "../../../compoenents/Button";
import { TFields } from "../../../types/FormObject";
import { TSingleField } from "../../../types/contextTypes";
import SingleFieldContext from "../../../context/singleField/SingleFieldContext";

interface Props {
  SingleField?: TFields;
  onCreateField: (object: TFields) => void;
  inAddingState: (state: boolean) => void;
}
const FieldEditingIndex = ({
  SingleField,
  onCreateField,
  inAddingState,
}: Props) => {
  const [adding, setAdding] = useState(false);
  const { setField } = useContext<any>(SingleFieldContext);
  const Actions = {
    CreateField: (object: TFields) => {
      setField({});
      setAdding(false);
      inAddingState(false);
      onCreateField(object);
    },
    CancelCreatingField: () => {
      setField({});
      setAdding(false);
      inAddingState(false);
    },
  };
  useEffect(() => {
    if (SingleField) {
      // console.log(setField);
      setAdding(true);
      inAddingState(true);
    }
  }, [SingleField]);
  return (
    <div style={{ color: "white" }}>
      {!adding && (
        <>
          <h2 className={`${styles.h2}`}>Editor</h2>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBlock: "40px",
            }}
          >
            <h3>Create a new Field</h3>

            <Button
              color="#007BFF"
              onClick={() => {
                setAdding(true);
                inAddingState(true);
              }}
              text="+"
            />
          </div>
        </>
      )}
      {adding && (
        <FieldMaker
          onCancel={Actions.CancelCreatingField}
          PreBuiltField={SingleField ?? undefined}
          ButtonProps={{
            text: SingleField ? "Done Editing" : "Create Field",
            onClick: Actions.CreateField,
            color: "green",
          }}
        />
      )}
    </div>
  );
};

export default FieldEditingIndex;
