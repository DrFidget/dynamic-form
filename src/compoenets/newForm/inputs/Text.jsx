import React from "react";

const Text = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    // Element.updateValue(e.target.value);
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id}>
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="text"
        className="form-control"
        {...inputProperties}
        value={dataValues.value}
        onChange={HandleInputChange}
      />
    </div>
  );
};

export default Text;
