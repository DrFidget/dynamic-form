import React from "react";

const DateCompoenent = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  const value = inputProperties.disabled
    ? new Date().toISOString().slice(0, 10)
    : dataValues.value;
  return (
    <div style={Styles} id={dataValues.id}>
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="date"
        className="form-control"
        {...inputProperties}
        value={value}
        onChange={HandleInputChange}
      />
    </div>
  );
};

export default DateCompoenent;
