import React from "react";

const DropDownList = ({
  Element,
  Styles,
  HandleChange,
  optionalProperties,
}) => {
  const { inputProperties, dataValues } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div
      id={dataValues.id}
      className="custom_select_container"
      style={Styles}
      {...inputProperties}
    >
      <label className="">{dataValues.fieldName}</label>
      <select
        className="custom_Select_dropdown form-select w-50"
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
            <option value={item} key={key} className="">
              {item}
            </option>
          );
        })}
      </select>
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

export default DropDownList;
