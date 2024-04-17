import React from "react";

const CheckBox = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.checked, dataValues.id);
  };

  return (
    <div style={Styles} id={dataValues.id} className="custom_Checkbox">
      <input
        type="checkbox"
        className="custom_Checkbox_input"
        value={dataValues.value || ""}
        onChange={HandleInputChange}
        {...inputProperties}
      />
      <label className="custom_Checkbox_label">{dataValues.fieldName}</label>
    </div>
  );
};

export default CheckBox;
