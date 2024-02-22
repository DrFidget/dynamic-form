import React from "react";

const Time = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id} className="custom_Input_container">
      <label className="">{dataValues.fieldName}</label>
      <input
        type="time"
        className="custom_input"
        {...inputProperties}
        value={dataValues.value || ""}
        onChange={HandleInputChange}
      />
    </div>
  );
};

export default Time;
