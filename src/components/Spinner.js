import React from "react";
import "./Spinner.css";
import chatIcon from "./chat-icon.svg";

function Spinner() {
  return (
    <div className="loader-container">
      <h1 className="loader-title">
        <img src={chatIcon} alt="" /> Chat App
      </h1>
      <div className="loader">Loading...</div>
    </div>
  );
}

export default Spinner;
