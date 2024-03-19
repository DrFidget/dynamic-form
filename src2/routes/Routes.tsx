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

let x = [
  {
    id: "date",
    fieldName: "Date",
    fieldType: "date",
    default: "#VAR_NOW#",
    enabled: false,
    clearValues: false,
  },
  {
    id: "testBat",
    fieldName: "BUS Nom",
    fieldType: "list",
    default: "#ASSET.lists('busNomenclature')#",
    options: [],
  },
  {
    id: "materialType",
    fieldName: "Material Type",
    fieldType: "list",
    default:
      "#APPLICATIONLOOKUP.lists('materialTypes','${des} (${key1}, ${key2})','${des}','sort')#",
    options: [],
  },
  {
    id: "empl",
    fieldName: "User Name",
    fieldType: "text",
    default: "#VAR_UNAME#",
    enabled: false,
    clearValues: false,
  },
];
