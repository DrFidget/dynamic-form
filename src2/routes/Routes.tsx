import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Editor from "../pages/editor/Editor";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Responses from "../pages/Responses/Responses";
import MultipleForms from "../pages/MultipleFormsSubmit/MultipleForms";
const MyRoutes = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/multipleForms" element={<MultipleForms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
