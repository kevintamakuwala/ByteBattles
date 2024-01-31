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
    backgroundColor: "rgba(0, 0, 0, 1)", // Dark color background
    zIndex: 999,
  };

  const spinnerStyle = {
    border: "4px solid rgba(255, 255, 255, 0.1)", // Adjusted border color
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite", // Using the keyframes directly
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
