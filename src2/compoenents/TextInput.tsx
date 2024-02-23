import React from "react";

interface Props {
  defaultValue?: any;
  value?: any;
  label?: string;
  htmlprops?: any;
  warning?: { message: string; color: string };
  onChange: (e: string) => void;
}
const TextInput = ({
  defaultValue,
  value,
  label,
  onChange,
  htmlprops,
  warning,
}: Props) => {
  return (
    <div className="custom_Input_container" style={{ position: "relative" }}>
      <label className="">{label + "  "}</label>
      <input
        className="custom_input"
        {...htmlprops}
        type="text"
        value={value || ""}
        onChange={(e: any) => {
          onChange(e.target.value);
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
