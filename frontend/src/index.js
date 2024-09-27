/** @format */

import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

// Create a root using createRoot API
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
