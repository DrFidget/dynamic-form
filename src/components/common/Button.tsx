import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: "blue" | "green" | "red" | "gray";
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  size = "medium",
  variant = "solid",
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[size]} ${
        styles[variant]
      } ${fullWidth ? styles.fullWidth : ""} ${className || ""}`}
      {...props}
    >
      {text || children}
    </button>
  );
};

export default Button;
