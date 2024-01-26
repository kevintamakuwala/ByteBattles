import React, { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { login, verify } from "../../util/APIUtils";
import { errorNotification, successNotification } from "../../util/Helpers";
import { ToastContainer } from "react-toastify";

const MailValidation = (props) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // console.log(username);
  // console.log(password);

  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get("code");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/verify?code=${codeParam}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();

      if (data !== "verify_success") {
        setAlreadyRegistered(true);
      }
      // console.log('Data from the backend:', data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleVerifyAndLogin = () => {
    // Call the function to initiate the fetch
    fetchData();

    // handling login
    handleLogin({
      username,
      password,
    });
    if (localStorage.getItem("username")) localStorage.removeItem("username");
    if (localStorage.getItem("password")) localStorage.removeItem("password");
  };

  const handleLogin = (data) => {
    setTimeout(async () => {
      try {
        await login(data)
          .then((response) => {
            if (response.jwt === "") {
              errorNotification(
                "Your Username or Password is incorrect. Please try again!"
              );
              return;
            }
            successNotification("Logged in");

            localStorage.setItem(ACCESS_TOKEN, response.jwt);
            props.onLogin();
            window.location.reload();
          })
          .catch((error) => {
            if (error.status === 401) {
              errorNotification(
                "Your Username or Password is incorrect. Please try again!"
              );
            } else {
              errorNotification(error.message);
            }
          });
      } catch (error) {
        successNotification("Sorry! Something went wrong. Please try again!");
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
      <ToastContainer/>
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
