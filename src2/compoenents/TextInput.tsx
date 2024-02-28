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
}
const TextInput = ({
  defaultValue,
  value,
  label,
  onChange,
  htmlprops,
  warning,
  placeHolder,
  onKeyDown,
  styles,
}: Props) => {
  return (
    <div
      className="custom_Input_container"
      style={{ position: "relative", ...styles }}
    >
      {label && <label className="">{label + "  "}</label>}
      <input
        placeholder={placeHolder || ""}
        className="custom_input"
        {...htmlprops}
        type="text"
        value={value || ""}
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e: any) => {
          if (e.key === "Enter" && onKeyDown) {
            onKeyDown(e.target.value);
          }
        }}
      />
      {warning && (
        <p
          style={{
            position: "absolute",
            top: "50px",
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

export default TextInput;
