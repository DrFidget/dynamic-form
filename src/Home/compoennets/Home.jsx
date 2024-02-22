import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = ({ data, Actions, report }) => {
  let navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>

      <Link to="/form">Add Form</Link>

      <div className="table-responsive">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Forms</th>
              <th scope="col">Actions</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {report.length > 0 &&
              report.map((e, k) => (
                <tr key={k}>
                  <td>Form {k + 1} added</td>
                  <td>
                    <button onClick={() => Actions.HandleEdit(k)}>Edit</button>
                    <button onClick={() => Actions.HandleDelete(k)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        navigate("/report", { state: e.Report });
                      }}
                    >
                      Show Report
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
