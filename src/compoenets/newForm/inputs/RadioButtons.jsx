import React, { useState } from "react";

const RadioButtons = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties, optionalProperties } = Element;
  const { data, options } = inputProperties;
  const [Values, setValues] = useState(data ? data : options);

  const handleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id} className="custom_radio_container">
      <label className="custom_Checkbox_label">{dataValues.fieldName}</label>
      {inputProperties.options.map((item, key) => (
        <div key={key} className="">
          <input
            name={dataValues.id}
            className=""
            type="radio"
            value={Values[key] || ""}
            onChange={handleInputChange}
          />

          <label className="">{item}</label>
        </div>
      ))}
      {optionalProperties &&
        optionalProperties.validation &&
        optionalProperties.validation.message !== "" && (
          <p style={{ color: `${optionalProperties.validation.color}` }}>
            {optionalProperties.validation.message}
          </p>
        )}
    </div>
  );
};

export default RadioButtons;
