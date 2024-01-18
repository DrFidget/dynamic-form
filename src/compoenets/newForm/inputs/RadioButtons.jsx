import React from "react";

const RadioButtons = ({ Element, Styles, HandleChange }) => {
  const handleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  const { dataValues, inputProperties } = Element;
  return (
    <div style={Styles} id={dataValues.id}>
      {inputProperties.options.map((item, key) => (
        <div key={key} className="form-check">
          <input
            name={dataValues.id}
            className="form-check-input"
            type="radio"
            value={inputProperties.data[key] || ""}
            onChange={handleInputChange}
          />
          <label>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;
