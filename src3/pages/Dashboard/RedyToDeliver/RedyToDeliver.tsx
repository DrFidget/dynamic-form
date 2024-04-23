import React from "react";
interface Props {
  Styles?: React.CSSProperties;
}
const RedyToDeliver = ({ Styles }: Props) => {
  return <div style={{ ...Styles }}>RedyToDeliver</div>;
};

export default RedyToDeliver;
