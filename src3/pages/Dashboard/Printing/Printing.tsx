import React from "react";
interface Props {
  Styles?: React.CSSProperties;
}
const Printing = ({ Styles }: Props) => {
  return <div style={{ ...Styles }}>Printing</div>;
};

export default Printing;
