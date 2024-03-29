import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FormLoader from "../../../FormLoader";
import { DEEPCOPY } from "../../../../utils";
import Button from "../../../utilCompoenents/Button";

const TableInput = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
  const [TableFormState, setTableFormState] = useState([]);
  const [show, setShow] = useState(false);
  const [editHandler, setEditHandler] = useState({
    editMode: false,
    row: null,
    data: null,
  });

  useEffect(() => {
    HandleChange([...DEEPCOPY(TableFormState)], dataValues.id);
  }, [TableFormState]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const FormActions = {
    submitHandler: (newVals) => {
      let temp = [...DEEPCOPY(TableFormState)];
      temp.push(newVals);
      console.log(temp);
      setTableFormState(temp);
      handleClose();
    },
    submitEditedValueshandler: (newVals) => {
      handleClose();
      let temp = [...DEEPCOPY(TableFormState)];
      let row = editHandler.row;
      temp[row] = newVals;
      setTableFormState([...DEEPCOPY(temp)]);
    },
  };
  const TableActions = {
    edit: (row) => {
      console.log("row", row);
      setEditHandler({
        ...editHandler,
        editMode: true,
        row: row,
        data: TableFormState[row],
      });
      handleShow();
    },
    delete: (row) => {
      let temp = [...DEEPCOPY(TableFormState)];
      temp.splice(row, 1);
      setTableFormState(temp);
    },
  };

  return (
    <div style={Styles} id={dataValues.id}>
      <Button
        text={dataValues.fieldName + " +"}
        color="blue"
        type="button"
        onClick={() => handleShow()}
      />

      {/* </button> */}
      {show && (
        <Modal isOpen={show} onClose={() => handleClose()}>
          {editHandler.editMode === true ? (
            <FormLoader
              FormSchema={inputProperties.options}
              Values={editHandler.data}
              submitAction={{
                submitText: "Edit",
                stateOnLoad: true,
                onSubmit: (s) => {
                  FormActions.submitEditedValueshandler(s);
                },
              }}
            />
          ) : (
            <FormLoader
              FormSchema={inputProperties.options}
              submitAction={{
                submitText: "Add",
                onSubmit: (s) => {
                  FormActions.submitHandler(s);
                },
              }}
            />
          )}
        </Modal>
      )}

      {TableFormState.length > 0 && (
        <table style={{ marginBlockStart: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Values</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {TableFormState.map((e, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{JSON.stringify(e)}</td>
                <td>
                  <Button
                    text={"Edit"}
                    type="button"
                    onClick={() => TableActions.edit(k)}
                    color={"blue"}
                  />
                </td>
                <td>
                  <Button
                    text={"Delete"}
                    type="button"
                    onClick={() => TableActions.delete(k)}
                    color={"red"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableInput;
