import React from "react";

interface Props {
  defaultValue?: any;
  value?: any;
  label?: string;
  htmlprops?: any;
  onChange: (val: any) => void;
}
const CheckBoxInput = ({
  defaultValue,
  value,
  label,
  onChange,
  htmlprops,
}: Props) => {
  return (
    <div className="custom_Checkbox">
      <input
        {...htmlprops}
        className="custom_Checkbox_input"
        type="checkbox"
        checked={value || ""}
        onChange={(e: any) => onChange(e.target.checked)}
      />
      <label htmlFor="" className="custom_Checkbox_label">
        {"  " + label}
      </label>
    </div>
  );
};

export default CheckBoxInput;
