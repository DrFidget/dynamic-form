import React from "react";
const Image = ({ Element, Styles, HandleChange }) => {
  const { dataValues, inputProperties } = Element;

  const HandleInputChange = (e) => {
    // Element.updateValue(e.target.value);
    HandleChange(e.target.value, dataValues.id);
  };
  return (
    <div style={Styles} id={dataValues.id} className="custom_Input_container">
      <label className="form-label">{dataValues.fieldName}</label>
      <input
        type="file"
        className="custom_input"
        accept="image/png, image/gif, image/jpeg"
        value={dataValues.value || ""}
        onChange={HandleInputChange}
        {...inputProperties}
      />
    </div>
  );
};

export default Image;

{
  /* <input type="image" src="img_submit.gif" alt="Submit" width="48" height="48"></input> */
}
