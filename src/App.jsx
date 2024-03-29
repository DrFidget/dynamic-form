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
  const [report, setreport] = useState([]);
  const [editMode, setEditMode] = useState({
    inEditMode: false,
    row: null,
    data: null,
  });
  const handleSubmit = (values, reportValues) => {
    let x = [...DEEPCOPY(state)];
    let y = [...DEEPCOPY(report)];
    y.push({ Report: reportValues });
    x.push({ Data: values });
    setreport(y);
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
    <Routes>
      <Route
        path="/"
        element={<Home data={state} report={report} Actions={Actions} />}
      />
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
