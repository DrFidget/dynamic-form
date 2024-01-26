import React from "react";
const dividerStyle = {
  borderTop: "2px dotted #000",
  width: "100%",
  margin: "10px 0",
};
const divider = ({ Element }) => {
  const { inputProperties } = Element;
  return <div style={dividerStyle} {...inputProperties}></div>;
};

export default divider;
