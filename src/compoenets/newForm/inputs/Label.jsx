import React from "react";

const Label = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties, optionalProperties } = Element;
  return (
    <div
      style={Styles}
      id={dataValues.id}
      className="custom_Input_container"
      {...inputProperties}
    >
      <label className="">{dataValues.fieldName}</label>
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

export default Label;
