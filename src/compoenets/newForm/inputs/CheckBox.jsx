import React from "react";

const CheckBox = ({ Element, Styles, HandleChange, optionalProperties }) => {
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

export default CheckBox;
