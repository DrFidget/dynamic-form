import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./Home/compoennets/Home";
import { FormSchema } from "./compoenets/newForm/Schema/FormSchema";
import MainForm from "./compoenets/MainForm";
import { DEEPCOPY } from "./utils";
import { useNavigate } from "react-router-dom";
import Report from "./Home/compoennets/Report";

const App = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [editMode, setEditMode] = useState({
    inEditMode: false,
    row: null,
    data: null,
  });
  const handleSubmit = (values) => {
    let x = [...DEEPCOPY(state)];
    x.push({ Data: values });
    setState(x);
  };

  const Actions = {
    HandleDelete: (k) => {
      let x = [...DEEPCOPY(state)];
      x.splice(k, 1);
      setState(x);
    },
    HandleEdit: (k) => {
      setEditMode({
        ...editMode,
        inEditMode: true,
        row: k,
        data: state[k].Data,
      });
      navigate("/form");
    },
  };
  return (
    // <Model
    //   isOpen={true}
    //   onClose={(e) => {
    //     console.log("close it");
    //   }}
    //   headerText={"Add a new record"}
    // >
    //   ABC
    // </Model>
    <Routes>
      <Route path="/" element={<Home data={state} Actions={Actions} />} />
      <Route
        path="/form"
        element={
          editMode.inEditMode ? (
            <MainForm
              FormSchema={FormSchema}
              Values={editMode.data}
              handleSubmit={(values) => {
                let x = { Data: values };
                setState((prevState) => {
                  let y = [...DEEPCOPY(prevState)];
                  y[editMode.row] = DEEPCOPY(x);
                  return y;
                });
                setEditMode({
                  ...editMode,
                  inEditMode: false,
                  data: null,
                  row: null,
                });
              }}
            />
          ) : (
            <MainForm FormSchema={FormSchema} handleSubmit={handleSubmit} />
          )
        }
      />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default App;
