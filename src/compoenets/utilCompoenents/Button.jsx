import React, { useState } from "react";

const Button = ({ onClick, color, text, type, disabled = false, styles }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (!disabled) {
      onClick(e);
    }
  };

  return (
    <button
      type={type || "button"}
      style={{
        backgroundColor: disabled ? "gray" : isHovered ? "dark" + color : color,
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        ...styles,
      }}
      onClick={(e) => {
        handleClick(e);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
