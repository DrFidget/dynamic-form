import React from "react";

const DateCompoenent = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };

  return (
    <div style={Styles} id={dataValues.id} className="custom_Input_container">
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="date"
        className="custom_input"
        value={dataValues.value || ""}
        onChange={HandleInputChange}
        {...inputProperties}
      />
    </div>
  );
};

export default DateCompoenent;
