import React from "react";

const DropDownList = ({ Element, Styles, HandleChange }) => {
  const { inputProperties, dataValues } = Element;
  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <select
      className="form-select w-50"
      id={dataValues.id}
      style={Styles}
      onChange={HandleInputChange}
    >
      {inputProperties.options.map((item, key) => {
        return key === 0 ? (
          <option selected value={item} key={key}>
            {item}
          </option>
        ) : (
          <option value={item} key={key}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownList;
