import React from "react";

interface DropdownProps {
  options: string[];
  values: string[];
  selectedValue?: string;
  htmlprops?: any;
  label?: string;
  onChange: (selectedValue: string) => void;
}

const DropdownInput: React.FC<DropdownProps> = ({
  options,
  values,
  selectedValue,
  onChange,
  htmlprops,
  label,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="custom_select_container">
      {label && (
        <>
          <label>{label}</label>
          {/* <br /> */}
        </>
      )}
      <select
        className="custom_Select_dropdown"
        {...htmlprops}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value={""}>Select Value</option>
        {options.map((option, index) => (
          <option key={index} value={values[index]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
