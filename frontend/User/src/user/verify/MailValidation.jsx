import React, { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { login, verify } from "../../util/APIUtils";
import { errorNotification, successNotification } from "../../util/Helpers";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const MailValidation = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get("code");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/verify?code=${codeParam}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();

      if (data !== "verify_success") {
        setAlreadyRegistered(true);
      }
    } catch (error) {}
  };

  const handleVerifyAndLogin = () => {
    fetchData();

    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        if (!response.ok) {
          errorNotification("Oops Something went wrong!!!");
          return;
        }

        const responseData = await response.json();

        if (responseData.jwt === "") {
          errorNotification("Oops Something went wrong!!!");
          return;
        }

        successNotification("Logged in");

        localStorage.setItem(ACCESS_TOKEN, responseData.jwt);
        localStorage.setItem("id", responseData.user.userId);

        props.setIsAuthenticated(true);
        navigate("/");
      } catch (error) {
        errorNotification("Oops Something went wrong!!!");
        return;
      } finally {
        if (localStorage.getItem("username"))
          localStorage.removeItem("username");
        if (localStorage.getItem("password"))
          localStorage.removeItem("password");
      }
    }, 0);
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  };
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <ToastContainer />
      {username && password && !alreadyRegistered ? (
        <button style={buttonStyle} onClick={handleVerifyAndLogin}>
          Verify and Login
        </button>
      ) : (
        <h2 style={{ color: "#fff" }}>Already Verified</h2>
      )}
    </div>
  );
};

export default MailValidation;
