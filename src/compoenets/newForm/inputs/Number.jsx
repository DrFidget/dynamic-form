import React from "react";

const Number = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties, optionalProperties } = Element;

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

      {optionalProperties && !optionalProperties.message != "" && (
        <p style={{ color: `${optionalProperties.validation.color}` }}>
          {optionalProperties.validation.message}
        </p>
      )}
    </div>
  );
};

export default Number;
