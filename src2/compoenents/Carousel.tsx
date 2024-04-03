import React from "react";
import Button from "./Button";

interface Props {
  children: React.ReactNode[];
  current: number;
}
const Carousel = ({ children, current }: Props) => {
  return (
    <>
      {children.map((e, k) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: current === k ? "block" : "none",
          }}
          key={k}
        >
          {e}
        </div>
      ))}
    </>
  );
};

export default Carousel;
