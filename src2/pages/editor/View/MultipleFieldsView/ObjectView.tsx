import React from "react";

interface Props {
  data: any;
}
const ObjectView = ({ data }: Props) => {
  return (
    <div>
      <h2>Object View</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ObjectView;
