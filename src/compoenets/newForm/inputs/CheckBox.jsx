import React from "react";

const CheckBox = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.checked, dataValues.id);
  };

  return (
    <div style={Styles} id={dataValues.id}>
      <input
        type="checkbox"
        className="form-check-input"
        {...inputProperties}
        value={dataValues.value || ""}
        onChange={HandleInputChange}
      />
      <label className="form-check-label mx-3">{dataValues.fieldName}</label>
    </div>
  );
};

export default CheckBox;
