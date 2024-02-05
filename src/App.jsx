import React from "react";
import FormView from "./FormView";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormView />}></Route>
    </Routes>
  );
};

export default App;
