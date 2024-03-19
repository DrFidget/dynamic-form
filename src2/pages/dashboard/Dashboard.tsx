import React, { useState } from "react";
import Button from "../../compoenents/Button";
import ModalVariableWidth from "../../compoenents/ModalVariableWidth";
import styles from "./Dashboard.module.css";
import TextArea from "../../compoenents/TextArea";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Dashboard = () => {
  const [addForm, setAddform] = useState(false);
  const [addExisting, setExisting] = useState("");

  const navigate = useNavigate();
  const Actions = {
    addNewForm: () => {
      navigate("/editor");
    },
    addExisting: {
      validate: () => {
        console.log("tyring");
        let x = addExisting;
        try {
          x = JSON.parse(x);
          navigate("/editor", { state: { addExisting } });
        } catch (e) {
          swal("error occured");
        }
      },
    },
  };
  return (
    <div style={{ paddingInline: "5rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Dashboard</h1>
      </div>

      <div>
        <h2>Forms</h2>
        <br />
        <br />
        <Button
          color="#007BFF"
          onClick={() => {
            setAddform(true);
          }}
          text="Add Form"
          key="1"
        />
        <ModalVariableWidth
          headerText="Add a new form"
          isOpen={addForm}
          onClose={() => setAddform(false)}
        >
          <div className={`${styles.container}`}>
            <div>
              <Button
                text="Create New"
                color="#007BFF"
                onClick={Actions.addNewForm}
              />
            </div>
            <div className={`${styles.vertical_divider}`}></div>
            <div>
              <TextArea
                onChange={(s) => {
                  setExisting(s);
                }}
                label="Paste An Existing Schema"
                value={addExisting}
              />
              <Button
                text="Create"
                color="#007BFF"
                onClick={() => {
                  Actions.addExisting.validate();
                }}
              />
            </div>
          </div>
        </ModalVariableWidth>
      </div>
    </div>
  );
};

export default Dashboard;
