import React, { useState } from "react";
import ModalComponent from "./Modal/ModalComponent";
const Table = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      />
    </div>
  );
};

export default Table;
