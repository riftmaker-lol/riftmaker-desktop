import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import 'unfonts.css'
import "./assets/globals.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
