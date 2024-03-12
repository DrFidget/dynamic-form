import React from "react";
import Button from "./Button";

interface CardProps {
  name: string;
  id: string;
  fieldType: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  id,
  fieldType,
  onEdit,
  onDelete,
}) => {
  const cardStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    // maxWidth: "300px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>{name}</div>
      <div>ID: {id}</div>
      <div>Field Type: {fieldType}</div>
      <div style={footerStyle}>
        <Button text="Edit" color="#007bff" onClick={onEdit} />
        <Button text="Delete" color="#db0a0a" onClick={onDelete} />
      </div>
    </div>
  );
};

export default Card;
