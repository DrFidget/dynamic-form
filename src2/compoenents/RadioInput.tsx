import React from "react";

interface RadioProps {
  options: string[];
  values: string[];
  selectedValue?: string;
  htmlprops?: any;
  label?: string;
  onChange: (selectedValue: string) => void;
}

const RadioInput: React.FC<RadioProps> = ({
  options,
  values,
  selectedValue,
  onChange,
  htmlprops,
  label,
}: RadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="custom_radio_container">
      {label && (
        <>
          <h4>{label}</h4>
          {/* <br /> */}
        </>
      )}
      {options.map((option, index) => (
        <div key={index}>
          <input
            {...htmlprops}
            type="radio"
            value={values[index]}
            checked={selectedValue === values[index]}
            onChange={handleChange}
          />
          <label key={index}>{option}</label>
          {/* {option} */}
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
