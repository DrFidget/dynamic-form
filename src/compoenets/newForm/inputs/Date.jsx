import React from "react";

const DateCompoenent = ({
  Element,
  Styles,
  HandleChange,
  optionalProperties,
}) => {
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

export default DateCompoenent;
