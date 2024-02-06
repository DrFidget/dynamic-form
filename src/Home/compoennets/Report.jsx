import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Report = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {state
            ? Object.entries(state).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{JSON.stringify(value)}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
