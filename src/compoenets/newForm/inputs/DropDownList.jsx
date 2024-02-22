import React from "react";

const DropDownList = ({ Element, Styles, HandleChange }) => {
  const { inputProperties, dataValues } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div
      id={dataValues.id}
      class="custom_select_container"
      style={Styles}
      {...inputProperties}
    >
      <label class="">{dataValues.fieldName}</label>
      <select
        class="custom_Select_dropdown"
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
            <option value={item} key={key} class="">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownList;
