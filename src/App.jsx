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
  const handleSubmit = (Fstate, values) => {
    let x = [...DEEPCOPY(state)];
    x.push({ ProcessedSchema: Fstate, Data: values });
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
        data: state[k].ProcessedSchema,
      });
      navigate("/form");
    },
  };
  return (
    <Routes>
      <Route path="/" element={<Home data={state} Actions={Actions} />} />
      <Route
        path="/form"
        element={
          editMode.inEditMode ? (
            <MainForm
              FormState={editMode.data}
              handleSubmit={(Fstate, values) => {
                let x = { ProcessedSchema: Fstate, Data: values };
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
      ></Route>
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default App;
