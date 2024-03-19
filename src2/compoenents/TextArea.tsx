import React from "react";

interface Props {
  defaultValue?: any;
  value?: any;
  label?: string;
  htmlprops?: any;
  warning?: { message: string; color: string };
  placeHolder?: string;
  onChange: (e: string) => void;
  onKeyDown?: (e: string) => void;
  styles?: React.CSSProperties;
  rows?: number; // Number of rows for the textarea
}

const TextArea = ({
  defaultValue,
  value,
  label,
  onChange,
  htmlprops,
  warning,
  placeHolder,
  onKeyDown,
  styles,
  rows = 3, // Default number of rows is 3
}: Props) => {
  return (
    <div
      className="custom_Input_container"
      style={{ position: "relative", ...styles }}
    >
      {label && <label className="">{label + "  "}</label>}
      <textarea
        placeholder={placeHolder || ""}
        className="custom_input"
        style={{
          minWidth: "25vw",
          minHeight: "10vw",
        }}
        {...htmlprops}
        value={value || ""}
        rows={rows}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && onKeyDown) {
            onKeyDown(e.currentTarget.value);
          }
        }}
      />
      {warning && (
        <p
          style={{
            position: "absolute",
            top: `${rows * 20}px`, // Adjust the position based on the number of rows
            fontSize: "15px",
            color: warning.color,
          }}
        >
          {warning.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
