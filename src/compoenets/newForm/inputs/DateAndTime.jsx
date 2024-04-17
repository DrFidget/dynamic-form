import React from "react";

const DateAndTime = ({ Element, Styles, HandleChange, DefaultMethods }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  const value = inputProperties.disabled
    ? new Date().toISOString().slice(0, 10)
    : dataValues.value;
  return (
    <div style={Styles} id={dataValues.id} className="custom_Input_container">
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="datetime-local"
        className="custom_input"
        value={value || ""}
        onChange={HandleInputChange}
        {...inputProperties}
      />
    </div>
  );
};

export default DateAndTime;
