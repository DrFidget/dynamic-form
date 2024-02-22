import React, { useState } from "react";

const RadioButtons = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;
  const { data, options } = inputProperties;
  const [Values, setValues] = useState(data ? data : options);

  const handleInputChange = (e) => {
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id} class="custom_radio_container">
      {inputProperties.options.map((item, key) => (
        <div key={key} className="">
          <input
            name={dataValues.id}
            className=""
            type="radio"
            value={Values[key] || ""}
            onChange={handleInputChange}
          />

          <label class="">{item}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;
