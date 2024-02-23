import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Editor from "../pages/editor/Editor";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const MyRoutes = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
