import React, { useEffect, useState } from "react";
import ModalComponent from "./Modal/ModalComponent";
import TableComponent from "./ShowTable/TableComponent";

const Table = ({ Element, Styles, HandleChange }) => {
  const [TableFormState, setTableFormState] = useState(null);

  const [show, setShow] = useState(false);
  const [updateHandler, setUpdateHandler] = useState({
    show: false,
    row: null,
    data: null,
  });
  const { dataValues, inputProperties } = Element;
  useEffect(() => {
    if (TableFormState) {
      let temp = [];
      let x = [...TableFormState];

      x.forEach((Element) => {
        let temp2 = [];
        Element.forEach((item) => {
          temp2.push(item.dataValues);
          // console.log(item.dataValues);
        });
        temp.push(temp2);
      });
      HandleChange(temp, dataValues.id);
    }
  }, [TableFormState]);

  const StateChange = (State) => {
    // console.log(State);
    if (TableFormState) {
      let x = [...TableFormState];
      x.push(State);
      setTableFormState(x);
    } else {
      setTableFormState([State]);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const HandleDeleteRow = (rowNumber) => {
    let x = [...TableFormState];
    x.splice(rowNumber, "1");
    setTableFormState(x);
  };

  const HandleUpdateRow = (rowNumber) => {
    setUpdateHandler({
      show: true,
      row: rowNumber,
      data: [...TableFormState[rowNumber]],
    });
  };

  return (
    <div style={Styles} id={dataValues.id}>
      Table
      <br />
      <div className="btn btn-primary" onClick={handleShow}>
        Add +
      </div>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        FormSchema={inputProperties.options}
        StateChange={StateChange}
      />
      {updateHandler.show && (
        <ModalComponent
          show={updateHandler.show}
          handleClose={() =>
            setUpdateHandler((prev) => ({ ...prev, show: false }))
          }
          // HandleUpdateRow={(rowNumber) => {}}
          FormState={updateHandler.data}
          StateChange={(State) => {
            let x = [...TableFormState];
            x[updateHandler.row] = State;
            setTableFormState([...x]);
          }}
        />
      )}
      {TableFormState && TableFormState.length > 0 && (
        <TableComponent
          Data={TableFormState}
          HandleDeleteRow={HandleDeleteRow}
          HandleUpdateRow={HandleUpdateRow}
        />
      )}
    </div>
  );
};

export default Table;
