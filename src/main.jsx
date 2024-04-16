import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "../ServiceLayer/Theme/myStyles.css";
import Routes from "../src2/routes/Routes";
import MyRoutes from "../src3/routes/Routes";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  // <BrowserRouter>{<App />}</BrowserRouter>
  <Routes />
  // <MyRoutes />
  //
  // </React.StrictMode>,
);
