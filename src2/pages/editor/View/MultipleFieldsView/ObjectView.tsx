import React from "react";

interface Props {
  data: any;
}
const ObjectView = ({ data }: Props) => {
  return (
    <div style={{overflowY:"auto"}}>
      <h2>Object View</h2>
      <pre style={{}}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ObjectView;
