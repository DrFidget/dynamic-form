import React from "react";
import Button from "../../compoenents/Button";
const Dashboard = () => {
  return (
    <div style={{paddingInline: '10px'}}>
      <div style={{ textAlign: "center" }}>
        <h1>Dashboard</h1>
      </div>

      <div>
        <h2>Forms</h2>
        <br />
        <br />
        <Button color="blue" onClick={()=>{}} text="Add Form" key="1"/>
      </div>

    </div>
  );
};

export default Dashboard;
