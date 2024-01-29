import React from "react";

const DropDownList = ({ Element, Styles, HandleChange }) => {
  const { inputProperties, dataValues } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div id={dataValues.id} style={Styles} {...inputProperties}>
      <label className="form-label">{dataValues.fieldName}</label>
      <select
        className="form-select w-50"
        onChange={HandleInputChange}
        value={
          dataValues.value ||
          // (inputProperties.options && inputProperties.options[0]) ||
          ""
        }
      >
        <option value={undefined}>Select Value</option>
        {inputProperties.options.map((item, key) => {
          return (
            <option value={item} key={key}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownList;
