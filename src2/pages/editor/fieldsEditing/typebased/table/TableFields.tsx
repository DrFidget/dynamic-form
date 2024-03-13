import React, { useState } from "react";
import Modal from "../../../../../compoenents/Modal";
import Button from "../../../../../compoenents/Button";
import FieldMaker from "../../FieldMaker";
import { TFields } from "../../../../../types/FormObject";
import { json } from "react-router-dom";

interface Props {
  TableOptions?: TFields[];
  onNext: (List: TFields[]) => void;
}

const TableFields = ({ onNext, TableOptions }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tablefields, settableFields] = useState<TFields[]>(() => {
    if (TableOptions) return TableOptions;
    return [];
  });
  const [inEditMode, setEditMode] = useState({
    isEditing: false,
    index: -1,
  });

  const Actions = {
    SubmitButtonHandle: (field: TFields) => {
      let x = tablefields as TFields[];
      x.push(field);
      settableFields(x);
      setIsModalOpen(false);
    },
    Table: {
      Edit: (index: number) => {
        setEditMode({ isEditing: true, index: index });
      },
      Delete: (index: number) => {
        let x = JSON.parse(JSON.stringify(tablefields)) as TFields[];
        x.splice(index, 1);
        settableFields(x);
      },
      HandleEditing: (field: TFields) => {
        console.log(field);
        let x = JSON.parse(JSON.stringify(tablefields)) as TFields[];
        x[inEditMode.index] = field;
        setEditMode({ index: -1, isEditing: false });
        settableFields(x);
      },
    },
  };
  return (
    <div>
      <h3>Table</h3>
      <div>
        <Button
          text="Add Fields"
          color="#007BFF"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerText="Add Fields"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FieldMaker
            styles={{ width: "30rem" }}
            ButtonProps={{
              text: "Add",
              onClick: Actions.SubmitButtonHandle,
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={inEditMode.isEditing}
        onClose={() => setEditMode({ isEditing: false, index: -1 })}
        headerText="Edit Field"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FieldMaker
            PreBuiltField={tablefields[inEditMode.index]}
            styles={{ width: "30rem" }}
            ButtonProps={{
              text: "Done",
              onClick: Actions.Table.HandleEditing,
            }}
          />
        </div>
      </Modal>

      <h3>List of Fields Added...</h3>
      <table>
        <thead>
          <tr>
            <th>Fields</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tablefields.length > 0 &&
            tablefields.map((ele: TFields, k: number) => (
              <tr key={k}>
                <td>{ele.fieldName}</td>
                <td
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() => {
                      Actions.Table.Edit(k);
                    }}
                    text="Edit"
                    color="orange"
                  />
                  <Button
                    onClick={() => {
                      Actions.Table.Delete(k);
                    }}
                    text="Delete"
                    color="red"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <Button
          color="green"
          onClick={() => {
            onNext(tablefields);
          }}
          text="Next"
        />
      </div>
    </div>
  );
};

export default TableFields;
