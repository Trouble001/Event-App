import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import background from "./assets/bg.jpg";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="min-h-screen bg-cover bg-fixed bg-no-repeat bg-center" style={{ backgroundImage: `url(${background})` }}>
      <App />
    </div>
  </Provider>
);