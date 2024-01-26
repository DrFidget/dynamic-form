import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormLoader from "../../../FormLoader";
const ModalComponent = ({
  show,
  handleClose,
  FormSchema,
  FormState,
  StateChange,
}) => {
  const closeAndRetuenValues = (s) => {
    StateChange(s);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {FormSchema && (
          <FormLoader
            FormSchema={FormSchema}
            submitAction={{
              submitText: "Add",
              onSubmit: closeAndRetuenValues,
            }}
          />
        )}
        {FormState && (
          <FormLoader
            FormState={FormState}
            submitAction={{
              submitText: "Update",
              onSubmit: (e) => {
                StateChange(e);
                handleClose();
              },
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
