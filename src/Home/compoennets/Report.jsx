import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Report = () => {
  const location = useLocation();
  const report = location.state;
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Field Name</th>
            {/* <th>Id</th> */}
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {report
            ? report.map((e, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{e.fieldName}</td>
                  {/* <td>{e.id}</td> */}
                  <td>{e.value}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
