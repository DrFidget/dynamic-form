import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  color?: string;
  text: string | React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
  styles?: React.CSSProperties;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color,
  text,
  type,
  disabled = false,
  styles,
  title,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (!disabled) {
      onClick();
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
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      title={title}
    >
      {text}
    </button>
  );
};

export default Button;
