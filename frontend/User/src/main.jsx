import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
