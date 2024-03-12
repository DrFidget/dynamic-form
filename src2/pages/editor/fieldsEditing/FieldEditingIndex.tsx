import React, { useContext, useState } from "react";
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
  };
  return (
    <div>
      {!adding && (
        <>
          <h2 className={`${styles.h2}`}>Editor</h2>

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
              color="blue"
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
          PreBuiltField={SingleField ?? undefined}
          ButtonProps={{
            text: "Create Field",
            onClick: Actions.CreateField,
            color: "green",
          }}
        />
      )}
    </div>
  );
};

export default FieldEditingIndex;
// {
//     "id": "123",
//     "fieldName": "sas",
//     "fieldType": "text",
//     "visible": true,
//     "enable": true,
//     "required": false,
//     "lookup": {
//       "col": "asd",
//       "row": "asd",
//       "IdCol": "MPH",
//       "source": [
//         {
//           "MPH": "sd",
//           "asda": "asd"
//         }
//       ]
//     }
//   }
