import React from "react";
import Button from "./Button";
interface Props {
  children: any;
  isOpen: boolean;
  title: string;
  key?: String;
  onClick: () => void;
}

const Collapsible = ({
  title,
  children,
  isOpen,
  onClick,
  key = "*",
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // backgroundColor: "green",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0",
          padding: "0.5rem",
          backgroundColor: "#acb9bf",
        }}
      >
        <h2 style={{ margin: "0" }}>{title}</h2>
        <Button
          styles={{}}
          text={isOpen ? "-" : "+"}
          onClick={onClick}
          color="blue"
        />
      </div>
      {isOpen && <div style={{ backgroundColor: "#dee3e5" }}> {children}</div>}
    </div>
  );
};

export default Collapsible;
