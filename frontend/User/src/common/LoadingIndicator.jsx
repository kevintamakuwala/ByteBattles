import React from "react";

export default function LoadingIndicator() {
  const spinnerContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 999,
  };

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
}
