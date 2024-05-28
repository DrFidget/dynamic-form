import React, { useEffect, useState } from "react";

const Text = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties, optionalProperties } = Element;

  const HandleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };

  return (
    <>
      <div
        style={Styles}
        id={dataValues.id}
        hidden={inputProperties.hidden}
        className="custom_Input_container"
      >
        <label className="">{dataValues.fieldName}</label>
        {/* {!inputProperties?.hidden ? <div>not hidden</div> : <div>hidden</div>} */}
        <input
          type="text"
          className="custom_input"
          value={dataValues.value || ""}
          onChange={HandleInputChange}
          {...inputProperties}
        />
        {optionalProperties &&
          optionalProperties.validation &&
          optionalProperties.validation.message !== "" && (
            <p style={{ color: `${optionalProperties.validation.color}` }}>
              {optionalProperties.validation.message}
            </p>
          )}
      </div>
    </>
  );
};

export default Text;
