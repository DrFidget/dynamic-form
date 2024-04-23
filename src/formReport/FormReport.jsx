import React from "react";

const FormReport = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">id</th>
          <th scope="col">Field Name</th>
          <th scope="col">Type</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((e, key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{e?.dataValues?.id || e?.id}</td>
              <td>{e?.dataValues?.fieldName || e?.fieldName}</td>
              <td>{e?.dataValues?.fieldType || e?.fieldType}</td>
              {e?.dataValues?.fieldType === "table" ? (
                <td>
                  {/* {e.dataValues.value.map((element, key) => (
                    <span key={key}> {element.value} ,</span>
                  ))} */}
                </td>
              ) : (
                <td>{e?.dataValues?.value || e?.value}</td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default FormReport;
