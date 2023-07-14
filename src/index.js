import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import "./Normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

ReactDOM.render(
  <React.StrictMode>
    <div className="footer_column1">
      <div className="logo"></div>
      <div className="footer_column1--text">
        <p>Final Project for CoreCode io</p>
      </div>
    </div>
    <div className="footer_column2">
      <div className="profilepic"></div>
      <div className="footer_column1--text">
        <p>Developed by Yishar Shelevy</p>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("footer")
);
