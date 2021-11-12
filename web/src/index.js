import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";
import { SettingProvider } from "./context/setting-context";

ReactDOM.render(
  <SettingProvider>
    <App />
  </SettingProvider>,
  document.getElementById("root")
);
