import React from "react";

const Number = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties, validationRules } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id}>
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="number"
        className="form-control"
        {...inputProperties}
        value={dataValues.value || ""}
        onChange={HandleInputChange}
      />

      {validationRules && !validationRules.validation.isValid && (
        <p style={{ color: `${validationRules.validation.color}` }}>
          {validationRules.validation.message}
        </p>
      )}
    </div>
  );
};

export default Number;
