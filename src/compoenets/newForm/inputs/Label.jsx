import React from "react";

const Label = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
  return (
    <div
      style={Styles}
      id={dataValues.id}
      className="custom_Input_container"
      {...inputProperties}
    >
      <label className="">{dataValues.fieldName}</label>
    </div>
  );
};

export default Label;
