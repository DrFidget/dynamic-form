import React from "react";

const Number = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
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
        value={dataValues.value}
        onChange={HandleInputChange}
      />
    </div>
  );
};

export default Number;
