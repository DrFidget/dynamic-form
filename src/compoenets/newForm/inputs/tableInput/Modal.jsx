import React, { useState, useEffect } from "react";

const Modal = ({
  isOpen,
  onSubmit,
  onCancel,
  headerText,
  submitText,
  closeText,
  getOpenMethod,
  children,
  onClose,
}) => {
  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingBlock: "50px",
  };

  const contentStyle = {
    backgroundColor: "#fefefe",
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <div>
          {headerText}
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
