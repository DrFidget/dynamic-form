import React from "react";
import Button from "./Button";
interface Props {
  children: any;
  isOpen: boolean;
  title: string;
  key?: String;
  onClick: () => void;
  styles?: React.CSSProperties;
}

const Collapsible = ({
  title,
  children,
  isOpen,
  onClick,
  key = "*",
  styles,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // backgroundColor: "green",
        borderRadius: "15px",
        overflow: "hidden",
        ...styles,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0",
          padding: "1rem",
          backgroundColor: "#6e8593",
          color: "white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
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
      {isOpen && (
        <div
          style={{
            backgroundColor: "#F2F3F5",
            paddingInline: "20px",
            paddingBlock: "10px",
          }}
        >
          {" "}
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
