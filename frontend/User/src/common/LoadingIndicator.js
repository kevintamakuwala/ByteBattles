import React from "react";
import "./LoadingIndicator.css";

export default function LoadingIndicator(props) {
  return (
    <div className="spin__container-bg">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
