import React from "react";

interface ModalProps {
  isOpen: boolean;
  headerText: string;
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  headerText,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "60vw",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          overflowY: "scroll",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{headerText}</h2>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
