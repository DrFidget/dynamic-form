import React from "react";

const LoadingComponent = () => {
  const loaderStyle = {
    border: "6px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "6px solid #3498db",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default LoadingComponent;
