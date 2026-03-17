import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import './index.css';
// import background from "./assets/background.jpg";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="min-h-screen bg-cover bg-no-repeat bg-center">
      <App />
    </div>
  </Provider>
);