import React from "react";

const Label = ({ Element, Styles, HandleChange }) => {
  return (
    <div
      style={Styles}
      id={dataValues.id}
      hidden={inputProperties.hidden}
      className="custom_Input_container"
    >
      <label className="">{dataValues.fieldName}</label>
    </div>
  );
};

export default Label;
